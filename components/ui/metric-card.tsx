"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react"

export interface MetricCardProps {
  title: string
  value: string | number
  icon?: LucideIcon
  trend?: {
    value: number
    label?: string
    isPositive?: boolean
  }
  description?: string
  className?: string
  onClick?: () => void
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  description,
  className,
  onClick,
}: MetricCardProps) {
  const hasTrend = trend !== undefined
  const isPositive = trend?.isPositive ?? trend?.value >= 0
  const trendIcon = hasTrend
    ? isPositive
      ? TrendingUp
      : trend.value === 0
        ? Minus
        : TrendingDown
    : null
  const TrendIcon = trendIcon

  return (
    <Card
      className={cn(
        "card-interactive transition-smooth",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {hasTrend && TrendIcon && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-xs font-medium",
                    isPositive && trend.value > 0
                      ? "text-green-500 dark:text-green-400"
                      : trend.value < 0
                        ? "text-red-500 dark:text-red-400"
                        : "text-muted-foreground"
                  )}
                >
                  <TrendIcon className="w-3 h-3" />
                  <span>
                    {Math.abs(trend.value)}%
                    {trend.label && ` ${trend.label}`}
                  </span>
                </div>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">{description}</p>
            )}
          </div>
          {Icon && (
            <div className="ml-4 flex-shrink-0">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted">
                <Icon className="w-6 h-6 text-muted-foreground opacity-70" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Animated counter for numbers (for future use)
export function AnimatedMetricValue({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const [displayValue, setDisplayValue] = React.useState(0)

  React.useEffect(() => {
    const duration = 1000 // 1 second
    const steps = 30
    const stepValue = value / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newValue = Math.min(stepValue * currentStep, value)
      setDisplayValue(Math.round(newValue))

      if (currentStep >= steps) {
        clearInterval(timer)
        setDisplayValue(value)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [value])

  return <span className={className}>{displayValue}</span>
}

