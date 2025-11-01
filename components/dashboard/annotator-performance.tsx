"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface AnnotatorStats {
  name: string
  tasksCompleted: number
  accuracy: number
  speed: number
  quality: "excellent" | "good" | "fair"
  trend: number
}

const annotatorStats: AnnotatorStats[] = [
  {
    name: "Sarah Annotator",
    tasksCompleted: 234,
    accuracy: 96,
    speed: 85,
    quality: "excellent",
    trend: 5,
  },
  {
    name: "John Annotator",
    tasksCompleted: 198,
    accuracy: 92,
    speed: 78,
    quality: "good",
    trend: 2,
  },
  {
    name: "Emma QA",
    tasksCompleted: 156,
    accuracy: 98,
    speed: 72,
    quality: "excellent",
    trend: 8,
  },
  {
    name: "Michael Dev",
    tasksCompleted: 142,
    accuracy: 89,
    speed: 82,
    quality: "good",
    trend: 1,
  },
  {
    name: "Lisa Team Lead",
    tasksCompleted: 198,
    accuracy: 94,
    speed: 88,
    quality: "excellent",
    trend: 3,
  },
]

export function AnnotatorPerformance() {
  const getQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "bg-green-500/10 text-green-700"
      case "good":
        return "bg-blue-500/10 text-blue-700"
      case "fair":
        return "bg-yellow-500/10 text-yellow-700"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Annotators</CardTitle>
        <CardDescription>Team performance leaderboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {annotatorStats.map((annotator, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{annotator.name}</span>
                {annotator.trend > 0 && <span className="text-xs text-green-600">↑ {annotator.trend}%</span>}
              </div>
              <Badge className={`text-xs capitalize ${getQualityColor(annotator.quality)}`}>{annotator.quality}</Badge>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Accuracy: {annotator.accuracy}%</span>
                <span>Tasks: {annotator.tasksCompleted}</span>
              </div>
              <Progress value={annotator.accuracy} className="h-1.5" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
