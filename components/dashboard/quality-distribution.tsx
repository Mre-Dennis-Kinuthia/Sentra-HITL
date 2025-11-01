"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

const accuracyData = [
  { name: "Excellent (95%+)", value: 45, count: 4050 },
  { name: "Good (85-94%)", value: 35, count: 3140 },
  { name: "Fair (75-84%)", value: 15, count: 1345 },
  { name: "Needs Work (<75%)", value: 5, count: 448 },
]

const colors = ["hsl(var(--chart-2))", "hsl(var(--chart-1))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

export function QualityDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quality Distribution</CardTitle>
        <CardDescription>Annotation accuracy breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={accuracyData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, count }) => `${name}: ${count}`}
              outerRadius={80}
              fill="hsl(var(--primary))"
              dataKey="value"
            >
              {colors.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
              }}
              formatter={(value) => `${value}%`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
