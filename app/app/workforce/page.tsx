"use client"
import { MetricCard } from "@/components/ui/metric-card"
import { mockUsers, mockAnnotatorStats } from "@/lib/mock-data"
import { Users, TrendingUp, CheckCircle2, AlertCircle } from "lucide-react"
import { WorkforceStats } from "@/components/workforce/workforce-stats"
import { TeamManagement } from "@/components/workforce/team-management"
import { TrainingProgress } from "@/components/workforce/training-progress"
import { WorkforceDistribution } from "@/components/workforce/workforce-distribution"

export default function WorkforcePage() {
  const annotators = mockUsers.filter((u) => u.role === "annotator")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workforce Hub</h1>
        <p className="text-muted-foreground mt-2">Manage your annotation team and track performance</p>
      </div>

      <WorkforceStats
        totalAnnotators={mockAnnotatorStats.totalAnnotators}
        activeToday={mockAnnotatorStats.activeToday}
        tasksCompleted={mockAnnotatorStats.tasksCompleted}
        averageQuality={mockAnnotatorStats.averageQualityScore}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Annotators"
          value={mockAnnotatorStats.totalAnnotators}
          icon={Users}
          trend={{
            value: 5,
            label: "vs last month",
            isPositive: true,
          }}
        />

        <MetricCard
          title="Active Today"
          value={mockAnnotatorStats.activeToday}
          icon={TrendingUp}
          trend={{
            value: 15,
            label: "vs yesterday",
            isPositive: true,
          }}
        />

        <MetricCard
          title="Avg Quality"
          value={`${mockAnnotatorStats.averageQualityScore}%`}
          icon={CheckCircle2}
          trend={{
            value: 3.2,
            label: "vs last week",
            isPositive: true,
          }}
        />

        <MetricCard
          title="On-Time Rate"
          value={`${mockAnnotatorStats.onTimeDelivery}%`}
          icon={AlertCircle}
          trend={{
            value: -2.1,
            label: "vs last month",
            isPositive: false,
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrainingProgress />
        <WorkforceDistribution />
      </div>

      <TeamManagement annotators={annotators} />
    </div>
  )
}
