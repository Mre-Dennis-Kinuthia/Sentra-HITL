"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { BarChartIcon, CheckSquareIcon, UsersIcon, SettingsIcon, LogOutIcon, XIcon, ZapIcon } from "@/components/icons"

export function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navItems = [
    {
      label: "Annotate",
      href: "/app/annotate",
      icon: CheckSquareIcon,
      roles: ["annotator", "qa", "admin"],
    },
    {
      label: "My Tasks",
      href: "/app/annotate/tasks",
      icon: CheckSquareIcon,
      roles: ["annotator", "qa", "admin"],
    },
    {
      label: "History",
      href: "/app/annotate/history",
      icon: BarChartIcon,
      roles: ["annotator", "qa", "admin"],
    },
    {
      label: "Annotator Analytics",
      href: "/app/annotate/analytics",
      icon: BarChartIcon,
      roles: ["annotator", "qa", "admin"],
    },
    {
      label: "QA Review",
      href: "/app/qa",
      icon: BarChartIcon,
      roles: ["qa", "admin"],
    },
    {
      label: "Workforce",
      href: "/app/workforce",
      icon: UsersIcon,
      roles: ["admin"],
    },
    {
      label: "Dashboard",
      href: "/app/dashboard",
      icon: ZapIcon,
      roles: ["admin", "client"],
    },
    {
      label: "Settings",
      href: "/app/settings",
      icon: SettingsIcon,
      roles: ["admin", "annotator", "qa", "client"],
    },
  ]

  const filteredItems = navItems.filter((item) => user && item.roles.includes(user.role))

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <ZapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">Sentra</span>
          </div>
          <button onClick={onClose} className="md:hidden text-sidebar-foreground hover:text-sidebar-accent-foreground">
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {filteredItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <button
                  onClick={onClose}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </Link>
            )
          })}
        </nav>

        {/* User info and logout */}
        <div className="p-6 border-t border-sidebar-border">
          <div className="mb-4 pb-4 border-b border-sidebar-border">
            <p className="text-sm text-sidebar-foreground text-pretty">{user?.name}</p>
            <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
          </div>
          <Button
            onClick={() => {
              logout()
              onClose()
            }}
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
          >
            <LogOutIcon className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
