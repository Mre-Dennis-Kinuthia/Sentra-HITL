"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { WorkforceAlert, WorkforceMemberPersonalSummary } from "@/lib/types"
import { AlertCircle, CalendarClock } from "lucide-react"

declare global {
  // Fallback typing to keep JSX paragraphs working when React types are unavailable locally
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      p: any
    }
  }
}

interface PersonalWorkspaceProps {
  summary: WorkforceMemberPersonalSummary
  alerts: WorkforceAlert[]
}

export function PersonalWorkspace({ summary, alerts }: PersonalWorkspaceProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>My Focus</CardTitle>
        <CardDescription>
          {summary.activeTasks} active tasks · {summary.dueToday} due today · Avg quality {summary.avgQuality}%
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Active</p>
            <p className="text-xl font-semibold">{summary.activeTasks}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Due today</p>
            <p className="text-xl font-semibold">{summary.dueToday}</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Training</p>
            <p className="text-xl font-semibold">{summary.trainingModulesDue}</p>
          </div>
        </div>

        {summary.trainingModulesDue > 0 && summary.nextTraining && (
          <div className="flex items-center gap-3 rounded-md border border-dashed border-border/50 p-3 text-sm">
            <CalendarClock className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Next training: {summary.nextTraining}</p>
              <p className="text-xs text-muted-foreground">Complete to maintain certification</p>
            </div>
            <Button variant="link" className="ml-auto text-xs px-0">
              Open module
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Focus areas</p>
          <div className="flex flex-wrap gap-2">
            {summary.focusAreas.map((area) => (
              <Badge key={area} variant="secondary" className="capitalize">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        {alerts.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Assigned alerts</p>
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 text-sm">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium leading-tight">{alert.title}</p>
                  <p className="text-xs text-muted-foreground">{alert.description}</p>
                </div>
                <Button variant="ghost" size="sm" className="ml-auto text-xs">
                  {alert.action}
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
