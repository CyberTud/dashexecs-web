import { useEffect, useRef } from 'react'

interface SplashVideoProps {
  onFinished: () => void
}

export default function SplashVideo({ onFinished }: SplashVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => onFinished()
    const handleError = () => {
      // Fail safe: if video errors, proceed to site shortly
      setTimeout(onFinished, 500)
    }

    video.addEventListener('ended', handleEnded)
    video.addEventListener('error', handleError)

    // Attempt to play (muted autoplay should be allowed)
    const playPromise = video.play()
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        // If autoplay blocked for any reason, proceed after short delay
        setTimeout(onFinished, 1200)
      })
    }

    return () => {
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('error', handleError)
    }
  }, [onFinished])

  return (
    <div className="fixed inset-0 z-[9999] bg-black">
      <video
        ref={videoRef}
        className="w-screen h-screen object-cover"
        src="/dashexecs_video.mov"
        autoPlay
        muted
        playsInline
        controls={false}
        preload="auto"
      />
      {/* Optional click-to-skip */}
      <button
        onClick={onFinished}
        className="absolute bottom-6 right-6 text-xs text-white/80 hover:text-white border border-white/20 px-3 py-1 rounded-none"
        aria-label="Skip video"
      >
        Skip
      </button>
    </div>
  )
}


