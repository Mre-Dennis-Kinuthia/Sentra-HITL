import * as React from 'react'

import { cn } from '@/lib/utils'
import { Spinner } from '@/components/ui/spinner'

type InputStatus = 'default' | 'success' | 'error'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'className'> {
  className?: string
  inputClassName?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  isLoading?: boolean
  status?: InputStatus
}

const statusClasses: Record<InputStatus, string> = {
  default: 'border-input focus-within:border-ring focus-within:ring-ring/40',
  success: 'border-success/60 text-success focus-within:ring-success/30',
  error: 'border-destructive/60 text-destructive focus-within:ring-destructive/30',
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      type = 'text',
      leadingIcon,
      trailingIcon,
      isLoading = false,
      status = 'default',
      disabled,
      ...props
    },
    ref,
  ) => {
    const hasRightAdornment = Boolean(trailingIcon) || isLoading

    return (
      <div
        data-slot="input-wrapper"
        className={cn(
          'ripple-surface relative flex w-full items-center rounded-md border bg-transparent transition-smooth focus-within:ring-2',
          disabled && 'opacity-60 pointer-events-none',
          statusClasses[status],
          className,
        )}
      >
        {leadingIcon && (
          <span className="pointer-events-none absolute left-3 inline-flex items-center text-muted-foreground">
            {leadingIcon}
          </span>
        )}

        <input
          ref={ref}
          type={type}
          data-slot="input"
          disabled={disabled}
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-0 bg-transparent px-3 py-2 text-base outline-none md:text-sm',
            leadingIcon && 'pl-9',
            hasRightAdornment && 'pr-10',
            inputClassName,
          )}
          {...props}
        />

        {(trailingIcon || isLoading) && (
          <span className="pointer-events-none absolute right-3 inline-flex items-center text-muted-foreground">
            {isLoading ? <Spinner className="size-4" /> : trailingIcon}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
