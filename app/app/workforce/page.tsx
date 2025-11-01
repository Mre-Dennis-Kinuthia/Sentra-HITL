"use client"
import { Card, CardContent } from "@/components/ui/card"
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
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Annotators</p>
                <p className="text-2xl font-bold mt-2">{mockAnnotatorStats.totalAnnotators}</p>
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
                <p className="text-2xl font-bold mt-2">{mockAnnotatorStats.activeToday}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-accent opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Quality</p>
                <p className="text-2xl font-bold mt-2">{mockAnnotatorStats.averageQualityScore}%</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-green-500 opacity-50" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On-Time Rate</p>
                <p className="text-2xl font-bold mt-2">{mockAnnotatorStats.onTimeDelivery}%</p>
              </div>
              <AlertCircle className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrainingProgress />
        <WorkforceDistribution />
      </div>

      <TeamManagement annotators={annotators} />
    </div>
  )
}
