"use client"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, AlertCircle, CheckCircle2, BarChart3 } from "lucide-react"

interface QAMetricsProps {
  totalReviews: number
  approved: number
  rejected: number
  avgScore: number
}

export function QAMetrics({ totalReviews, approved, rejected, avgScore }: QAMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <p className="text-2xl font-bold mt-2">{totalReviews}</p>
            </div>
            <BarChart3 className="w-8 h-8 text-primary opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold mt-2">{approved}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-accent opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejected/Revision</p>
              <p className="text-2xl font-bold mt-2">{rejected}</p>
            </div>
            <AlertCircle className="w-8 h-8 text-destructive opacity-50" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Quality Score</p>
              <p className="text-2xl font-bold mt-2">{avgScore.toFixed(1)}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
