"use client"

import { useState } from "react"
import { mockTasks } from "@/lib/mock-data"
import type { AnnotationTask } from "@/lib/types"
import { TaskSidebar } from "@/components/annotation/task-sidebar"
import { useRouter } from "next/navigation"

export default function AnnotatorTasksPage() {
  const [tasks] = useState<AnnotationTask[]>(mockTasks)
  const [selected, setSelected] = useState<AnnotationTask | null>(null)
  const [query, setQuery] = useState("")
  const router = useRouter()

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">My Tasks</h1>
        <p className="text-muted-foreground text-sm">Pick a task to open the annotation workspace.</p>
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
        />
      </div>
    </div>
  )
}

