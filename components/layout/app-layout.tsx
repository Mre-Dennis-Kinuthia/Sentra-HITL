"use client"

import React, { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import { NotificationsProvider } from "@/lib/notifications-context"
import { ErrorBoundary } from "@/components/error-boundary"

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, isLoading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push("/")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <ErrorBoundary>
      <NotificationsProvider>
        <div className="flex h-screen">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 overflow-auto bg-background">
              <div className="p-6">{children}</div>
            </main>
          </div>
        </div>
      </NotificationsProvider>
    </ErrorBoundary>
  )
}
