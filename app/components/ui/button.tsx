import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
          variant === "default" && "bg-[var(--text-primary)] text-[var(--bg-card)] hover:opacity-90 shadow-sm",
          variant === "outline" && "border border-[var(--border-light)] bg-transparent hover:bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-sm",
          variant === "ghost" && "hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] text-[var(--text-secondary)]",
          variant === "destructive" && "bg-[var(--color-red)] text-white hover:opacity-90 shadow-sm",
          variant === "secondary" && "bg-[var(--bg-primary)] text-[var(--text-primary)] hover:bg-[var(--border-light)] shadow-sm",
          size === "default" && "h-9 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "lg" && "h-10 rounded-md px-8",
          size === "icon" && "h-9 w-9",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
