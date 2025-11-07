"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { WorkforceAlert } from "@/lib/types"
import { AlertTriangle, Bell } from "lucide-react"
import { formatDistanceToNowStrict } from "date-fns"

const priorityStyles: Record<WorkforceAlert["priority"], string> = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
  low: "bg-accent text-accent-foreground",
}

interface WorkforceActionCenterProps {
  alerts: WorkforceAlert[]
  canResolve: boolean
  title?: string
  description?: string
}

export function WorkforceActionCenter({ alerts, canResolve, title = "Needs Attention", description }: WorkforceActionCenterProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description ?? `${alerts.length} open items prioritized by urgency`}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-border/40 p-8 text-center text-sm text-muted-foreground">
            <Bell className="mb-3 h-5 w-5 opacity-70" />
            All clear. No action required right now.
          </div>
        )}

        {alerts.map((alert) => (
          <div key={alert.id} className="rounded-lg border border-border/60 bg-muted/30 p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className={`${priorityStyles[alert.priority]} capitalize`}>{alert.priority}</Badge>
                  {alert.dueDate && (
                    <span className="text-xs text-muted-foreground">
                      Due {formatDistanceToNowStrict(alert.dueDate, { addSuffix: true })}
                    </span>
                  )}
                </div>
                <p className="font-medium text-sm">{alert.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{alert.description}</p>
              </div>
              {canResolve && (
                <Button size="sm" variant={alert.priority === "high" ? "destructive" : "outline"}>
                  {alert.action}
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

