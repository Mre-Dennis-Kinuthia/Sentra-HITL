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

export function AccuracyChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Trend</CardTitle>
        <CardDescription>Weekly annotation accuracy and quality scores</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="accuracy"
              stroke="hsl(var(--chart-1))"
              fillOpacity={1}
              fill="url(#colorAccuracy)"
            />
            <Area
              type="monotone"
              dataKey="quality"
              stroke="hsl(var(--chart-2))"
              fillOpacity={1}
              fill="url(#colorQuality)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
