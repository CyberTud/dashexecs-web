import { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface ButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline"
  size?: "sm" | "md" | "lg"
  className?: string
  icon?: ReactNode
  onClick?: () => void
  disabled?: boolean
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  icon,
  onClick,
  disabled = false,
}: ButtonProps) {
  const baseStyles = "btn-hover-light relative flex items-center justify-center cursor-pointer select-none transition-[box-shadow,border,background-color] duration-400"
  
  const variants = {
    primary: "bg-[#2a2a2a] text-white border border-[#3a3a3a]/50 shadow-[inset_0px_1px_1px_rgba(255,255,255,0.1),inset_0px_2px_2px_rgba(255,255,255,0.08),inset_0px_4px_4px_rgba(255,255,255,0.05),inset_0px_8px_8px_rgba(255,255,255,0.03),inset_0px_16px_16px_rgba(255,255,255,0.02),0_-1px_1px_rgba(0,0,0,0.02),0_-2px_2px_rgba(0,0,0,0.03),0_-4px_4px_rgba(0,0,0,0.05),0_-8px_8px_rgba(0,0,0,0.06),0_-16px_16px_rgba(0,0,0,0.08)] hover:bg-[#333333] hover:border-[#4a4a4a]/50",
    secondary: "bg-white text-[#1a1a1a] border border-gray-300 hover:bg-white/80",
    outline: "bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50",
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-none",
    md: "px-4 py-2 text-base rounded-none",
    lg: "px-6 py-3 text-lg rounded-none",
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={
        variant === "primary" || variant === "outline"
          ? {
              ["--highlight-hue" as any]: "210deg",
            }
          : undefined
      }
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  )
}
