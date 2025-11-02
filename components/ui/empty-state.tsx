"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  FileQuestion,
  Inbox,
  Search,
  FileX,
  FolderOpen,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

export type EmptyStateVariant =
  | "default"
  | "no-tasks"
  | "no-results"
  | "no-annotations"
  | "no-history"
  | "error"

interface EmptyStateProps {
  variant?: EmptyStateVariant
  title?: string
  description?: string
  icon?: LucideIcon
  actionLabel?: string
  onAction?: () => void
  className?: string
  children?: React.ReactNode
}

const emptyStateConfig: Record<
  EmptyStateVariant,
  {
    icon: LucideIcon
    defaultTitle: string
    defaultDescription: string
    defaultActionLabel?: string
  }
> = {
  default: {
    icon: Inbox,
    defaultTitle: "Nothing here",
    defaultDescription: "This area is empty.",
  },
  "no-tasks": {
    icon: FolderOpen,
    defaultTitle: "No tasks available",
    defaultDescription:
      "You don't have any annotation tasks assigned yet. Tasks will appear here when they're assigned to you.",
    defaultActionLabel: "Refresh Tasks",
  },
  "no-results": {
    icon: Search,
    defaultTitle: "No results found",
    defaultDescription:
      "Try adjusting your search or filters to find what you're looking for.",
    defaultActionLabel: "Clear Filters",
  },
  "no-annotations": {
    icon: Sparkles,
    defaultTitle: "No annotations yet",
    defaultDescription:
      "Start annotating by selecting a tool and creating your first annotation.",
    defaultActionLabel: "Get Started",
  },
  "no-history": {
    icon: FileX,
    defaultTitle: "No history",
    defaultDescription:
      "Your annotation history will appear here as you make changes.",
  },
  error: {
    icon: FileQuestion,
    defaultTitle: "Something went wrong",
    defaultDescription:
      "We couldn't load this content. Please try again or contact support if the problem persists.",
    defaultActionLabel: "Try Again",
  },
}

export function EmptyState({
  variant = "default",
  title,
  description,
  icon: IconOverride,
  actionLabel,
  onAction,
  className,
  children,
}: EmptyStateProps) {
  const config = emptyStateConfig[variant]
  const Icon = IconOverride || config.icon
  const displayTitle = title || config.defaultTitle
  const displayDescription = description || config.defaultDescription
  const displayActionLabel = actionLabel || config.defaultActionLabel

  return (
    <Card
      className={cn(
        "flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in",
        className
      )}
    >
      <CardContent className="flex flex-col items-center gap-4 max-w-md">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted/50 mb-2">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            {displayTitle}
          </h3>
          <p className="text-sm text-muted-foreground">{displayDescription}</p>
        </div>
        {children || (displayActionLabel && onAction && (
          <Button
            onClick={onAction}
            variant="default"
            className="mt-2 btn-interactive"
          >
            {displayActionLabel}
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

