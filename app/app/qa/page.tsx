"use client"
import { mockAnnotations, mockQAReviews } from "@/lib/mock-data"
import { QAMetrics } from "@/components/qa/qa-metrics"
import { QAReviewTable } from "@/components/qa/qa-review-table"
import { AccuracyChart } from "@/components/qa/accuracy-chart"
import { AnnotatorPerformance } from "@/components/qa/annotator-performance"

export default function QAPage() {
  const reviews = mockQAReviews.map((review) => {
    const annotation = mockAnnotations.find((a) => a.id === review.annotationId)
    return { ...review, annotation }
  })

  const approved = reviews.filter((r) => r.status === "approved").length
  const rejected = reviews.filter((r) => r.status !== "approved").length
  const avgScore = reviews.reduce((sum, r) => sum + r.score, 0) / reviews.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">QA Review Dashboard</h1>
        <p className="text-muted-foreground mt-2">Monitor annotation quality and review submissions</p>
      </div>

      <QAMetrics totalReviews={reviews.length} approved={approved} rejected={rejected} avgScore={avgScore} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccuracyChart />
        <AnnotatorPerformance />
      </div>

      <QAReviewTable reviews={reviews} />
    </div>
  )
}
