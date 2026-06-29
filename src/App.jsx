import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)

    // Detect if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }
    window.addEventListener('appinstalled', () => setIsInstalled(true))

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return
    installPrompt.prompt()
    const { outcome } = await installPrompt.userChoice
    if (outcome === 'accepted') {
      setInstallPrompt(null)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">⚡</div>
        <h1>PWA Demo</h1>
        <p className="subtitle">A simple Progressive Web App built with React</p>
      </header>

      <main className="app-main">
        <div className="card">
          <h2>Install this App</h2>
          <p>
            Add this app to your home screen for a native-like experience — works
            offline and loads instantly.
          </p>

          {isInstalled ? (
            <div className="installed-badge">✅ App is installed!</div>
          ) : installPrompt ? (
            <button className="install-button" onClick={handleInstall}>
              📲 Install App
            </button>
          ) : (
            <p className="install-hint">
              To install: open this page in Chrome on Android, tap the menu (⋮)
              and choose <strong>Add to Home screen</strong>.
            </p>
          )}
        </div>

        <div className="card">
          <h2>What is a PWA?</h2>
          <p>
            A <strong>Progressive Web App</strong> is a web application that uses
            modern browser features to deliver app-like experiences. It works
            offline, loads fast, and can be installed on your device.
          </p>
        </div>
      </main>
    </div>
  )
}

export default App
