import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// After a deploy, an already-open tab still references the old hashed chunk filenames,
// which gh-pages has deleted. Vite emits vite:preloadError when such a dynamic import
// fails; reload once to pick up the new build. The timestamp guard stops a reload loop
// (e.g. offline): a second failure within 10s falls through to RouteErrorBoundary.
const RELOAD_KEY = 'chunk-reload-at'

window.addEventListener('vite:preloadError', (event) => {
  let lastReload = 0
  try {
    lastReload = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0)
  } catch {
    return // storage unavailable: let the error boundary handle it
  }
  if (Date.now() - lastReload < 10_000) return

  try {
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
  } catch {
    return
  }
  event.preventDefault()
  window.location.reload()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
