"use client"
import React from "react"
import { MetricCard } from "@/components/ui/metric-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  getDistributionInsights,
  getPersonalizedAlerts,
  getPersonalSummary,
  getTrainingInsights,
  getWorkforceAlerts,
  getWorkforceKpis,
  getWorkforceMembers,
} from "@/lib/workforce-data"
import { Users, TrendingUp, CheckCircle2, AlertCircle, CalendarDays, UserCheck, CalendarClock } from "lucide-react"
import { WorkforceStats } from "@/components/workforce/workforce-stats"
import { TeamManagement } from "@/components/workforce/team-management"
import { TrainingProgress } from "@/components/workforce/training-progress"
import { WorkforceDistribution } from "@/components/workforce/workforce-distribution"
import { WorkforceActionCenter } from "@/components/workforce/workforce-action-center"
import { useAuth } from "@/lib/auth-context"

export default function WorkforcePage() {
  const { user } = useAuth()
  const workforceMembers = getWorkforceMembers()
  const kpis = getWorkforceKpis()
  const alerts = getWorkforceAlerts()
  const { summary: trainingSummary, modules: trainingModules } = getTrainingInsights()
  const { composition, headcountTrend } = getDistributionInsights()

  const canManage = user?.role === "admin" || user?.role === "team_lead"
  const personalSummary = user ? getPersonalSummary(user.id) : undefined
  const personalAlerts = user ? getPersonalizedAlerts(user.id) : []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workforce Hub</h1>
        <p className="text-muted-foreground mt-2">
          Manage your annotation team, track training progress, and respond to workforce needs in real-time
        </p>
      </div>

      <WorkforceStats summary={kpis} />

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total Annotators"
          value={kpis.totalMembers}
          icon={Users}
          trend={{
            value: 6,
            label: "vs last quarter",
            isPositive: true,
          }}
          description={`${kpis.benchStrength} available on bench`}
        />

        <MetricCard
          title="Active Today"
          value={kpis.activeMembers}
          icon={TrendingUp}
          trend={{
            value: kpis.utilization,
            label: "utilization",
            isPositive: kpis.utilization >= 80,
          }}
          description="Auto-adjusted for follow-the-sun coverage"
        />

        <MetricCard
          title="Avg Quality"
          value={`${kpis.avgQualityScore}%`}
          icon={CheckCircle2}
          trend={{
            value: kpis.qualityTrend,
            label: "vs last week",
            isPositive: kpis.qualityTrend >= 0,
          }}
          description={`${kpis.tasksCompletedThisWeek} tasks reviewed this week`}
        />

        <MetricCard
          title="On-Time Rate"
          value={`${kpis.onTimeDelivery}%`}
          icon={AlertCircle}
          trend={{
            value: kpis.upcomingPtoDays,
            label: "PTO days upcoming",
            isPositive: kpis.upcomingPtoDays < 10,
          }}
          description="SLA window 24h - escalations auto-routed"
        />

        <MetricCard
          title="Training Coverage"
          value={`${kpis.trainingCoverage}%`}
          icon={CalendarDays}
          trend={{
            value: trainingSummary.overdueCount,
            label: "overdue",
            isPositive: trainingSummary.overdueCount === 0,
          }}
          description={`${trainingSummary.inProgressCount} modules in progress`}
        />

        <MetricCard
          title="Bench Strength"
          value={kpis.benchStrength}
          icon={UserCheck}
          trend={{
            value: kpis.benchStrength,
            label: "available",
            isPositive: kpis.benchStrength >= 2,
          }}
          description="Immediate backfill capacity"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          {personalSummary && user && !canManage && (
            <Card className="h-full">
              <CardHeader>
                <CardTitle>My Focus</CardTitle>
                <CardDescription>
                  {personalSummary.activeTasks} active tasks - {personalSummary.dueToday} due today - Avg quality {personalSummary.avgQuality}%
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Active</p>
                    <p className="text-xl font-semibold">{personalSummary.activeTasks}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Due today</p>
                    <p className="text-xl font-semibold">{personalSummary.dueToday}</p>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-center">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Training</p>
                    <p className="text-xl font-semibold">{personalSummary.trainingModulesDue}</p>
                  </div>
                </div>

                {personalSummary.trainingModulesDue > 0 && personalSummary.nextTraining && (
                  <div className="flex items-center gap-3 rounded-md border border-dashed border-border/50 p-3 text-sm">
                    <CalendarClock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Next training: {personalSummary.nextTraining}</p>
                      <p className="text-xs text-muted-foreground">Complete to maintain certification</p>
                    </div>
                    <Button variant="link" className="ml-auto text-xs px-0">
                      Open module
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Focus areas</p>
                  <div className="flex flex-wrap gap-2">
                    {personalSummary.focusAreas.map((area) => (
                      <Badge key={area} variant="secondary" className="capitalize">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                {personalAlerts.length > 0 && (
                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase text-muted-foreground tracking-wide">Assigned alerts</p>
                    {personalAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 text-sm">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <div>
                          <p className="font-medium leading-tight">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">{alert.description}</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto text-xs">
                          {alert.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <TeamManagement members={workforceMembers} canManageMembers={Boolean(canManage)} />
        </div>

        <div className="space-y-6">
          <WorkforceActionCenter
            alerts={canManage ? alerts : personalAlerts}
            canResolve={Boolean(canManage)}
            description={canManage ? undefined : "Your assigned follow-ups"}
          />
          <TrainingProgress modules={trainingModules} summary={trainingSummary} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WorkforceDistribution composition={composition} headcountTrend={headcountTrend} />
      </div>
    </div>
  )
}
