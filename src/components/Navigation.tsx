import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

const BOOK_A_CALL_URL = 'https://calendly.com/tudor-caloian/30min'

const solutions = [
  { name: 'CEO Dashboard', href: '#ceo-dashboard', description: 'Track quarterly performance at a glance' },
  { name: 'Use Cases Marketplace', href: '#marketplace', description: 'Discover and deploy AI solutions' },
  { name: 'KPI Management', href: '#kpi-management', description: 'Manage and visualize your KPIs' },
  { name: 'Financial Tracking', href: '#financial-tracking', description: 'Track ROI with detailed metrics' },
]

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [solutionsOpen, setSolutionsOpen] = useState(false)

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

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors font-medium"
                onClick={() => setSolutionsOpen(!solutionsOpen)}
                onMouseEnter={() => setSolutionsOpen(true)}
              >
                Solutions
                <ChevronDown className={`w-4 h-4 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {solutionsOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-72 bg-[#1a1a1a] border border-gray-700 rounded-none shadow-xl"
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <div className="py-2">
                    {solutions.map((solution) => (
                      <a
                        key={solution.name}
                        href={solution.href}
                        className="block px-4 py-3 hover:bg-gray-800 transition-colors"
                        onClick={() => setSolutionsOpen(false)}
                      >
                        <div className="text-white font-medium">{solution.name}</div>
                        <div className="text-gray-400 text-sm">{solution.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* About Link */}
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              About
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer">
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
          <div className="px-4 py-4 space-y-4">
            {/* Solutions Section */}
            <div>
              <div className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">
                Solutions
              </div>
              <div className="space-y-1">
                {solutions.map((solution) => (
                  <a
                    key={solution.name}
                    href={solution.href}
                    className="block py-2 text-white hover:text-gray-300 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {solution.name}
                  </a>
                ))}
              </div>
            </div>

            {/* About Link */}
            <a
              href="#about"
              className="block py-2 text-white hover:text-gray-300 transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>

            {/* CTA */}
            <div className="pt-4">
              <a href={BOOK_A_CALL_URL} target="_blank" rel="noreferrer">
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
