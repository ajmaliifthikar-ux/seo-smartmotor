'use client'

import { ButtonHTMLAttributes, forwardRef } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, isLoading, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-brand-dark text-white hover:bg-[#1a1a1a] transition-colors",
      secondary: "bg-white text-brand-dark border border-gray-200 hover:bg-brand-red hover:text-white hover:border-brand-red button-overlay relative overflow-hidden transition-all duration-300 group/btn",
      danger: "bg-red-600 text-white hover:bg-red-700 transition-colors",
      ghost: "hover:bg-gray-100 text-gray-600 transition-colors",
      outline: "border border-input bg-background hover:bg-gray-100 hover:text-accent-foreground transition-colors",
      accent: "bg-brand-red text-white hover:bg-[#c91d23] transition-colors",
      yellow: "bg-[#FFD700] text-brand-dark hover:bg-[#e6c200] transition-colors",
    }

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
      icon: "p-2",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
