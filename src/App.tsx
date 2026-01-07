import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import AboutPage from './pages/AboutPage'
import SolutionPage from './pages/SolutionPage'
import CookieBanner from './components/CookieBanner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/solutions/:solutionId" element={<SolutionPage />} />
      </Routes>
      <CookieBanner />
    </Router>
  )
}

export default App
