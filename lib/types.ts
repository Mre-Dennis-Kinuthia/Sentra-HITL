export type UserRole = "admin" | "annotator" | "qa" | "client"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface AnnotationTask {
  id: string
  title: string
  type: "image" | "text" | "video"
  status: "pending" | "in_progress" | "completed" | "reviewed"
  priority: "low" | "medium" | "high"
  assignedTo: string
  createdAt: Date
  dueDate: Date
}

export interface Annotation {
  id: string
  taskId: string
  type: "bbox" | "highlight" | "text"
  data: Record<string, unknown>
  createdAt: Date
  status: "pending" | "approved" | "rejected"
}

export interface QAReview {
  id: string
  annotationId: string
  reviewerId: string
  score: number
  comment: string
  status: "approved" | "rejected" | "needs_revision"
  createdAt: Date
}
