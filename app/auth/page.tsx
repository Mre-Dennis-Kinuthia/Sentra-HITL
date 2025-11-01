"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Spinner } from "@/components/ui/spinner"
import { ZapIcon, AlertCircleIcon, ArrowRight } from "@/components/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [role, setRole] = useState<"annotator" | "qa" | "admin" | "client">("annotator")
  const [error, setError] = useState("")
  const [tab, setTab] = useState("login")
  const { login, signup, isLoading } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await login(email, password)
      router.push("/app/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed")
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await signup(email, password, name, role)
      router.push("/app/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed")
    }
  }

  const demoAccounts = [
    { email: "admin@sentra.com", role: "Admin", description: "Full platform access" },
    { email: "annotator1@sentra.com", role: "Annotator", description: "Annotation tools" },
    { email: "qa@sentra.com", role: "QA", description: "Review & quality" },
    { email: "client@sentra.com", role: "Client", description: "Project overview" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-light to-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Back to home link */}
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Back to Home
        </Link>

        {/* Mobile Logo */}
        <div className="lg:hidden flex flex-col items-center mb-8 space-y-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all">
              <ZapIcon className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Sentra</h1>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left side - Branding */}
          <div className="hidden lg:flex flex-col justify-center space-y-8">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/30 transition-all">
                  <ZapIcon className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">Sentra</h1>
              </Link>
              <p className="text-lg text-muted-foreground ml-0">Professional data annotation platform with video support</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm mt-1">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-foreground">Image & Video Annotation</p>
                  <p className="text-sm text-muted-foreground">Advanced tools for visual labeling</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm mt-1">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-foreground">Real-time Collaboration</p>
                  <p className="text-sm text-muted-foreground">Work with your team seamlessly</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm mt-1">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-foreground">Quality Management</p>
                  <p className="text-sm text-muted-foreground">Built-in QA and performance tracking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Auth Form */}
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card className="border border-border bg-card/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Sign in to your Sentra account</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-input/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-input/50"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="mt-8 space-y-4">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-card text-muted-foreground">Demo Accounts</span>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      {demoAccounts.map((account) => (
                        <button
                          key={account.email}
                          onClick={() => {
                            setEmail(account.email)
                            setPassword("demo")
                          }}
                          className="w-full text-left p-3 rounded-lg border border-border hover:bg-card hover:border-accent transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-semibold text-foreground text-sm">{account.role}</div>
                              <div className="text-xs text-muted-foreground">{account.email}</div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <Card className="border border-border bg-card/50 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>Get started with professional data annotation</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircleIcon className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-input/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-input/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isLoading}
                        className="bg-input/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value as "annotator" | "qa" | "admin" | "client")}
                        disabled={isLoading}
                        className="w-full px-3 py-2 bg-input/50 border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                      >
                        <option value="annotator">Annotator</option>
                        <option value="qa">QA Reviewer</option>
                        <option value="admin">Administrator</option>
                        <option value="client">Client</option>
                      </select>
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Spinner />
                      ) : (
                        <>
                          Create Account
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

