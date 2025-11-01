"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertCircle, User } from "lucide-react"

interface Activity {
  id: string
  type: "completed" | "submitted" | "needs_revision"
  user: string
  task: string
  time: string
}

const recentActivity: Activity[] = [
  {
    id: "1",
    type: "completed",
    user: "Sarah Annotator",
    task: "Product Images - Batch A (45 items)",
    time: "2 minutes ago",
  },
  {
    id: "2",
    type: "submitted",
    user: "John Annotator",
    task: "Customer Reviews (28 items)",
    time: "5 minutes ago",
  },
  {
    id: "3",
    type: "completed",
    user: "Emma QA",
    task: "QA Review - Medical Reports (12 items)",
    time: "12 minutes ago",
  },
  {
    id: "4",
    type: "needs_revision",
    user: "Sarah Annotator",
    task: "Vehicle Detection (8 items)",
    time: "28 minutes ago",
  },
  {
    id: "5",
    type: "submitted",
    user: "John Annotator",
    task: "E-commerce Tags (35 items)",
    time: "45 minutes ago",
  },
]

export function ActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "submitted":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "needs_revision":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <User className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case "completed":
        return "bg-green-500/10 text-green-700 border-green-200"
      case "submitted":
        return "bg-blue-500/10 text-blue-700 border-blue-200"
      case "needs_revision":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-200"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Real-time annotation activity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0"
          >
            <div className="mt-1">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.user}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{activity.task}</p>
                </div>
                <Badge
                  variant="outline"
                  className={`text-xs capitalize shrink-0 ${getActivityBadgeColor(activity.type)}`}
                >
                  {activity.type.replace("_", " ")}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
