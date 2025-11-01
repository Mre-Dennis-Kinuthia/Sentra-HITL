"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts"

const costData = [
  { week: "Week 1", spent: 2400, budget: 2500 },
  { week: "Week 2", spent: 2210, budget: 2500 },
  { week: "Week 3", spent: 2290, budget: 2500 },
  { week: "Week 4", spent: 2000, budget: 2500 },
  { week: "Week 5", spent: 2181, budget: 2500 },
  { week: "Week 6", spent: 2500, budget: 2500 },
]

const costBreakdown = [
  { category: "Annotators (60%)", value: 8538, color: "hsl(var(--chart-1))" },
  { category: "QA Review (20%)", value: 2846, color: "hsl(var(--chart-2))" },
  { category: "Infrastructure (15%)", value: 2135, color: "hsl(var(--chart-3))" },
  { category: "Management (5%)", value: 712, color: "hsl(var(--chart-4))" },
]

export function CostAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Cost Trend</CardTitle>
          <CardDescription>Weekly workforce spending vs budget</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={costData}>
              <defs>
                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                }}
              />
              <Area
                type="monotone"
                dataKey="spent"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorSpent)"
              />
              <Line type="monotone" dataKey="budget" stroke="hsl(var(--chart-2))" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>Monthly cost allocation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {costBreakdown.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.category}</span>
                <span className="font-medium">${item.value.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full transition-all duration-300"
                  style={{
                    width: `${(item.value / 14231) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
          <div className="pt-3 border-t border-border">
            <div className="flex items-center justify-between text-sm font-semibold">
              <span>Total Monthly</span>
              <span>${costBreakdown.reduce((sum, item) => sum + item.value, 0).toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
