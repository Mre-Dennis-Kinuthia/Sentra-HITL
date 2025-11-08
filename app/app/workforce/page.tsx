"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  getDistributionInsights,
  getPersonalizedAlerts,
  getPersonalSummary,
  getTrainingInsights,
  getWorkforceAlerts,
  getWorkforceKpis,
  getWorkforceMembers,
} from "@/lib/workforce-data"
import { WorkforceStats } from "@/components/workforce/workforce-stats"
import { TeamManagement } from "@/components/workforce/team-management"
import { TrainingProgress } from "@/components/workforce/training-progress"
import { WorkforceDistribution } from "@/components/workforce/workforce-distribution"
import { WorkforceActionCenter } from "@/components/workforce/workforce-action-center"
import { useAuth } from "@/lib/auth-context"
import { PersonalWorkspace } from "@/components/workforce/personal-workspace"
import { Section } from "@/components/workforce/section"
import { ProjectMetrics } from "@/components/dashboard/project-metrics"
import { ProjectOverview } from "@/components/dashboard/project-overview"
import { mockProjectStats } from "@/lib/mock-data"

declare global {
  namespace JSX {
    // Allow paragraph tags when lint runs without React types installed
    interface IntrinsicElements {
      p: any
    }
  }
}

export default function WorkforcePage() {
  const { user } = useAuth()
  const workforceMembers = getWorkforceMembers()
  const kpis = getWorkforceKpis()
  const alerts = getWorkforceAlerts()
  const { summary: trainingSummary, modules: trainingModules } = getTrainingInsights()
  const { composition, headcountTrend } = getDistributionInsights()

  const isAdmin = user?.role === "admin"
  const canManage = isAdmin || user?.role === "team_lead"
  const personalSummary = user ? getPersonalSummary(user.id) : undefined
  const personalAlerts = user ? getPersonalizedAlerts(user.id) : []
  const actionableAlerts = canManage ? alerts : personalAlerts
  const trainingRelatedAlerts = actionableAlerts.filter((alert) => {
    const text = `${alert.title} ${alert.description}`.toLowerCase()
    return text.includes("train") || text.includes("certification") || text.includes("module")
  })

  const projectCompletionRate = Math.round((mockProjectStats.annotationsCompleted / mockProjectStats.totalAnnotations) * 100)

  const baseTabs = canManage
    ? [
        { value: "overview", label: "Command Center" },
        ...(isAdmin ? [{ value: "projects", label: "Projects" }] : []),
        { value: "team", label: "Team" },
        { value: "training", label: "Training" },
        { value: "insights", label: "Insights" },
      ]
    : [
        ...(personalSummary ? [{ value: "my-work", label: "My Work" }] : []),
        { value: "overview", label: "Team Overview" },
        { value: "training", label: "Training" },
        { value: "insights", label: "Insights" },
      ]

  const defaultTab = canManage ? "overview" : personalSummary ? "my-work" : "overview"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Workforce Hub</h1>
        <p className="text-muted-foreground mt-2">
          Manage your annotation team, track training progress, and respond to workforce needs in real-time
        </p>
      </div>

      <Tabs defaultValue={defaultTab} className="space-y-8">
        <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
          {baseTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex-none">
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {personalSummary && (
          <TabsContent value="my-work" className="space-y-8">
            <Section
              title="Daily Focus"
              description="Prioritized view of your assignments and alerts."
            >
              <PersonalWorkspace summary={personalSummary} alerts={personalAlerts} />
            </Section>

            <Section
              title="Skill Development"
              description="Track certifications and upskilling progress."
            >
              <TrainingProgress modules={trainingModules} summary={trainingSummary} />
            </Section>
          </TabsContent>
        )}

        <TabsContent value="overview" className="space-y-8">
          <Section
            title="Team Pulse"
            description="Live KPIs across utilization, quality, and delivery."
          >
            <WorkforceStats summary={kpis} />
          </Section>

          <Section
            title="Operations Desk"
            description="Triaged action items and readiness for the week."
          >
            <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              <WorkforceActionCenter
                alerts={actionableAlerts}
                canResolve={Boolean(canManage)}
                description={canManage ? undefined : "Your assigned follow-ups"}
              />
              <TrainingProgress modules={trainingModules} summary={trainingSummary} />
            </div>
          </Section>

          <Section
            title="Workforce Composition"
            description="Role mix and headcount trends at a glance."
          >
            <WorkforceDistribution composition={composition} headcountTrend={headcountTrend} />
          </Section>
        </TabsContent>

        {isAdmin && (
          <TabsContent value="projects" className="space-y-8">
            <Section
              title="Portfolio Health"
              description="High-level metrics across all active annotation projects."
            >
              <ProjectMetrics
                activeProjects={mockProjectStats.activeProjects}
                totalAnnotations={mockProjectStats.totalAnnotations}
                averageAccuracy={mockProjectStats.averageAccuracy}
                completionRate={projectCompletionRate}
              />
            </Section>

            <Section
              title="Project Portfolio"
              description="Search, filter, and review project progress to keep delivery on track."
            >
              <ProjectOverview />
            </Section>
          </TabsContent>
        )}

        {canManage && (
          <TabsContent value="team" className="space-y-8">
            <Section
              title="Team Directory"
              description="Filter, sort, and manage individual contributors."
            >
              <TeamManagement members={workforceMembers} canManageMembers={Boolean(canManage)} />
            </Section>
          </TabsContent>
        )}

        <TabsContent value="training" className="space-y-8">
          <Section
            title="Program Coverage"
            description="Completion rates, certifications, and overdue modules."
          >
            <TrainingProgress modules={trainingModules} summary={trainingSummary} />
          </Section>
          <Section
            title="Training Follow-ups"
            description={
              canManage
                ? "Close the loop on overdue modules and escalations."
                : "Focus on the modules assigned directly to you."
            }
          >
            <WorkforceActionCenter
              alerts={trainingRelatedAlerts.length ? trainingRelatedAlerts : actionableAlerts}
              canResolve={Boolean(canManage)}
              title={canManage ? "Training Follow-ups" : "My Training Follow-ups"}
              description={
                canManage
                  ? `${trainingSummary.overdueCount} overdue modules across the team`
                  : "Training assignments routed to you"
              }
            />
          </Section>
        </TabsContent>

        <TabsContent value="insights" className="space-y-8">
          <Section
            title="Headcount Insights"
            description="Monitor hiring momentum and coverage by role."
          >
            <WorkforceDistribution composition={composition} headcountTrend={headcountTrend} />
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
