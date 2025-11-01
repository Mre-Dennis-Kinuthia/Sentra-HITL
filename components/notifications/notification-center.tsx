"use client"
import { useState, useCallback } from "react"
import type React from "react"

import { useNotifications } from "@/lib/notifications-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BellIcon, Trash2Icon, CheckIcon, AlertCircleIcon, CheckCircleIcon, InfoIcon } from "@/components/icons"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationCenter() {
  const { notifications, markAsRead, dismissNotification, clearAll, unreadCount } = useNotifications()
  const [open, setOpen] = useState(false)

  const getNotificationIcon = useCallback((type: string) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertCircleIcon className="w-4 h-4 text-yellow-500" />
      case "error":
        return <AlertCircleIcon className="w-4 h-4 text-destructive" />
      default:
        return <InfoIcon className="w-4 h-4 text-blue-500" />
    }
  }, [])

  const handleMarkAsRead = useCallback(
    (id: string, e?: React.MouseEvent) => {
      if (e) e.stopPropagation()
      markAsRead(id)
    },
    [markAsRead],
  )

  const handleDismiss = useCallback(
    (id: string, e: React.MouseEvent) => {
      e.stopPropagation()
      dismissNotification(id)
    },
    [dismissNotification],
  )

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={`Notifications (${unreadCount} unread)`}>
          <BellIcon className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAll}
              className="text-xs h-6"
              aria-label="Clear all notifications"
            >
              Clear All
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <BellIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          <ScrollArea className="h-80">
            <div className="space-y-1 p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-colors hover:bg-accent/50 cursor-pointer ${
                    notification.read ? "bg-card" : "bg-primary/5 border-primary/20"
                  }`}
                  onClick={() => handleMarkAsRead(notification.id)}
                  role="article"
                  aria-label={`${notification.title}: ${notification.message}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-tight">{notification.title}</p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleDismiss(notification.id, e)}
                          className="h-6 w-6 p-0"
                          aria-label="Dismiss notification"
                        >
                          <Trash2Icon className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {Math.floor((Date.now() - notification.timestamp.getTime()) / 60000)}m ago
                        </span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => handleMarkAsRead(notification.id, e)}
                            className="h-5 text-xs gap-1"
                            aria-label="Mark as read"
                          >
                            <CheckIcon className="w-3 h-3" />
                            Mark Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}

        <DropdownMenuSeparator />
        <div className="p-2">
          <Button variant="outline" className="w-full text-xs h-8 bg-transparent">
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
