// GitHub Pages serves 404.html for unknown paths. Copying the SPA entry point
// there lets BrowserRouter handle deep links and refreshes (e.g. /assets/projects).
// Paths resolve from this script's location, so it works from any working directory.
import { copyFileSync } from 'node:fs';

const dist = new URL('../dist/', import.meta.url);
copyFileSync(new URL('index.html', dist), new URL('404.html', dist));
console.log('Copied dist/index.html to dist/404.html (SPA fallback)');
