"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Project {
  id: string
  name: string
  status: "active" | "completed" | "on_hold"
  progress: number
  team: number
  annotationsCount: number
  accuracy: number
}

const projects: Project[] = [
  {
    id: "1",
    name: "E-commerce Product Labeling",
    status: "active",
    progress: 78,
    team: 8,
    annotationsCount: 2400,
    accuracy: 94,
  },
  {
    id: "2",
    name: "Medical Report Classification",
    status: "active",
    progress: 45,
    team: 5,
    annotationsCount: 1200,
    accuracy: 97,
  },
  {
    id: "3",
    name: "Vehicle Detection Dataset",
    status: "completed",
    progress: 100,
    team: 12,
    annotationsCount: 5400,
    accuracy: 96,
  },
  {
    id: "4",
    name: "Customer Sentiment Analysis",
    status: "active",
    progress: 62,
    team: 6,
    annotationsCount: 1800,
    accuracy: 92,
  },
  {
    id: "5",
    name: "Street View Annotation",
    status: "on_hold",
    progress: 30,
    team: 3,
    annotationsCount: 900,
    accuracy: 91,
  },
]

export function ProjectOverview() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "completed" | "on_hold">("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-accent"
      case "completed":
        return "bg-green-500"
      case "on_hold":
        return "bg-destructive"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              {filteredProjects.length} of {projects.length} projects
            </CardDescription>
          </div>
          <Button>+ New Project</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {(["all", "active", "completed", "on_hold"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded text-sm transition-colors capitalize ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 border border-border rounded-lg space-y-3 hover:bg-card/50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium">{project.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {project.annotationsCount.toLocaleString()} annotations • {project.team} team members
                  </p>
                </div>
                <Badge className={`${getStatusColor(project.status)} capitalize`}>
                  {project.status.replace("_", " ")}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{project.progress}%</span>
                </div>
                <Progress value={project.progress} />
              </div>

              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
