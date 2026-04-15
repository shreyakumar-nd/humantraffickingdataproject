# Git hooks

## Auto cache-bust (CSS / JS)

When you commit changes to **`css/styles.css`** or **`js/script.js`**, the `pre-commit` hook rewrites **`index.html`** so both use the same new `?v=<unix-time>` query string. You don’t need to bump versions by hand before pushing to GitHub Pages.

### One-time setup (this repo)

From the project root:

```bash
git config core.hooksPath .githooks
```

On Linux/macOS, ensure the hook is executable:

```bash
chmod +x .githooks/pre-commit
```

(Git for Windows usually runs this hook via Git Bash without needing chmod.)

### If you don’t use the hook

Before committing CSS/JS changes, run:

```powershell
.\scripts\bump-asset-cache.ps1
```

Then stage `index.html` with your other files.

### Skip the bump once

```bash
SKIP_ASSET_BUMP=1 git commit -m "your message"
```

On PowerShell:

```powershell
$env:SKIP_ASSET_BUMP=1; git commit -m "your message"; Remove-Item Env:SKIP_ASSET_BUMP
```

### Note

Replacing images under `visuals/` without changing CSS/JS won’t change `?v=` on those PNGs. If a single image stays cached, add or bump `?v=` on that `<img src="...">` in HTML, or change a CSS/JS file once so the hook runs.
