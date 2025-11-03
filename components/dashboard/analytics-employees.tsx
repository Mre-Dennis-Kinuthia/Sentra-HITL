"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const employees = [
  { name: "Kevin Michel", id: "#E421", email: "kevin@gmail.com", role: "Sr / Developer" },
  { name: "Tanisha Combs", id: "#E422", email: "tanisha@gmail.com", role: "Jr / UX Designer" },
  { name: "Aron Armstrong", id: "#E423", email: "aron@gmail.com", role: "Md / QA automation" },
  { name: "Josh Wiggins", id: "#E424", email: "josh@gmail.com", role: "Sr / Analytics" },
]

export function EmployeesTable() {
  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle>Employees</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee name</TableHead>
                <TableHead>Employee ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell>{e.id}</TableCell>
                  <TableCell className="text-muted-foreground">{e.email}</TableCell>
                  <TableCell>{e.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}


