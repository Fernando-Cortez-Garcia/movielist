import * as React from "react"

import { cn } from "@/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "relative w-full rounded-lg border p-4 text-sm",
          variant === "default" && "bg-background text-foreground border-border",
          variant === "destructive" && "bg-red-100 text-red-700 border-red-400 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
          className
        )}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

export { Alert }
