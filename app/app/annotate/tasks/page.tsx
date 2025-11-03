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

"use client"

import Link from "next/link"
import { mockTasks } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function AnnotatorTasksPage() {
  const [query, setQuery] = useState("")
  const filtered = mockTasks.filter(
    (t) => t.title.toLowerCase().includes(query.toLowerCase()) || t.type.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-muted-foreground mt-2">Pick a task to open the lean annotation workspace.</p>
        </div>
      </div>

      <Input placeholder="Search tasks..." value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-sm" />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-base leading-tight line-clamp-2">{task.title}</CardTitle>
                <Badge variant="outline" className="capitalize">{task.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Due {task.dueDate.toLocaleDateString()}</span>
              <Link href={`/app/annotate?taskId=${task.id}`} className="text-primary text-sm">
                Open
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


