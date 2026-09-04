# fix-git-index.ps1 — run from repo root to repair corrupted .git/index
$repo = Split-Path -Parent $MyInvocation.MyCommand.Path
Write-Host 'Stopping git daemon processes...' -ForegroundColor Yellow
Get-WmiObject Win32_Process | Where-Object { $_.Name -like '*git*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }
$index = Join-Path $repo '.git\index'
if (Test-Path $index) {
  $size = (Get-Item $index).Length
  if ($size -lt 100) {
    Write-Host "Index corrupted ($size bytes). Rebuilding..." -ForegroundColor Red
    Remove-Item -Force $index
  }
}
Set-Location $repo
git reset | Out-Null
$newSize = (Get-Item $index).Length
Write-Host "Done. Index rebuilt: $newSize bytes." -ForegroundColor Green
git status
