import { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/Button'

type CookieConsent = 'accepted' | 'rejected'

const STORAGE_KEY = 'dashexecs_cookie_consent'

function readStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === 'accepted' || v === 'rejected') return v
    return null
  } catch {
    return null
  }
}

function writeStoredConsent(consent: CookieConsent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, consent)
  } catch {
    // ignore (private browsing, blocked storage, etc.)
  }
}

export default function CookieBanner() {
  const initialConsent = useMemo(() => readStoredConsent(), [])
  const [consent, setConsent] = useState<CookieConsent | null>(initialConsent)
  const isOpen = consent === null

  useEffect(() => {
    // Keep state in sync if localStorage gets updated elsewhere (rare, but safe).
    if (!isOpen) return
    const current = readStoredConsent()
    if (current) setConsent(current)
  }, [isOpen])

  if (!isOpen) return null

  const accept = () => {
    writeStoredConsent('accepted')
    setConsent('accepted')
  }

  const reject = () => {
    writeStoredConsent('rejected')
    setConsent('rejected')
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
        <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
          <div className="min-w-0">
            <div className="text-base font-semibold text-[#1a1a1a]">
              We value your privacy
            </div>
            <div className="mt-1 text-sm text-gray-600">
              We use cookies to improve your experience. You can accept or reject non-essential cookies.
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto" onClick={reject}>
              Reject
            </Button>
            <Button variant="primary" size="sm" className="w-full sm:w-auto" onClick={accept}>
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


