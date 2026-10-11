param(
  [switch]$WhatIf
)

$ErrorActionPreference = "Stop"

function IsBinary([byte[]]$bytes) {
  # Heuristic: NUL byte indicates binary
  foreach ($b in $bytes) {
    if ($b -eq 0) { return $true }
  }
  return $false
}

Set-Location (Split-Path -Parent $PSCommandPath) | Out-Null
Set-Location ".." | Out-Null

$files =
  @(
    git ls-files
    git ls-files --others --exclude-standard
  ) |
  Where-Object { $_ } |
  Sort-Object -Unique

if (-not $files -or $files.Count -eq 0) {
  Write-Host "No files found."
  exit 0
}

$changed = 0
$skippedBinary = 0

foreach ($f in $files) {
  if (-not (Test-Path -LiteralPath $f -PathType Leaf)) { continue }

  $bytes = [System.IO.File]::ReadAllBytes($f)
  if (IsBinary $bytes) {
    $skippedBinary++
    continue
  }

  # Byte-level CRLF -> LF. Safe across encodings.
  $changedHere = $false
  for ($i = 0; $i -lt ($bytes.Length - 1); $i++) {
    if ($bytes[$i] -eq 13 -and $bytes[$i + 1] -eq 10) { $changedHere = $true; break }
  }

  if ($changedHere) {
    $newBytes = New-Object System.Collections.Generic.List[byte] $bytes.Length
    for ($i = 0; $i -lt $bytes.Length; $i++) {
      if ($i -lt ($bytes.Length - 1) -and $bytes[$i] -eq 13 -and $bytes[$i + 1] -eq 10) {
        $newBytes.Add(10) | Out-Null
        $i++
        continue
      }
      $newBytes.Add($bytes[$i]) | Out-Null
    }

    if (-not $WhatIf) {
      [System.IO.File]::WriteAllBytes($f, $newBytes.ToArray())
    }
    $changed++
  }
}

Write-Host ("Normalized CRLF->LF in {0} file(s); skipped {1} binary file(s)." -f $changed, $skippedBinary)
