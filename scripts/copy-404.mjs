// GitHub Pages serves 404.html for unknown paths. Copying the SPA entry point
// there lets BrowserRouter handle deep links and refreshes (e.g. /assets/projects).
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('Copied dist/index.html to dist/404.html (SPA fallback)');
