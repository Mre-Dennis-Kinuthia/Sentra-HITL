"use client"
import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, CheckCircle2, Users, TrendingUp } from "lucide-react"

interface ProjectMetricsProps {
  activeProjects: number
  totalAnnotations: number
  averageAccuracy: number
  completionRate: number
}

export const ProjectMetrics = memo(function ProjectMetrics({
  activeProjects,
  totalAnnotations,
  averageAccuracy,
  completionRate,
}: ProjectMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold mt-2">{activeProjects}</p>
            </div>
            <Activity className="w-8 h-8 text-primary opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Annotations</p>
              <p className="text-2xl font-bold mt-2">{(totalAnnotations / 1000).toFixed(1)}K</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-accent opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Accuracy</p>
              <p className="text-2xl font-bold mt-2">{averageAccuracy}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Completion Rate</p>
              <p className="text-2xl font-bold mt-2">{completionRate}%</p>
            </div>
            <Users className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
})
