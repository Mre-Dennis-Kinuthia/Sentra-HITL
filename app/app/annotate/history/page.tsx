"use client"

import { AnnotationHistory } from "@/components/annotation/annotation-history"

export default function AnnotatorHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Annotation History</h1>
        <p className="text-muted-foreground mt-2">Your recent changes and actions.</p>
      </div>
      <AnnotationHistory />
    </div>
  )
}


