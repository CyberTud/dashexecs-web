import { useEffect, useMemo, useState } from 'react'
import { Button } from './ui/Button'

type CookieConsent = 'accepted' | 'rejected' | 'custom'

type CookiePrefs = {
  necessary: true
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

const STORAGE_KEY = 'dashexecs_cookie_consent'
const PREFS_KEY = 'dashexecs_cookie_prefs'

const DEFAULT_PREFS: CookiePrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
}

function readStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === 'accepted' || v === 'rejected' || v === 'custom') return v
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

function readStoredPrefs(): CookiePrefs {
  if (typeof window === 'undefined') return DEFAULT_PREFS
  try {
    const raw = window.localStorage.getItem(PREFS_KEY)
    if (!raw) return DEFAULT_PREFS
    const parsed = JSON.parse(raw) as Partial<CookiePrefs>
    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      preferences: Boolean(parsed.preferences),
    }
  } catch {
    return DEFAULT_PREFS
  }
}

function writeStoredPrefs(prefs: CookiePrefs) {
  try {
    window.localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {
    // ignore
  }
}

export default function CookieBanner() {
  const initialConsent = useMemo(() => readStoredConsent(), [])
  const [consent, setConsent] = useState<CookieConsent | null>(initialConsent)
  const isOpen = consent === null
  const [isCustomizing, setIsCustomizing] = useState(false)
  const [prefs, setPrefs] = useState<CookiePrefs>(() => readStoredPrefs())

  useEffect(() => {
    // Keep state in sync if localStorage gets updated elsewhere (rare, but safe).
    if (!isOpen) return
    const current = readStoredConsent()
    if (current) setConsent(current)
  }, [isOpen])

  if (!isOpen) return null

  const acceptAll = () => {
    const next: CookiePrefs = { necessary: true, analytics: true, marketing: true, preferences: true }
    writeStoredPrefs(next)
    writeStoredConsent('accepted')
    setConsent('accepted')
  }

  const rejectAll = () => {
    const next: CookiePrefs = { necessary: true, analytics: false, marketing: false, preferences: false }
    writeStoredPrefs(next)
    writeStoredConsent('rejected')
    setConsent('rejected')
  }

  const openCustomize = () => {
    setIsCustomizing(true)
  }

  const savePrefs = () => {
    writeStoredPrefs(prefs)
    writeStoredConsent('custom')
    setConsent('custom')
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
            <Button variant="secondary" size="sm" className="w-full sm:w-auto" onClick={rejectAll}>
              Reject all
            </Button>
            <Button variant="secondary" size="sm" className="w-full sm:w-auto" onClick={openCustomize}>
              Customize
            </Button>
            <Button variant="primary" size="sm" className="w-full sm:w-auto" onClick={acceptAll}>
              Accept all
            </Button>
          </div>
        </div>

        {isCustomizing && (
          <div className="border-t border-gray-200 px-4 py-4 sm:px-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <label className="border border-gray-200 px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[#1a1a1a]">Necessary</span>
                  <input type="checkbox" checked disabled className="h-4 w-4" />
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Required for the site to function (security, basic page features).
                </div>
              </label>

              <label className="border border-gray-200 px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[#1a1a1a]">Preferences</span>
                  <input
                    type="checkbox"
                    checked={prefs.preferences}
                    onChange={(e) => setPrefs((p) => ({ ...p, preferences: e.target.checked }))}
                    className="h-4 w-4"
                  />
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Remember your choices (e.g. cookie consent, UI preferences).
                </div>
              </label>

              <label className="border border-gray-200 px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[#1a1a1a]">Analytics</span>
                  <input
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs((p) => ({ ...p, analytics: e.target.checked }))}
                    className="h-4 w-4"
                  />
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Help us understand usage and improve the site’s performance.
                </div>
              </label>

              <label className="border border-gray-200 px-3 py-2">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-[#1a1a1a]">Marketing</span>
                  <input
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
                    className="h-4 w-4"
                  />
                </div>
                <div className="mt-1 text-xs text-gray-600">
                  Used to personalize messaging and measure marketing effectiveness.
                </div>
              </label>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <Button
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto"
                onClick={() => setIsCustomizing(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" className="w-full sm:w-auto" onClick={savePrefs}>
                Save preferences
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


