"use client"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "@/components/icons"
import { NotificationCenter } from "@/components/notifications/notification-center"

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden">
            <MenuIcon className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-semibold">Sentra Platform</h1>
        </div>
        <div className="flex items-center gap-4">
          <NotificationCenter />
          <div className="text-sm text-muted-foreground">{user?.email}</div>
        </div>
      </div>
    </header>
  )
}
