"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockTasks } from "@/lib/mock-data"
import type { AnnotationTask } from "@/lib/types"
import { TaskSidebar } from "@/components/annotation/task-sidebar"
import { AdvancedAnnotationCanvas } from "@/components/annotation/advanced-annotation-canvas"
import { AnnotationHistory } from "@/components/annotation/annotation-history"
import { CheckCircle2, Clock, AlertCircle, MessageSquare } from "lucide-react"
import { FeedbackModal } from "@/components/notifications/feedback-modal"
import { RealTimeStatus } from "@/components/notifications/real-time-status"
import { useNotifications } from "@/lib/notifications-context"

export default function AnnotatePage() {
  const [tasks] = useState<AnnotationTask[]>(mockTasks)
  const [selectedTask, setSelectedTask] = useState<AnnotationTask | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const { addNotification } = useNotifications()

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Annotation Workspace</h1>
          <p className="text-muted-foreground mt-2">Complete annotation tasks for your projects</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => setFeedbackOpen(true)} className="gap-2">
          <MessageSquare className="w-4 h-4" />
          Share Feedback
        </Button>
      </div>

      <RealTimeStatus />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold mt-2">{stats.completed}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-accent opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold mt-2">{stats.inProgress}</p>
              </div>
              <Clock className="w-8 h-8 text-primary opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold mt-2">{stats.pending}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-destructive opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Annotation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Task List */}
        <div className="lg:col-span-1">
          <TaskSidebar
            tasks={tasks}
            selectedTask={selectedTask}
            onSelectTask={setSelectedTask}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Center - Annotation Canvas */}
        <div className="lg:col-span-2">
          {selectedTask ? (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedTask.title}</CardTitle>
                      <CardDescription className="mt-1">{selectedTask.type} annotation task</CardDescription>
                    </div>
                    <Badge className="capitalize">{selectedTask.priority}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-medium capitalize">{selectedTask.status}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium capitalize">{selectedTask.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p className="font-medium">{selectedTask.dueDate.toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {selectedTask.type === "text" ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Text Annotation</CardTitle>
                    <CardDescription>Highlight and annotate text content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-card border border-border rounded-lg min-h-48">
                      <p className="text-foreground leading-relaxed text-justify">
                        This is sample text content for annotation. Users can highlight specific portions to annotate
                        sentiment, entities, or other linguistic features. The annotation system supports multiple label
                        types and comprehensive feedback mechanisms.
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
                        Highlight Text
                      </button>
                      <button className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80">
                        Clear All
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="h-96 rounded-lg border border-border overflow-hidden">
                  <AdvancedAnnotationCanvas
                    mediaUrl={getMediaUrl(selectedTask)}
                    mediaType={selectedTask.type as "image" | "video"}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleSaveAnnotation} className="flex-1">
                  Save Annotations
                </Button>
                <Button onClick={handleSubmitTask} variant="outline" className="flex-1 bg-transparent">
                  Submit for Review
                </Button>
              </div>
            </div>
          ) : (
            <Card className="flex items-center justify-center min-h-96">
              <CardContent className="text-center">
                <p className="text-muted-foreground">Select a task to begin annotating</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Panel - History & Metadata */}
        <div className="lg:col-span-1">
          <AnnotationHistory />
        </div>
      </div>

      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        taskId={selectedTask?.id}
        taskTitle={selectedTask?.title}
      />
    </div>
  )
}
