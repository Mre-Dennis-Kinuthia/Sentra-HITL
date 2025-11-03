"use client"
import { mockProjectStats } from "@/lib/mock-data"
import { ProjectMetrics } from "@/components/dashboard/project-metrics"
import { WeeklyActivity } from "@/components/dashboard/weekly-activity"
import { QualityDistribution } from "@/components/dashboard/quality-distribution"
import { ProjectOverview } from "@/components/dashboard/project-overview"
import { CostAnalytics } from "@/components/dashboard/cost-analytics"
import { PerformanceTrends } from "@/components/dashboard/performance-trends"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { AnnotatorPerformance } from "@/components/dashboard/annotator-performance"

export default function DashboardPage() {
  const completionRate = ((mockProjectStats.annotationsCompleted / mockProjectStats.totalAnnotations) * 100).toFixed(0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Essential metrics and overview</p>
      </div>

      <ProjectMetrics
        activeProjects={mockProjectStats.activeProjects}
        totalAnnotations={mockProjectStats.totalAnnotations}
        averageAccuracy={mockProjectStats.averageAccuracy}
        completionRate={Number.parseInt(completionRate)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyActivity />
        <AnnotatorPerformance />
      </div>

      <ProjectOverview />
    </div>
  )
}
