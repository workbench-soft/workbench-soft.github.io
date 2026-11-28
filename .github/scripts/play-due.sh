#!/bin/sh
# Says whether the nightly Play bundle has work: the paths changed since the last nightly run that passed.
#   play-due.sh <pathspec>...   outputs due=true or due=false
# Needs GH_TOKEN, SHA, RELEASE_WORKFLOW and SCHEDULE (github.event.schedule), and a checkout with the history.
set -eu
# GitHub cron runs in UTC, so 0 8 and 0 9 cover 19:00 Sydney in summer and in winter. The line that is not 19:00
# today cancels its run: a run that passed would count as a bundle, and the next one would miss its commits.
if [ -n "${SCHEDULE:-}" ]; then
  hour=$(echo "$SCHEDULE" | cut -d' ' -f2)
  # Git Bash on a Windows runner has no zone data, so Windows asks itself.
  if [ -e /usr/share/zoneinfo/Australia/Sydney ]; then
    sydney=$(TZ=Australia/Sydney date -d "$(date -u +%F) $hour:00 UTC" +%H)
  else
    sydney=$(powershell.exe -NoProfile -Command "[TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([DateTime]::UtcNow.Date.AddHours($hour), 'AUS Eastern Standard Time').ToString('HH')" | tr -d '\r')
  fi
  if [ "$sydney" != 19 ]; then
    echo "The '$SCHEDULE' line is $sydney:00 in Sydney today, so the other line builds the bundle."
    gh run cancel "$GITHUB_RUN_ID" --repo "$GITHUB_REPOSITORY"
    sleep 60
    exit 1
  fi
fi
last=$(gh api "repos/$GITHUB_REPOSITORY/actions/workflows/$RELEASE_WORKFLOW/runs?event=schedule&status=success&per_page=1" \
  --jq '.workflow_runs[0].head_sha // empty')
if [ -z "$last" ]; then
  echo "No nightly bundle passed yet, so this one builds."
  due=true
elif git diff --quiet "$last" "$SHA" -- "$@"; then
  echo "Nothing the app ships changed since $last, so no bundle tonight."
  due=false
else
  echo "The app changed since $last."
  due=true
fi
echo "due=$due" >>"$GITHUB_OUTPUT"
