"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { QAReview, Annotation } from "@/lib/types"
import { Search, ChevronUp, ChevronDown } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"

interface QAReviewTableProps {
  reviews: (QAReview & { annotation?: Annotation })[]
}

export function QAReviewTable({ reviews }: QAReviewTableProps) {
  const [sortField, setSortField] = useState<"score" | "date">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [searchQuery, setSearchQuery] = useState("")

  const sortedReviews = [...reviews].sort((a, b) => {
    let aVal: number
    let bVal: number

    if (sortField === "score") {
      aVal = a.score
      bVal = b.score
    } else {
      aVal = a.createdAt.getTime()
      bVal = b.createdAt.getTime()
    }

    return sortOrder === "asc" ? aVal - bVal : bVal - aVal
  })

  const filteredReviews = sortedReviews.filter(
    (review) =>
      review.annotationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSort = (field: "score" | "date") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("desc")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-accent/20 text-accent"
      case "rejected":
        return "bg-destructive/20 text-destructive"
      case "needs_revision":
        return "bg-primary/20 text-primary"
      default:
        return "bg-muted"
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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by annotation ID or comment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

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
                    {sortField === "score" &&
                      (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
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
                    {sortField === "date" &&
                      (sortOrder === "asc" ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />)}
                  </button>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">#{review.annotationId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-muted rounded-full h-2 max-w-[60px]">
                        <div className="bg-accent h-full rounded-full" style={{ width: `${review.score}%` }} />
                      </div>
                      <span className="text-sm font-semibold">{review.score}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`capitalize ${getStatusColor(review.status)}`}>
                      {review.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">{review.comment}</TableCell>
                  <TableCell className="text-sm">{review.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {filteredReviews.length === 0 && (
          <EmptyState
            variant={searchQuery ? "no-results" : "default"}
            title={searchQuery ? "No reviews found" : "No reviews yet"}
            description={
              searchQuery
                ? "Try adjusting your search query to find reviews"
                : "Reviews will appear here once annotations are submitted for QA"
            }
          />
        )}
      </CardContent>
    </Card>
  )
}
