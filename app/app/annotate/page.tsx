"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockTasks } from "@/lib/mock-data"
import type { AnnotationTask } from "@/lib/types"
import Link from "next/link"
import { AdvancedAnnotationCanvas } from "@/components/annotation/advanced-annotation-canvas"
import { CheckCircle2, Clock, AlertCircle, MessageSquare } from "lucide-react"
import { FeedbackModal } from "@/components/notifications/feedback-modal"
import { useNotifications } from "@/lib/notifications-context"
import { EmptyState } from "@/components/ui/empty-state"
import { useAnnotationStore } from "@/lib/annotation-store"

import { useSearchParams } from "next/navigation"

export default function AnnotatePage() {
  const [tasks] = useState<AnnotationTask[]>(mockTasks)
  const [selectedTask, setSelectedTask] = useState<AnnotationTask | null>(null)
  const searchParams = useSearchParams()
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const { addNotification } = useNotifications()
  const { annotations } = useAnnotationStore()

  const stats = {
    completed: tasks.filter((t) => t.status === "completed").length,
    inProgress: tasks.filter((t) => t.status === "in_progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  }

  const getMediaUrl = (task: AnnotationTask): string => {
    switch (task.type) {
      case "video":
        return "/placeholder.svg?key=9kwir"
      case "image":
        return "/placeholder.svg?key=t7aeb"
      default:
        return ""
    }
  }

  const handleSaveAnnotation = () => {
    if (selectedTask) {
      addNotification({
        type: "success",
        title: "Annotations Saved",
        message: `Your annotations for "${selectedTask.title}" have been saved successfully`,
      })
    }
  }

  const handleSubmitTask = () => {
    // Basic validation
    if (annotations.length === 0) {
      addNotification({ type: "error", title: "Add annotations first", message: "Please create at least one annotation before submitting." })
      return
    }
    if (selectedTask) {
      addNotification({
        type: "success",
        title: "Task Submitted for Review",
        message: `"${selectedTask.title}" has been submitted for QA review`,
      })
      // Simulate task completion
      setTimeout(() => {
        addNotification({
          type: "info",
          title: "QA Review Started",
          message: "Emma QA has started reviewing your submissions",
        })
      }, 2000)
    }
  }

  useEffect(() => {
    const id = searchParams.get("taskId")
    if (id) {
      const found = tasks.find((t) => t.id === id)
      if (found) setSelectedTask(found)
    }
  }, [searchParams, tasks])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Annotation</h1>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Link href="/app/annotate/tasks" className="text-primary">My Tasks</Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/app/annotate/history" className="text-primary">History</Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/app/annotate/analytics" className="text-primary">Analytics</Link>
          <Button variant="outline" size="sm" onClick={() => setFeedbackOpen(true)} className="ml-2">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {selectedTask ? (
        <div className="space-y-3">
          <div className="text-xs text-muted-foreground">
            <Badge className="capitalize mr-2">{selectedTask.priority}</Badge>
            {selectedTask.type} • Due {selectedTask.dueDate.toLocaleDateString()}
          </div>
          <div className="h-[70vh] rounded-lg border border-border overflow-hidden">
            <AdvancedAnnotationCanvas mediaUrl={getMediaUrl(selectedTask)} mediaType={selectedTask.type as "image" | "video"} />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveAnnotation} className="flex-1">Save</Button>
            <Button onClick={handleSubmitTask} variant="outline" className="flex-1 bg-transparent">Submit</Button>
          </div>
        </div>
      ) : (
        <EmptyState
          variant="no-tasks"
          title="No task selected"
          description="Open My Tasks to start annotating"
          actionLabel="Open My Tasks"
          onAction={() => window.location.assign('/app/annotate/tasks')}
        />
      )}

      <FeedbackModal isOpen={feedbackOpen} onClose={() => setFeedbackOpen(false)} taskId={selectedTask?.id} taskTitle={selectedTask?.title} />
    </div>
  )
}
