"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function UpcomingInterview() {
  return (
    <Card className="card-modern">
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image
            src="/avatar-placeholder.png"
            alt=""
            width={40}
            height={40}
            className="rounded-full bg-muted"
          />
          <div>
            <p className="text-sm text-muted-foreground">Front-End Developer</p>
            <p className="text-sm font-medium">Jordan Maccan</p>
          </div>
        </div>
        <div className="hidden md:block text-sm text-muted-foreground">11:30 AM - 12:45 AM</div>
        <div className="hidden md:block text-sm text-muted-foreground">PayPal</div>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="outline">View details</Button>
          <Button size="icon" className="rounded-full" aria-label="Call">📞</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function VacancyTrends() {
  return (
    <Card className="card-modern">
      <CardHeader>
        <CardTitle>Vacancy Trends</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Simple placeholder chart */}
        <div className="h-56 chart-container">
          <svg viewBox="0 0 400 160" className="w-full h-full">
            <polyline
              fill="none"
              stroke="var(--chart-5)"
              strokeWidth="2"
              points="0,90 60,110 100,80 150,95 200,70 260,85 320,75 380,85"
            />
            <polyline
              fill="none"
              stroke="var(--chart-2)"
              strokeWidth="2"
              points="0,110 60,100 100,120 150,105 200,115 260,120 320,110 380,120"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}


