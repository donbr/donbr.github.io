import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// After a deploy, an already-open tab still references the old hashed chunk filenames,
// which gh-pages has deleted. Vite emits vite:preloadError when such a dynamic import
// fails; reload once to pick up the new build. No reload when offline (it would replace
// the site with the browser's offline page), and the timestamp guard stops a reload loop:
// a second failure within 10s just shows RouteErrorBoundary's message.
// The event is deliberately not cancelled: preventDefault() would make the import resolve
// to undefined and surface as an unrelated React error. Letting it throw shows the
// boundary's "didn't load" message for the moment before the reload lands.
const RELOAD_KEY = 'chunk-reload-at'

window.addEventListener('vite:preloadError', () => {
  if (!navigator.onLine) return
  try {
    if (Date.now() - Number(sessionStorage.getItem(RELOAD_KEY)) < 10_000) return
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
  } catch {
    return // storage unavailable: let the error boundary handle it
  }
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
