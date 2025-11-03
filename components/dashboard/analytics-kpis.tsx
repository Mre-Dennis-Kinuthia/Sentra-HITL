"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { Users, UserPlus, UserMinus, Briefcase } from "lucide-react"

export function AnalyticsKPIs() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <MetricCard
        title="Total employees"
        value={418}
        icon={Users}
        trend={{ value: 7, label: "last month", isPositive: true }}
      />
      <MetricCard
        title="New employees"
        value={21}
        icon={UserPlus}
        trend={{ value: 7, label: "last month", isPositive: true }}
      />
      <MetricCard
        title="Resigned employees"
        value={14}
        icon={UserMinus}
        trend={{ value: 4, label: "last month", isPositive: false }}
      />
      <MetricCard
        title="Job applicants"
        value={261}
        icon={Briefcase}
        trend={{ value: 12, label: "last month", isPositive: true }}
      />
    </div>
  )
}


