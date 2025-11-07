import {
  mockAnnotatorStats,
  mockWorkforceMembers,
  mockWorkforceAlerts,
  mockWorkforceTrainingModules,
  mockWorkforceTrainingSummary,
  mockWorkforceComposition,
  mockWorkforceHeadcountTrend,
  mockWorkforcePersonalSummaries,
} from "./mock-data"
import type {
  WorkforceMember,
  WorkforceTrainingModule,
  WorkforceTrainingSummary,
  WorkforceAlert,
  WorkforceCompositionSlice,
  WorkforceHeadcountTrendPoint,
  WorkforceMemberPersonalSummary,
  WorkforceStatus,
  WorkforceRole,
} from "./types"

export interface WorkforceKpiSummary {
  totalMembers: number
  activeMembers: number
  utilization: number
  tasksCompletedThisWeek: number
  avgQualityScore: number
  qualityTrend: number
  onTimeDelivery: number
  trainingCoverage: number
  upcomingPtoDays: number
  benchStrength: number
}

export interface WorkforceFilters {
  query?: string
  role?: WorkforceRole | "all"
  status?: WorkforceStatus | "all"
  location?: string | "all"
}

export type WorkforceSortKey =
  | "name"
  | "role"
  | "status"
  | "tasksAssigned"
  | "tasksInQueue"
  | "completedThisWeek"
  | "qualityScore"
  | "trainingCompletion"
  | "joinDate"

export type WorkforceSortDirection = "asc" | "desc"

export interface WorkforceTableOptions {
  sortKey?: WorkforceSortKey
  sortDirection?: WorkforceSortDirection
}

export function getWorkforceMembers(): WorkforceMember[] {
  return mockWorkforceMembers
}

export function getWorkforceAlerts(): WorkforceAlert[] {
  return mockWorkforceAlerts
}

export function getWorkforceTrainingModules(): WorkforceTrainingModule[] {
  return mockWorkforceTrainingModules
}

export function getWorkforceTrainingSummary(): WorkforceTrainingSummary {
  return mockWorkforceTrainingSummary
}

export function getWorkforceComposition(): WorkforceCompositionSlice[] {
  return mockWorkforceComposition
}

export function getWorkforceHeadcountTrend(): WorkforceHeadcountTrendPoint[] {
  return mockWorkforceHeadcountTrend
}

export function getPersonalSummary(memberId: string): WorkforceMemberPersonalSummary | undefined {
  return mockWorkforcePersonalSummaries.find((summary) => summary.memberId === memberId)
}

export function getPersonalizedAlerts(memberId: string): WorkforceAlert[] {
  return getWorkforceAlerts().filter((alert) => alert.owners.includes(memberId))
}

export function getWorkforceKpis(): WorkforceKpiSummary {
  const members = getWorkforceMembers()
  const trainingSummary = getWorkforceTrainingSummary()

  const totalMembers = members.length
  const activeMembers = members.filter((member) => member.status === "active").length
  const utilization = totalMembers === 0 ? 0 : Math.round((activeMembers / totalMembers) * 100)

  const tasksCompletedThisWeek = members.reduce((acc, member) => acc + member.completedThisWeek, 0)
  const qualityScores = members.filter((member) => member.qualityScore > 0).map((member) => member.qualityScore)
  const avgQualityScore =
    qualityScores.length === 0 ? 0 : Math.round((qualityScores.reduce((acc, score) => acc + score, 0) / qualityScores.length) * 10) / 10

  const qualityTrendTotal = members.reduce((acc, member) => acc + member.qualityTrend, 0)
  const qualityTrend = Math.round((qualityTrendTotal / Math.max(1, members.length)) * 10) / 10

  const onTimeDelivery = Math.round(mockAnnotatorStats.onTimeDelivery * 10) / 10
  const trainingCoverage = trainingSummary.completionRate

  const upcomingPtoDays = members.reduce((acc, member) => acc + (member.upcomingPtoDays ?? 0), 0)
  const benchStrength = members.filter((member) => member.status !== "active").length

  return {
    totalMembers,
    activeMembers,
    utilization,
    tasksCompletedThisWeek,
    avgQualityScore,
    qualityTrend,
    onTimeDelivery,
    trainingCoverage,
    upcomingPtoDays,
    benchStrength,
  }
}

export function filterWorkforceMembers(
  members: WorkforceMember[],
  { query = "", role = "all", status = "all", location = "all" }: WorkforceFilters
): WorkforceMember[] {
  return members.filter((member) => {
    const matchesQuery = query
      ? `${member.name} ${member.email}`.toLowerCase().includes(query.trim().toLowerCase())
      : true
    const matchesRole = role === "all" ? true : member.role === role
    const matchesStatus = status === "all" ? true : member.status === status
    const matchesLocation = location === "all" ? true : member.location === location

    return matchesQuery && matchesRole && matchesStatus && matchesLocation
  })
}

export function sortWorkforceMembers(
  members: WorkforceMember[],
  { sortKey = "name", sortDirection = "asc" }: WorkforceTableOptions
): WorkforceMember[] {
  const sorted = [...members]
  sorted.sort((a, b) => {
    const direction = sortDirection === "asc" ? 1 : -1

    switch (sortKey) {
      case "name":
        return a.name.localeCompare(b.name) * direction
      case "role":
        return a.role.localeCompare(b.role) * direction
      case "status":
        return a.status.localeCompare(b.status) * direction
      case "tasksAssigned":
        return (a.tasksAssigned - b.tasksAssigned) * direction
      case "tasksInQueue":
        return (a.tasksInQueue - b.tasksInQueue) * direction
      case "completedThisWeek":
        return (a.completedThisWeek - b.completedThisWeek) * direction
      case "qualityScore":
        return (a.qualityScore - b.qualityScore) * direction
      case "trainingCompletion":
        return (a.trainingCompletion - b.trainingCompletion) * direction
      case "joinDate":
        return (a.joinDate.getTime() - b.joinDate.getTime()) * direction
      default:
        return 0
    }
  })

  return sorted
}

export function getFilterMetadata(members: WorkforceMember[]) {
  const uniqueLocations = Array.from(new Set(members.map((member) => member.location))).sort()
  const roleCounts = members.reduce<Record<string, number>>((acc, member) => {
    acc[member.role] = (acc[member.role] ?? 0) + 1
    return acc
  }, {})
  const statusCounts = members.reduce<Record<string, number>>((acc, member) => {
    acc[member.status] = (acc[member.status] ?? 0) + 1
    return acc
  }, {})

  return {
    locations: uniqueLocations,
    roleCounts,
    statusCounts,
  }
}

export function getTrainingInsights() {
  return {
    summary: getWorkforceTrainingSummary(),
    modules: getWorkforceTrainingModules(),
  }
}

export function getDistributionInsights() {
  return {
    composition: getWorkforceComposition(),
    headcountTrend: getWorkforceHeadcountTrend(),
  }
}

