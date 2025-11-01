import * as React from "react"
import { cn } from "@/lib/utils"

const Spinner = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
        className,
      )}
      {...props}
    />
  ),
)

Spinner.displayName = "Spinner"

export { Spinner }
