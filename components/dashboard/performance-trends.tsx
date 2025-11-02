"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const trendData = [
  { month: "Jan", accuracy: 88, speed: 45, consistency: 82 },
  { month: "Feb", accuracy: 89, speed: 48, consistency: 84 },
  { month: "Mar", accuracy: 91, speed: 52, consistency: 86 },
  { month: "Apr", accuracy: 92, speed: 55, consistency: 88 },
  { month: "May", accuracy: 94, speed: 58, consistency: 91 },
  { month: "Jun", accuracy: 94.2, speed: 60, consistency: 92 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-modern-lg p-3 min-w-[140px]">
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
              <span className="font-bold text-slate-900 text-sm">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function PerformanceTrends() {
  return (
    <Card className="card-modern border-0 shadow-modern">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Performance Trends
        </CardTitle>
        <CardDescription className="mt-1.5">Team performance metrics over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="month"
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
              domain={[40, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="line"
              formatter={(value) => (
                <span className="text-sm font-medium text-slate-700">{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="accuracy"
              name="Accuracy"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ fill: "#06b6d4", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: "#06b6d4", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="speed"
              name="Speed"
              stroke="#7c3aed"
              strokeWidth={3}
              dot={{ fill: "#7c3aed", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: "#7c3aed", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="consistency"
              name="Consistency"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7, stroke: "#f59e0b", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
