"use client"

import { useMemo, useState, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { WorkforceMember, WorkforceStatus } from "@/lib/types"
import {
  filterWorkforceMembers,
  getFilterMetadata,
  sortWorkforceMembers,
  type WorkforceFilters,
  type WorkforceTableOptions,
  type WorkforceSortKey,
} from "@/lib/workforce-data"
import { Search, MoreVertical, ArrowUpDown, Filter } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShimmerSkeleton } from "@/components/ui/skeleton"

interface TeamManagementProps {
  members: WorkforceMember[]
  canManageMembers: boolean
}

const statusBadgeClass: Record<WorkforceStatus, string> = {
  active: "bg-accent text-accent-foreground",
  inactive: "bg-muted text-muted-foreground",
  training: "bg-primary text-primary-foreground",
  on_leave: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300",
}

const roleLabels: Record<string, string> = {
  annotator: "Annotator",
  qa: "QA Reviewer",
  team_lead: "Team Lead",
}

const columns: { key: WorkforceSortKey; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "tasksAssigned", label: "Assigned" },
  { key: "tasksInQueue", label: "In Queue" },
  { key: "completedThisWeek", label: "Completed (7d)" },
  { key: "qualityScore", label: "Quality" },
  { key: "trainingCompletion", label: "Training" },
  { key: "joinDate", label: "Joined" },
]

export function TeamManagement({ members, canManageMembers }: TeamManagementProps) {
  const [filters, setFilters] = useState<WorkforceFilters>({ role: "all", status: "all", location: "all" })
  const [tableOptions, setTableOptions] = useState<WorkforceTableOptions>({ sortKey: "name", sortDirection: "asc" })
  const [searchQuery, setSearchQuery] = useState("")
  const [isPending, startTransition] = useTransition()

  const metadata = useMemo(() => getFilterMetadata(members), [members])

  const filteredMembers = useMemo(() => {
    const filtered = filterWorkforceMembers(members, {
      ...filters,
      query: searchQuery,
    })
    return sortWorkforceMembers(filtered, tableOptions)
  }, [members, filters, tableOptions, searchQuery])

  const handleFilterChange = (update: Partial<WorkforceFilters>) => {
    startTransition(() => {
      setFilters((prev) => ({
        ...prev,
        ...update,
      }))
    })
  }

  const handleSort = (key: WorkforceSortKey) => {
    setTableOptions((prev) => {
      const nextDirection = prev.sortKey === key && prev.sortDirection === "asc" ? "desc" : "asc"
      return { sortKey: key, sortDirection: nextDirection }
    })
  }

  const sortedMembers = filteredMembers

  const formattedMembers = useMemo(
    () =>
      sortedMembers.map((member) => ({
        ...member,
        formattedJoinDate: member.joinDate.toLocaleDateString(),
      })),
    [sortedMembers]
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              {sortedMembers.length} of {members.length} in view - {metadata.roleCounts["annotator"] ?? 0} annotators - {metadata.statusCounts["training"] ?? 0} in
              training
            </CardDescription>
          </div>
          {canManageMembers && <Button>+ Add Member</Button>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value
              startTransition(() => {
                setSearchQuery(value)
              })
            }}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Role
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={filters.role ?? "all"}
                onValueChange={(value) => handleFilterChange({ role: value as WorkforceFilters["role"] })}
              >
                <DropdownMenuRadioItem value="all">All roles ({members.length})</DropdownMenuRadioItem>
                {Object.entries(metadata.roleCounts).map(([role, count]) => (
                  <DropdownMenuRadioItem key={role} value={role}>
                    {roleLabels[role] ?? role} ({count})
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={filters.status ?? "all"}
                onValueChange={(value) => handleFilterChange({ status: value as WorkforceFilters["status"] })}
              >
                <DropdownMenuRadioItem value="all">All statuses ({members.length})</DropdownMenuRadioItem>
                {Object.entries(metadata.statusCounts).map(([status, count]) => (
                  <DropdownMenuRadioItem key={status} value={status} className="capitalize">
                    {status.replace("_", " ")} ({count})
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" /> Location
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={filters.location ?? "all"}
                onValueChange={(value) => handleFilterChange({ location: value as WorkforceFilters["location"] })}
              >
                <DropdownMenuRadioItem value="all">All locations</DropdownMenuRadioItem>
                {metadata.locations.map((location) => (
                  <DropdownMenuRadioItem key={location} value={location}>
                    {location}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.key} className="whitespace-nowrap">
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 font-medium"
                      onClick={() => handleSort(column.key)}
                    >
                      {column.label}
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </Button>
                  </TableHead>
                ))}
                <TableHead>Email</TableHead>
                <TableHead>Location</TableHead>
                {canManageMembers && <TableHead>Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isPending && (
                <TableRow>
                  <TableCell colSpan={columns.length + (canManageMembers ? 3 : 2)}>
                    <div className="space-y-3">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="grid grid-cols-6 gap-4">
                          {Array.from({ length: 6 }).map((__, innerIndex) => (
                            <ShimmerSkeleton key={`${index}-${innerIndex}`} className="h-5" />
                          ))}
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}

              {!isPending &&
                formattedMembers.map((member) => (
                  <TableRow key={member.id} className="align-middle">
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell className="capitalize text-sm text-muted-foreground">{roleLabels[member.role] ?? member.role}</TableCell>
                    <TableCell>
                      <Badge className={statusBadgeClass[member.status]}>{member.status.replace("_", " ")}</Badge>
                    </TableCell>
                    <TableCell className="text-sm font-medium">{member.tasksAssigned}</TableCell>
                    <TableCell className="text-sm">{member.tasksInQueue}</TableCell>
                    <TableCell className="text-sm">{member.completedThisWeek}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div className="bg-accent h-full rounded-full" style={{ width: `${member.qualityScore}%` }} />
                        </div>
                        <span className="text-sm font-semibold">{member.qualityScore}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{member.trainingCompletion}%</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{member.formattedJoinDate}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{member.email}</TableCell>
                    <TableCell className="text-sm">{member.location}</TableCell>
                    {canManageMembers && (
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>

        {!isPending && formattedMembers.length === 0 && (
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
