"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

const accuracyData = [
  { name: "Excellent (95%+)", value: 45, count: 4050, color: "#10b981" },
  { name: "Good (85-94%)", value: 35, count: 3140, color: "#06b6d4" },
  { name: "Fair (75-84%)", value: 15, count: 1345, color: "#f59e0b" },
  { name: "Needs Work (<75%)", value: 5, count: 448, color: "#ec4899" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-slate-200 rounded-lg shadow-modern-lg p-3">
        <p className="font-semibold text-slate-900 mb-1">{data.name}</p>
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{data.value}%</span> • {data.payload.count} annotations
        </p>
      </div>
    )
  }
  return null
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name, count }: any) => {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  if (percent < 0.08) return null // Don't show labels for very small slices

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-semibold drop-shadow-sm"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function QualityDistribution() {
  return (
    <Card className="card-modern border-0 shadow-modern">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
          Quality Distribution
        </CardTitle>
        <CardDescription className="mt-1.5">Annotation accuracy breakdown</CardDescription>
      </CardHeader>
      <CardContent className="chart-container">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <defs>
              {accuracyData.map((entry, index) => (
                <linearGradient key={`gradient-${index}`} id={`gradient-${index}`}>
                  <stop offset="0%" stopColor={entry.color} stopOpacity={1} />
                  <stop offset="100%" stopColor={entry.color} stopOpacity={0.7} />
                </linearGradient>
              ))}
            </defs>
            <Pie
              data={accuracyData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={100}
              innerRadius={45}
              paddingAngle={3}
              dataKey="value"
              stroke="white"
              strokeWidth={2}
            >
              {accuracyData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index})`}
                  style={{
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={80}
              iconType="circle"
              formatter={(value: string, entry: any) => {
                const data = accuracyData.find((d) => d.name === value)
                return (
                  <span className="text-sm font-medium text-slate-700">
                    {value} <span className="text-slate-400">({data?.count})</span>
                  </span>
                )
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
