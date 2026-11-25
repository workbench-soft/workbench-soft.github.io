# Gives the site's Cloudflare deploy token the Access permission, so `mise run invite` in apps/private
# can add emails to the insiders page without the dashboard. Safe to run again.
$ErrorActionPreference = 'Stop'
$repo = Join-Path $env:WBS_ROOT 'workbench-soft.github.io\apps\private'
$env:BWS_ACCESS_TOKEN = [Environment]::GetEnvironmentVariable('BWS_ACCESS_TOKEN', 'User')
$project = (mise x -- bws project list -o json | ConvertFrom-Json | Where-Object { $_.name -eq 'workbench-soft' }).id

function Test-Access {
  Push-Location $repo
  try { mise x -- bws run --project-id $project -- node scripts/access.ts | Out-Null; return $LASTEXITCODE -eq 0 }
  catch { return $false }
  finally { Pop-Location }
}

if (Test-Access) { Write-Host 'done: the token already manages Access'; exit 0 }

Start-Process 'https://dash.cloudflare.com/profile/api-tokens'
Write-Host 'On "workbench-soft.github.io games deploy" press ... then Edit. In the Account policy add'
Write-Host '"Access: Apps and Policies" Edit, then press Continue to summary and Update token.'
Read-Host 'Press Enter once the token is updated'

if (Test-Access) { Write-Host 'done: the token manages Access, and mise run invite works' }
else { Write-Host 'left: the token still has no Access permission'; exit 1 }
