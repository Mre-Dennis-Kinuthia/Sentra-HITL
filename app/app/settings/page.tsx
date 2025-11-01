"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Bell, Shield, Users } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences and platform settings</p>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={user?.name} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user?.email} disabled />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Role</Label>
            <Input defaultValue={user?.role} disabled className="capitalize" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Customize your notification preferences</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              {
                label: "Email Notifications",
                enabled: true,
                description: "Receive updates about your tasks and reviews",
              },
              { label: "Task Reminders", enabled: true, description: "Get reminded about pending annotation tasks" },
              { label: "Quality Reports", enabled: false, description: "Weekly quality performance summaries" },
              { label: "Team Updates", enabled: true, description: "Notifications about team activities" },
            ].map((pref, i) => (
              <label
                key={i}
                className="flex items-start gap-3 cursor-pointer p-3 rounded hover:bg-muted/50 transition-colors"
              >
                <input type="checkbox" defaultChecked={pref.enabled} className="w-4 h-4 rounded mt-1" />
                <div className="flex-1">
                  <span className="text-sm font-medium">{pref.label}</span>
                  <p className="text-xs text-muted-foreground">{pref.description}</p>
                </div>
              </label>
            ))}
          </div>
          <Button>Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <div>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your security settings</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Password</p>
              <Button variant="outline">Change Password</Button>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Two-Factor Authentication</p>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Active Sessions</p>
              <p className="text-xs text-muted-foreground mb-2">Currently signed in on 1 device</p>
              <Button variant="outline">Manage Sessions</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
