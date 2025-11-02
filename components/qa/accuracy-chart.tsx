"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"

const data = [
  { date: "Mon", accuracy: 92, quality: 88 },
  { date: "Tue", accuracy: 94, quality: 91 },
  { date: "Wed", accuracy: 93, quality: 89 },
  { date: "Thu", accuracy: 95, quality: 93 },
  { date: "Fri", accuracy: 94, quality: 92 },
  { date: "Sat", accuracy: 96, quality: 94 },
  { date: "Sun", accuracy: 95, quality: 93 },
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
              <span className="font-bold text-slate-900 text-sm">{entry.value}%</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function AccuracyChart() {
  return (
    <Card className="card-modern border-0 shadow-modern">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Quality Trend
        </CardTitle>
        <CardDescription className="mt-1.5">Weekly annotation accuracy and quality scores</CardDescription>
      </CardHeader>
      <CardContent className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#7c3aed" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
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
              domain={[85, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm font-medium text-slate-700">{value}</span>
              )}
            />
            <Area
              type="monotone"
              dataKey="accuracy"
              name="Accuracy"
              stroke="#7c3aed"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorAccuracy)"
              dot={{ fill: "#7c3aed", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#7c3aed", strokeWidth: 2 }}
            />
            <Area
              type="monotone"
              dataKey="quality"
              name="Quality"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorQuality)"
              dot={{ fill: "#06b6d4", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#06b6d4", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
