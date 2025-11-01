"use client"
import { useEffect, useState } from "react"
import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, Users } from "lucide-react"

interface StatusMetric {
  label: string
  value: string | number
  icon: React.ReactNode
  color: string
  trend?: number
}

export function RealTimeStatus() {
  const [metrics, setMetrics] = useState<StatusMetric[]>([
    {
      label: "Active Annotators",
      value: 8,
      icon: <Users className="w-4 h-4" />,
      color: "text-blue-500",
      trend: 2,
    },
    {
      label: "Annotations/Hour",
      value: 342,
      icon: <Activity className="w-4 h-4" />,
      color: "text-green-500",
      trend: 5,
    },
    {
      label: "Avg Accuracy",
      value: "94.2%",
      icon: <TrendingUp className="w-4 h-4" />,
      color: "text-purple-500",
      trend: 1,
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          if (metric.label === "Annotations/Hour") {
            return {
              ...metric,
              value: Math.max(300, (metric.value as number) + Math.floor(Math.random() * 50 - 25)),
            }
          }
          return metric
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-3 gap-3">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-card/50">
          <CardContent className="p-3">
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs text-muted-foreground font-medium">{metric.label}</span>
              {metric.trend && (
                <Badge variant="secondary" className="text-xs gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {metric.trend}%
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className={metric.color}>{metric.icon}</div>
              <span className="text-lg font-semibold">{metric.value}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
