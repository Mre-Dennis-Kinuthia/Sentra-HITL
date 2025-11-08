"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { EmptyState } from "@/components/ui/empty-state"
import { Search, Plus, PlayCircle, CheckCircle2, PauseCircle, Layers } from "lucide-react"

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

type StatusFilter = "all" | Project["status"]

const statusBadgeTone: Record<Project["status"], string> = {
  active: "bg-accent/15 text-accent border border-accent/30",
  completed: "bg-success/15 text-success border border-success/30",
  on_hold: "bg-warning/15 text-warning border border-warning/30",
}

export function ProjectOverview() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [draft, setDraft] = useState({ name: "", description: "" })

  const statusSummary = useMemo(
    () => ({
      all: projects.length,
      active: projects.filter((project) => project.status === "active").length,
      completed: projects.filter((project) => project.status === "completed").length,
      on_hold: projects.filter((project) => project.status === "on_hold").length,
    }),
    [],
  )

  const statusOptions = useMemo(
    () => [
      { value: "all" as StatusFilter, label: "All projects", icon: Layers },
      { value: "active" as StatusFilter, label: "In flight", icon: PlayCircle },
      { value: "completed" as StatusFilter, label: "Completed", icon: CheckCircle2 },
      { value: "on_hold" as StatusFilter, label: "On hold", icon: PauseCircle },
    ],
    [],
  )

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleResetFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
  }

  const handleCreateProject = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!draft.name.trim()) {
      return
    }

    setIsSubmitting(true)
    window.setTimeout(() => {
      setIsSubmitting(false)
      setIsCreateOpen(false)
      setDraft({ name: "", description: "" })
    }, 800)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              {filteredProjects.length} of {projects.length} projects
            </CardDescription>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                <Plus className="size-4" /> New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Kick off a project</DialogTitle>
                <DialogDescription>
                  Provide a quick summary so the workforce knows what success looks like.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleCreateProject}>
                <Input
                  required
                  autoFocus
                  placeholder="Project name"
                  value={draft.name}
                  onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                  leadingIcon={<Layers className="size-4" />}
                />
                <Textarea
                  placeholder="What is the objective or deliverable?"
                  value={draft.description}
                  onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
                  rows={4}
                />
                <DialogFooter>
                  <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" isLoading={isSubmitting} loadingText="Creating...">
                    Create project
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            leadingIcon={<Search className="size-4" />}
          />

          <div className="flex flex-wrap gap-2">
            {statusOptions.map(({ value, label, icon: Icon }) => {
              const isActive = statusFilter === value

              return (
                <Button
                  key={value}
                  type="button"
                  size="sm"
                  variant={isActive ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setStatusFilter(value)}
                >
                  <Icon className="size-4" />
                  <span className="capitalize">{value.replace("_", " ")}</span>
                  <Badge variant="outline" className="ml-1 border-transparent bg-background/70 text-xs font-medium">
                    {statusSummary[value]}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <EmptyState
            variant="no-results"
            title="No projects found"
            description="Try adjusting filters or start a new project."
            actionLabel="Reset filters"
            onAction={handleResetFilters}
          />
        ) : (
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="card-interactive p-4 border border-border rounded-lg space-y-3 bg-card/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm md:text-base">{project.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {project.annotationsCount.toLocaleString()} annotations • {project.team} team members
                    </p>
                  </div>
                  <Badge className={statusBadgeTone[project.status]}>
                    {project.status.replace("_", " ")}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Accuracy {project.accuracy}%</span>
                  <span>Team size {project.team}</span>
                </div>

                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    View details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
