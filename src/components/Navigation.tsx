import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-crystal border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src="/dashexecs.png"
              alt="DashExecs"
              className="h-8 w-auto"
            />
            <div className="text-2xl font-bold text-white">
              DashExecs
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="/dvm"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Dashboard
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors font-medium">
              Login
            </button>
            <a href="/dvm">
              <button className="btn-hover-light bg-white text-[#1a1a1a] border border-gray-300 px-6 py-2 rounded-none font-semibold transition-all">
                Get Started
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-crystal border-t border-white/10">
          <div className="px-4 py-4 space-y-2">
            <a
              href="#features"
              className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="/dvm"
              className="block text-gray-300 hover:text-white transition-colors font-medium py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </a>
            <div className="pt-4 border-t border-white/10 space-y-3">
              <button className="block w-full text-left text-gray-300 hover:text-white transition-colors font-medium py-2">
                Login
              </button>
              <a href="/dvm">
                <button className="btn-hover-light block w-full bg-white text-[#1a1a1a] border border-gray-300 px-6 py-3 rounded-none font-semibold transition-all">
                  Get Started
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation

