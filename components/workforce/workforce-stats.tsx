"use client"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { Users, TrendingUp, CheckCircle2, Clock, Activity } from "lucide-react"
import type { WorkforceKpiSummary } from "@/lib/workforce-data"

interface WorkforceStatsProps {
  summary: WorkforceKpiSummary
}

export function WorkforceStats({ summary }: WorkforceStatsProps) {
  const utilizationLabel = summary.utilization >= 85 ? "Healthy capacity" : "Utilization below target"
  const benchLabel = summary.benchStrength === 0 ? "No bench coverage" : `${summary.benchStrength} available`

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="card-interactive">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Total Workforce</div>
              <div className="text-2xl font-bold mt-2">{summary.totalMembers}</div>
              <div className="text-xs text-muted-foreground mt-1">{benchLabel}</div>
            </div>
            <Users className="w-8 h-8 text-primary opacity-60" />
          </div>
        </CardContent>
      </Card>

      <Card className="card-interactive">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Active Today</div>
              <div className="text-2xl font-bold mt-2">{summary.activeMembers}</div>
              <div className="text-xs text-muted-foreground mt-1">{summary.utilization}% utilization - {utilizationLabel}</div>
            </div>
            <TrendingUp className="w-8 h-8 text-accent opacity-60" />
          </div>
        </CardContent>
      </Card>

      <Card className="card-interactive">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Output (7 days)</div>
              <div className="text-2xl font-bold mt-2">{summary.tasksCompletedThisWeek}</div>
              <div className="text-xs text-muted-foreground mt-1">
                {Math.round(summary.tasksCompletedThisWeek / Math.max(1, summary.activeMembers))} per active teammate
              </div>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500 opacity-60" />
          </div>
        </CardContent>
      </Card>

      <Card className="card-interactive">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Quality & Delivery</div>
              <div className="text-2xl font-bold mt-2">{summary.avgQualityScore}%</div>
              <CardDescription className="text-xs mt-1">
                Trend {summary.qualityTrend > 0 ? "up" : summary.qualityTrend < 0 ? "down" : "flat"} {Math.abs(summary.qualityTrend)} - {summary.onTimeDelivery}% on-time
              </CardDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Clock className="w-6 h-6 text-blue-500 opacity-70" />
              <Activity className="w-6 h-6 text-muted-foreground opacity-70" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
