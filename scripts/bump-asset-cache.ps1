# Run from repo root if pre-commit hook isn't enabled.
# Updates css/styles.css and js/script.js ?v= in index.html to the same Unix timestamp.
$ErrorActionPreference = "Stop"
$root = Resolve-Path (Join-Path $PSScriptRoot "..")
$index = Join-Path $root "index.html"
if (-not (Test-Path $index)) { throw "index.html not found at $index" }
$v = [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()
$html = Get-Content -Raw -Path $index
$html = $html -replace 'href="css/styles\.css\?v=[^"]+"', "href=`"css/styles.css?v=$v`""
$html = $html -replace 'src="js/script\.js\?v=[^"]+"', "src=`"js/script.js?v=$v`""
Set-Content -Path $index -Value $html -NoNewline
Write-Host "Bumped asset cache to v=$v in index.html"
