"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface TrainingModule {
  id: string
  name: string
  completion: number
  status: "completed" | "in_progress" | "pending"
}

const trainingModules: TrainingModule[] = [
  { id: "1", name: "Annotation Basics", completion: 100, status: "completed" },
  { id: "2", name: "Advanced Labeling", completion: 75, status: "in_progress" },
  { id: "3", name: "Quality Standards", completion: 0, status: "pending" },
  { id: "4", name: "Tool Mastery", completion: 100, status: "completed" },
  { id: "5", name: "Domain Expertise", completion: 50, status: "in_progress" },
]

export function TrainingProgress() {
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
        <CardDescription>Workforce skill development and certification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {trainingModules.map((module) => (
          <div key={module.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-sm">{module.name}</p>
              </div>
              <Badge className={`${getStatusBadge(module.status)} capitalize`}>{module.status.replace("_", " ")}</Badge>
            </div>
            <Progress value={module.completion} className="h-2" />
            <p className="text-xs text-muted-foreground text-right">{module.completion}% complete</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
