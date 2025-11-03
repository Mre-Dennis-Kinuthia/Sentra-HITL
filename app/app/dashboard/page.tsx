"use client"
import { AnalyticsKPIs } from "@/components/dashboard/analytics-kpis"
import { AnalyticsSidebar } from "@/components/dashboard/analytics-sidebar"
import { UpcomingInterview, VacancyTrends } from "@/components/dashboard/analytics-main"
import { EmployeesTable } from "@/components/dashboard/analytics-employees"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground mt-2">Team and hiring overview</p>
        </div>
      </div>

      <AnalyticsKPIs />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <UpcomingInterview />
          <VacancyTrends />
          <EmployeesTable />
        </div>
        <div className="xl:col-span-1">
          <AnalyticsSidebar />
        </div>
      </div>
    </div>
  )
}
