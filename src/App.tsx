import './App.css'
import { Settings } from './components/Settings'
import { SettingsProvider } from './components/SettingsContext'
import { Draw } from './components/Draw'
import { useState } from 'react'

function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  return (
    <SettingsProvider>
      <Settings isOpen={isPanelOpen} onToggle={() => setIsPanelOpen(!isPanelOpen)} />
      <Draw isPanelOpen={isPanelOpen} />
    </SettingsProvider>
  )
}

export default App
