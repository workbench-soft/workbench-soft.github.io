# Installs the latest Media Organizer release on Windows for the current user:
#   irm https://raw.githubusercontent.com/workbench-soft/workbench-soft.github.io/main/media-organizer/install.ps1 | iex
# The script block keeps settings and variables out of the caller's session.
& {
    $ErrorActionPreference = 'Stop'
    $ProgressPreference = 'SilentlyContinue'

    $repo = 'workbench-soft/workbench-soft.github.io'
    # latest.json names the newest version. The desktop app reads the same file for its update.
    $manifest = Invoke-WebRequest "https://github.com/$repo/releases/download/media-organizer-latest/latest.json" -UseBasicParsing
    $json = if ($manifest.Content -is [byte[]]) { [System.Text.Encoding]::UTF8.GetString($manifest.Content) } else { $manifest.Content }
    $version = ($json | ConvertFrom-Json).version
    Write-Host "Installing Media Organizer $version"

    $asset = "MediaOrganizer-$version-windows-x64-setup.exe"
    $url = "https://github.com/$repo/releases/download/media-organizer-v$version/$asset"
    $installer = Join-Path ([System.IO.Path]::GetTempPath()) $asset

    Write-Host "Downloading $url"
    Invoke-WebRequest -Uri $url -OutFile $installer -UseBasicParsing

    try {
        $process = Start-Process -FilePath $installer -ArgumentList '/S' -Wait -PassThru
        if ($process.ExitCode -ne 0) {
            throw "The installer exited with code $($process.ExitCode)."
        }
    }
    finally {
        Remove-Item $installer -ErrorAction SilentlyContinue
    }

    Write-Host "Installed Media Organizer $version. Find it in the Start menu."
}
