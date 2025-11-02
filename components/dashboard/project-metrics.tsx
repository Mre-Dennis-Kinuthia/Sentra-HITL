"use client"
import { memo } from "react"
import { MetricCard } from "@/components/ui/metric-card"
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
      <MetricCard
        title="Active Projects"
        value={activeProjects}
        icon={Activity}
        trend={{
          value: 12,
          label: "vs last month",
          isPositive: true,
        }}
      />

      <MetricCard
        title="Total Annotations"
        value={`${(totalAnnotations / 1000).toFixed(1)}K`}
        icon={CheckCircle2}
        trend={{
          value: 8,
          label: "vs last week",
          isPositive: true,
        }}
      />

      <MetricCard
        title="Avg Accuracy"
        value={`${averageAccuracy}%`}
        icon={TrendingUp}
        trend={{
          value: 2.5,
          label: "vs last month",
          isPositive: true,
        }}
      />

      <MetricCard
        title="Completion Rate"
        value={`${completionRate}%`}
        icon={Users}
        trend={{
          value: -1.2,
          label: "vs last month",
          isPositive: false,
        }}
      />
    </div>
  )
})
