import { useState, useCallback } from 'react'
import LandingPage from './pages/LandingPage'
import SplashVideo from './components/SplashVideo'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const handleFinished = useCallback(() => setShowSplash(false), [])

  if (showSplash) {
    return <SplashVideo onFinished={handleFinished} />
  }
  return <LandingPage />
}

export default App

