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

export function WeeklyActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Activity</CardTitle>
        <CardDescription>Annotations submitted vs approved</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
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
            <Bar dataKey="submitted" fill="hsl(var(--chart-1))" />
            <Bar dataKey="approved" fill="hsl(var(--chart-2))" />
            <Bar dataKey="rejected" fill="hsl(var(--chart-4))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
