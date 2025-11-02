"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const chartData = [
  { date: "Mon", submitted: 240, approved: 200, rejected: 40 },
  { date: "Tue", submitted: 280, approved: 250, rejected: 30 },
  { date: "Wed", submitted: 320, approved: 300, rejected: 20 },
  { date: "Thu", submitted: 290, approved: 280, rejected: 10 },
  { date: "Fri", submitted: 350, approved: 320, rejected: 30 },
  { date: "Sat", submitted: 200, approved: 180, rejected: 20 },
  { date: "Sun", submitted: 150, approved: 140, rejected: 10 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-modern-lg p-3">
        <p className="font-semibold text-slate-900 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-slate-600">{entry.name}:</span>
              <span className="font-semibold text-slate-900">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function WeeklyActivity() {
  return (
    <Card className="card-modern border-0 shadow-modern">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Weekly Activity
            </CardTitle>
            <CardDescription className="mt-1.5">Annotations submitted vs approved</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barCategoryGap="20%" barGap={8}>
            <defs>
              <linearGradient id="gradientSubmitted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#a855f7" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="gradientApproved" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="gradientRejected" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#f472b6" stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
            <XAxis
              dataKey="date"
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm font-medium text-slate-700">{value}</span>
              )}
            />
            <Bar
              dataKey="submitted"
              name="Submitted"
              radius={[8, 8, 0, 0]}
              fill="url(#gradientSubmitted)"
            />
            <Bar
              dataKey="approved"
              name="Approved"
              radius={[8, 8, 0, 0]}
              fill="url(#gradientApproved)"
            />
            <Bar
              dataKey="rejected"
              name="Rejected"
              radius={[8, 8, 0, 0]}
              fill="url(#gradientRejected)"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
