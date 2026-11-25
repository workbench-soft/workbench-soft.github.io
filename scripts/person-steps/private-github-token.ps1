# Stores a read-only GitHub token for the Download buttons of the insiders page in Bitwarden
# and in the workbench-private Worker. Safe to run again.
$ErrorActionPreference = 'Stop'
$key = 'WORKBENCH_SOFT_GITHUB_IO_PRIVATE_GITHUB_TOKEN'
$app = Join-Path $env:WBS_ROOT 'workbench-soft.github.io\apps\private'
$env:BWS_ACCESS_TOKEN = [Environment]::GetEnvironmentVariable('BWS_ACCESS_TOKEN', 'User')
$project = (mise x -- bws project list -o json | ConvertFrom-Json | Where-Object { $_.name -eq 'workbench-soft' }).id
$saved = mise x -- bws secret list $project -o json | ConvertFrom-Json | Where-Object { $_.key -eq $key }

if ($saved) {
  Write-Host "done: $key is already in Bitwarden"
} else {
  Start-Process 'https://github.com/settings/personal-access-tokens/new'
  Write-Host 'Fine-grained token: Resource owner workbench-soft, Expiration 1 year, Only select repositories:'
  Write-Host '  suno-download, chrome-site-sources, songfactory, disk-reorg, workbench-soft.github.io'
  Write-Host 'Repository permissions: Contents Read-only. Press Generate token and copy it.'
  $secure = Read-Host 'Paste the token (hidden)' -AsSecureString
  $value = [Runtime.InteropServices.Marshal]::PtrToStringBSTR([Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
  mise x -- bws secret create $key $value $project | Out-Null
  Remove-Variable value
  Write-Host "done: $key saved in Bitwarden"
}

Push-Location $app
try {
  mise x -- bws run --project-id $project -- powershell -NoProfile -Command "`$env:$key | mise x -- pnpm exec wrangler secret put GITHUB_TOKEN" | Out-Null
  Write-Host 'done: the Worker has GITHUB_TOKEN'
} finally { Pop-Location }
