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

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/dvm">
              <button className="btn-hover-light bg-white text-[#1a1a1a] border border-gray-300 px-6 py-2 rounded-none font-semibold transition-all">
                Book a Call
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
            <div className="pt-4 space-y-3">
              <a href="/dvm">
                <button className="btn-hover-light block w-full bg-white text-[#1a1a1a] border border-gray-300 px-6 py-3 rounded-none font-semibold transition-all">
                  Book a Call
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

