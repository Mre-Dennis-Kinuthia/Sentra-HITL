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
  { category: "Annotators (60%)", value: 8538, color: "#7c3aed", percentage: 60 },
  { category: "QA Review (20%)", value: 2846, color: "#06b6d4", percentage: 20 },
  { category: "Infrastructure (15%)", value: 2135, color: "#f59e0b", percentage: 15 },
  { category: "Management (5%)", value: 712, color: "#ec4899", percentage: 5 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded shadow-modern-lg p-3 min-w-[140px]">
        <p className="font-semibold text-slate-900 mb-2 text-sm">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-xs text-slate-600">{entry.name}:</span>
              </div>
              <span className="font-bold text-slate-900 text-sm">${entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function CostAnalytics() {
  const total = costBreakdown.reduce((sum, item) => sum + item.value, 0)
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="card-modern border-0 shadow-modern">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Cost Trend
          </CardTitle>
          <CardDescription className="mt-1.5">Weekly workforce spending vs budget</CardDescription>
        </CardHeader>
        <CardContent className="chart-container">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={costData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#7c3aed" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis
                dataKey="week"
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="spent"
                name="Spent"
                stroke="#7c3aed"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorSpent)"
                dot={{ fill: "#7c3aed", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#7c3aed", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="budget"
                name="Budget"
                stroke="#06b6d4"
                strokeWidth={2.5}
                strokeDasharray="5 5"
                dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#06b6d4", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="card-modern border-0 shadow-modern">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Cost Breakdown
          </CardTitle>
          <CardDescription className="mt-1.5">Monthly cost allocation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {costBreakdown.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-700 font-medium">{item.category}</span>
                <span className="font-bold text-slate-900">${item.value.toLocaleString()}</span>
              </div>
              <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full transition-all duration-500 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}dd 100%)`,
                    boxShadow: `0 2px 4px ${item.color}40`,
                  }}
                />
              </div>
            </div>
          ))}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">Total Monthly</span>
              <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
