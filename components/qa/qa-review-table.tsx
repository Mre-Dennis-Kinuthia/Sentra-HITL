"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EmptyState } from "@/components/ui/empty-state"
import type { QAReview, Annotation } from "@/lib/types"
import { Search, ChevronUp, ChevronDown } from "lucide-react"

interface QAReviewTableProps {
  reviews: (QAReview & { annotation?: Annotation })[]
}

export function QAReviewTable({ reviews }: QAReviewTableProps) {
  const [sortField, setSortField] = useState<"score" | "date">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [searchQuery, setSearchQuery] = useState("")

  const sortedReviews = [...reviews].sort((a, b) => {
    const aVal = sortField === "score" ? a.score : a.createdAt.getTime()
    const bVal = sortField === "score" ? b.score : b.createdAt.getTime()
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal
  })

  const filteredReviews = sortedReviews.filter(
    (review) =>
      review.annotationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSort = (field: "score" | "date") => {
    if (sortField === field) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const scoreTone = (score: number) => {
    if (score >= 90) return "bg-success/20 text-success"
    if (score >= 75) return "bg-accent/20 text-accent"
    return "bg-warning/20 text-warning"
  }

  const statusTone = (status: string) => {
    switch (status) {
      case "approved":
        return "text-success border-success/30"
      case "needs_revision":
        return "text-warning border-warning/30"
      case "rejected":
        return "text-destructive border-destructive/30"
      default:
        return "text-muted-foreground border-muted"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Review History</CardTitle>
            <CardDescription>
              {filteredReviews.length} of {reviews.length} reviews
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Search by annotation ID or comment..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          leadingIcon={<Search className="size-4" />}
        />

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Annotation ID</TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("score")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Quality Score
                    {sortField === "score" && (
                      sortOrder === "asc" ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />
                    )}
                  </button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("date")}
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                  >
                    Date
                    {sortField === "date" && (
                      sortOrder === "asc" ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />
                    )}
                  </button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-12">
                    <EmptyState
                      variant="no-results"
                      title="No reviews match the current filters"
                      description="Adjust your search terms or reset filters to explore more QA activity."
                      actionLabel="Reset filters"
                      onAction={() => {
                        setSearchQuery("")
                        setSortField("date")
                        setSortOrder("desc")
                      }}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                filteredReviews.map((review) => (
                  <TableRow key={review.id} className="align-middle">
                    <TableCell className="font-medium">#{review.annotationId}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <div className="flex-1 h-2 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-accent transition-smooth"
                            style={{ width: `${review.score}%` }}
                          />
                        </div>
                        <Badge className={`px-2 py-0.5 text-xs ${scoreTone(review.score)}`}>{review.score}%</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`capitalize ${statusTone(review.status)}`}>
                        {review.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-sm text-sm text-muted-foreground">
                      <p className="line-clamp-2">{review.comment}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {review.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        <Button variant="ghost" size="sm">
                          Reassign
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
