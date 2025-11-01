"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ZapIcon, CheckIcon } from "@/components/icons"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface-light to-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
              <ZapIcon className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">Sentra</span>
          </div>
          <Link href="/auth">
            <Button variant="outline">Sign In</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center shadow-2xl shadow-primary/30">
              <ZapIcon className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              Professional Data Annotation
              <span className="block text-primary mt-2">Made Simple</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Human-in-the-loop annotation platform with advanced tools for images, video, and text
            </p>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth">
              <Button size="lg" className="px-8 py-6 text-lg bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Learn More
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 pt-16">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <CheckIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Advanced Tools</h3>
              <p className="text-muted-foreground text-sm">
                Intuitive annotation workspace with bounding boxes, polygons, and text highlighting
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto">
                <CheckIcon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Quality Control</h3>
              <p className="text-muted-foreground text-sm">
                Built-in QA review system with performance tracking and accuracy metrics
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <CheckIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Team Management</h3>
              <p className="text-muted-foreground text-sm">
                Workforce hub with training programs and real-time collaboration features
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-32">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2025 Sentra by Tessellations. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
