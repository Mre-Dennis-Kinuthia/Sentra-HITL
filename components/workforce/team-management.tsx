"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { User } from "@/lib/types"
import { Search, MoreVertical } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"

interface TeamManagementProps {
  annotators: User[]
}

export function TeamManagement({ annotators }: TeamManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")

  const filteredAnnotators = annotators.filter((annotator) => {
    const matchesSearch =
      annotator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      annotator.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const getStatusBadge = (status: string) => {
    return status === "active" ? "bg-accent" : "bg-muted"
  }

  const annotatorData = filteredAnnotators.map((annotator, idx) => ({
    ...annotator,
    status: idx % 3 === 0 ? "inactive" : "active",
    tasksAssigned: Math.floor(Math.random() * 50) + 10,
    completionRate: Math.floor(Math.random() * 30) + 70,
    qualityScore: Math.floor(Math.random() * 15) + 85,
    joinDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000),
  }))

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>{filteredAnnotators.length} annotators</CardDescription>
          </div>
          <Button>+ Add Member</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Tasks</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {annotatorData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="font-medium">{data.name}</TableCell>
                  <TableCell className="text-sm">{data.email}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadge(data.status)}>{data.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{data.tasksAssigned}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-muted rounded-full h-2">
                        <div className="bg-accent h-full rounded-full" style={{ width: `${data.qualityScore}%` }} />
                      </div>
                      <span className="text-sm font-semibold">{data.qualityScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{data.joinDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {annotatorData.length === 0 && (
          <EmptyState
            variant={searchQuery ? "no-results" : "default"}
            title={searchQuery ? "No annotators found" : "No team members"}
            description={
              searchQuery
                ? "Try adjusting your search query"
                : "Add team members to start managing your annotation workforce"
            }
            actionLabel="Add Member"
          />
        )}
      </CardContent>
    </Card>
  )
}
