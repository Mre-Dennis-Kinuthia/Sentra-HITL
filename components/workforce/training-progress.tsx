"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { WorkforceTrainingModule, WorkforceTrainingSummary } from "@/lib/types"
import { format } from "date-fns"

interface TrainingProgressProps {
  modules: WorkforceTrainingModule[]
  summary: WorkforceTrainingSummary
}

export function TrainingProgress({ modules, summary }: TrainingProgressProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent"
      case "in_progress":
        return "bg-primary"
      case "pending":
        return "bg-muted"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Programs</CardTitle>
        <CardDescription>
          {summary.completionRate}% completion - {summary.certifiedCount} certified - {summary.overdueCount} overdue - Next evaluation {format(summary.nextEvaluationDate, "MMM d")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{module.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {module.participants} participants - Avg score {module.averageScore ? `${module.averageScore}%` : "N/A"}
                </p>
              </div>
              <Badge className={`${getStatusBadge(module.status)} capitalize`}>{module.status.replace("_", " ")}</Badge>
            </div>
            <Progress value={module.completion} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">
              {module.completion}% complete
              {module.dueDate ? ` - Due ${format(module.dueDate, "MMM d")}` : ""}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
