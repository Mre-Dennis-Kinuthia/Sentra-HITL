"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

const countries = [
  { name: "United States", code: "us", value: 74 },
  { name: "France", code: "fr", value: 43 },
  { name: "Japan", code: "jp", value: 38 },
  { name: "Sweden", code: "se", value: 24 },
  { name: "Spain", code: "es", value: 16 },
]

const vacancies = [
  { role: "Financial Analyst" },
  { role: "Software Developer" },
  { role: "Project Manager" },
]

export function AnalyticsSidebar() {
  return (
    <div className="space-y-4">
      <Card className="card-modern">
        <CardHeader>
          <CardTitle>Countries Insight</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {countries.map((c) => (
            <div key={c.code} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={`https://flagcdn.com/24x18/${c.code}.png`}
                    alt=""
                    width={24}
                    height={18}
                    className="rounded-sm"
                  />
                  <span className="text-sm">{c.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{c.value}%</span>
              </div>
              <Progress value={c.value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="card-modern">
        <CardHeader>
          <CardTitle>Current vacancies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {vacancies.map((v, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xs font-semibold">{v.role.charAt(0)}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{v.role}</p>
                  <p className="text-xs text-primary">View Details</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}


