"use client"

import * as React from "react"
import { mockTasks } from "@/lib/mock-data"
import type { AnnotationTask } from "@/lib/types"
import { TaskSidebar } from "@/components/annotation/task-sidebar"
import { useRouter } from "next/navigation"

// Local fallback to ensure JSX types are available even if ambient types are not yet loaded
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      div: any
      h1: any
    }
  }
}

export default function AnnotatorTasksPage(): React.JSX.Element {
  const [tasks] = React.useState<AnnotationTask[]>(mockTasks)
  const [selected, setSelected] = React.useState<AnnotationTask | null>(null)
  const [query, setQuery] = React.useState("")
  const router = useRouter()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">My Tasks</h1>
      </div>
      <div className="max-w-3xl">
        <TaskSidebar
          tasks={tasks}
          selectedTask={selected}
          onSelectTask={(t) => {
            setSelected(t)
            router.push(`/app/annotate?taskId=${t.id}`)
          }}
          searchQuery={query}
          onSearchChange={setQuery}
          hideHeader
        />
      </div>
    </div>
  )
}

