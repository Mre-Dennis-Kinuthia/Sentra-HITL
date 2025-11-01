"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Users, TrendingUp, CheckCircle2, Clock } from "lucide-react"

interface WorkforceStatsProps {
  totalAnnotators: number
  activeToday: number
  tasksCompleted: number
  averageQuality: number
}

export function WorkforceStats({ totalAnnotators, activeToday, tasksCompleted, averageQuality }: WorkforceStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Annotators</p>
              <p className="text-2xl font-bold mt-2">{totalAnnotators}</p>
            </div>
            <Users className="w-8 h-8 text-primary opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Today</p>
              <p className="text-2xl font-bold mt-2">{activeToday}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((activeToday / totalAnnotators) * 100).toFixed(0)}% utilization
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-accent opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Tasks Completed</p>
              <p className="text-2xl font-bold mt-2">{(tasksCompleted / 1000).toFixed(1)}K</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Quality Score</p>
              <p className="text-2xl font-bold mt-2">{averageQuality.toFixed(1)}%</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
