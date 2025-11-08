"use client"

import { cn } from "@/lib/utils"

interface SectionProps {
  title: string
  description?: string
  action?: unknown
  className?: string
  children?: unknown
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      section: any
      header: any
      h2: any
      p: any
      div: any
    }
  }
}

export function Section({ title, description, action, className, children }: SectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
        </div>
        {action}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  )
}


