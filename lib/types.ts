export type UserRole = "admin" | "annotator" | "qa" | "client" | "team_lead"

export type WorkforceRole = Extract<UserRole, "annotator" | "qa" | "team_lead">
export type WorkforceStatus = "active" | "inactive" | "training" | "on_leave"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface WorkforceMember extends User {
  role: WorkforceRole
  status: WorkforceStatus
  location: string
  timezone: string
  joinDate: Date
  tasksAssigned: number
  tasksInQueue: number
  completedThisWeek: number
  qualityScore: number
  qualityTrend: number
  trainingCompletion: number
  specializations: string[]
  certifications: string[]
  upcomingPtoDays?: number
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

export interface WorkforceTrainingModule {
  id: string
  name: string
  completion: number
  status: "completed" | "in_progress" | "pending"
  participants: number
  averageScore: number
  dueDate?: Date
}

export interface WorkforceTrainingSummary {
  completionRate: number
  certifiedCount: number
  inProgressCount: number
  overdueCount: number
  nextEvaluationDate: Date
}

export type WorkforceAlertPriority = "high" | "medium" | "low"

export interface WorkforceAlert {
  id: string
  title: string
  description: string
  priority: WorkforceAlertPriority
  owners: string[]
  action: string
  dueDate?: Date
}

export interface WorkforceCompositionSlice {
  name: string
  value: number
  change: number
}

export interface WorkforceHeadcountTrendPoint {
  month: string
  annotators: number
  qa: number
  teamLeads: number
  contractors: number
}

export interface WorkforceMemberPersonalSummary {
  memberId: string
  activeTasks: number
  dueToday: number
  avgQuality: number
  trainingModulesDue: number
  nextTraining?: string
  focusAreas: string[]
}
