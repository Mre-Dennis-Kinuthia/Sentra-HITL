"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { mockUsers } from "@/lib/mock-data"

export function AnnotatorPerformance() {
  const annotators = mockUsers.filter((u) => u.role === "annotator")

  const performanceData = annotators.map((annotator, idx) => ({
    id: annotator.id,
    name: annotator.name,
    tasksCompleted: Math.floor(Math.random() * 100) + 20,
    avgScore: Math.floor(Math.random() * 15) + 85,
    accuracy: Math.floor(Math.random() * 10) + 90,
    consistency: Math.floor(Math.random() * 20) + 80,
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Annotator Performance</CardTitle>
        <CardDescription>Individual annotator quality metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Annotator</TableHead>
              <TableHead>Tasks Done</TableHead>
              <TableHead>Avg Score</TableHead>
              <TableHead>Accuracy</TableHead>
              <TableHead>Consistency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {performanceData.map((data) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell>{data.tasksCompleted}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge className={data.avgScore >= 90 ? "bg-accent" : "bg-primary"}>{data.avgScore}%</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-chart-1 h-full rounded-full" style={{ width: `${data.accuracy}%` }} />
                    </div>
                    <span className="text-sm">{data.accuracy}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div className="bg-chart-2 h-full rounded-full" style={{ width: `${data.consistency}%` }} />
                    </div>
                    <span className="text-sm">{data.consistency}%</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
