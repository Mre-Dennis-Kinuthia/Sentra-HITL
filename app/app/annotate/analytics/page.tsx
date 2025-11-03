"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockTasks } from "@/lib/mock-data"
import { Clock, AlertTriangle, Flag, CheckCircle2 } from "lucide-react"

export default function AnnotatorAnalyticsPage() {
  const total = mockTasks.length
  const completed = mockTasks.filter((t) => t.status === "completed").length
  const inProgress = mockTasks.filter((t) => t.status === "in_progress").length
  const pending = mockTasks.filter((t) => t.status === "pending").length

  // Simple illustrative metrics; replace with real data when available
  const avgTimePerTaskMin = 9 // placeholder
  const validationErrorRate = 3 // % placeholder
  const undoRate = 8 // % placeholder
  const flaggedItems = 2 // placeholder

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Annotator Analytics</h1>
        <p className="text-muted-foreground mt-2">Only the essentials you need to improve speed and quality.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard title="Completed" value={completed} icon={CheckCircle2} />
        <MetricCard title="In progress" value={inProgress} />
        <MetricCard title="Pending" value={pending} />
        <MetricCard title="Total tasks" value={total} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard title="Avg time / task" value={`${avgTimePerTaskMin}m`} icon={Clock} />
        <MetricCard title="Validation error rate" value={`${validationErrorRate}%`} icon={AlertTriangle} />
        <MetricCard title="Undo rate" value={`${undoRate}%`} />
        <MetricCard title="Flagged for QA" value={flaggedItems} icon={Flag} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Focus on reducing validation errors and undo rate; use keyboard shortcuts and the sidebar toggle to keep a clear view.
        </CardContent>
      </Card>
    </div>
  )
}


