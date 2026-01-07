import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
      className={cn(
        "relative rounded-2xl bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl",
        "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/40 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}


