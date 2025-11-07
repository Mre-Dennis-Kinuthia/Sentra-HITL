"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis } from "recharts"
import type { WorkforceCompositionSlice, WorkforceHeadcountTrendPoint } from "@/lib/types"

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
]

interface WorkforceDistributionProps {
  composition: WorkforceCompositionSlice[]
  headcountTrend: WorkforceHeadcountTrendPoint[]
}

export function WorkforceDistribution({ composition, headcountTrend }: WorkforceDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Composition</CardTitle>
        <CardDescription>Distribution of roles and headcount trend (last 6 months)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={composition}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${value} ${name}`}
                >
                  {composition.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number, _, payload) => [
                    `${value} people (${payload.payload.change >= 0 ? "+" : ""}${payload.payload.change})`,
                    payload.name,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={headcountTrend} margin={{ top: 16, right: 16, left: -24, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAnnotators" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
                  </linearGradient>
                  <linearGradient id="colorQa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))/20" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                  }}
                />
                <Area type="monotone" dataKey="annotators" stroke="hsl(var(--chart-1))" fill="url(#colorAnnotators)" name="Annotators" />
                <Area type="monotone" dataKey="qa" stroke="hsl(var(--chart-2))" fill="url(#colorQa)" name="QA" />
                <Area type="monotone" dataKey="teamLeads" stroke="hsl(var(--chart-3))" strokeWidth={1.5} fillOpacity={0} name="Team Leads" />
                <Area type="monotone" dataKey="contractors" stroke="hsl(var(--chart-4))" strokeDasharray="4 4" fillOpacity={0} name="Contractors" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
