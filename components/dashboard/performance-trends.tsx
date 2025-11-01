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

export function PerformanceTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Trends</CardTitle>
        <CardDescription>Team performance metrics over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" domain={[40, 100]} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="accuracy" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="speed" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="consistency" stroke="hsl(var(--chart-3))" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
