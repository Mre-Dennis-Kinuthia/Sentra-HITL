"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { EmptyState } from "@/components/ui/empty-state"
import type { AnnotationTask } from "@/lib/types"
import { Search } from "lucide-react"

interface TaskSidebarProps {
  tasks: AnnotationTask[]
  selectedTask: AnnotationTask | null
  onSelectTask: (task: AnnotationTask) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  hideHeader?: boolean
}

export function TaskSidebar({ tasks, selectedTask, onSelectTask, searchQuery, onSearchChange, hideHeader }: TaskSidebarProps) {
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-accent/20 text-accent"
      case "in_progress":
        return "bg-primary/20 text-primary"
      case "pending":
        return "bg-muted"
      default:
        return "bg-muted"
    }
  }

  return (
    <Card className="flex flex-col h-full">
      {!hideHeader && (
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
          <CardDescription>
            {filteredTasks.length} of {tasks.length} tasks
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className="flex-1 flex flex-col space-y-4 overflow-hidden">
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          inputClassName="h-9"
          leadingIcon={<Search className="size-4" />}
        />

        {filteredTasks.length === 0 ? (
          <div className="flex-1">
            <EmptyState
              variant="no-results"
              title="No tasks match your search"
              description="Try a different keyword or clear the filter to view all tasks."
            />
          </div>
        ) : (
          <div className="flex-1 space-y-2 overflow-y-auto">
            {filteredTasks.map((task) => (
              <button
                key={task.id}
                onClick={() => onSelectTask(task)}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  selectedTask?.id === task.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium text-sm line-clamp-2">{task.title}</p>
                    <Badge variant="outline" className="shrink-0 text-xs">
                      {task.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</span>
                    <Badge className={`text-xs capitalize ${getProgressColor(task.status)}`}>
                      {task.status.replace("_", " ")}
                    </Badge>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
