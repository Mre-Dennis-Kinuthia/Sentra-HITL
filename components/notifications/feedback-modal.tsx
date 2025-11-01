"use client"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { CheckCircle2 } from "lucide-react" // Import CheckCircle2

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
  taskId?: string
  taskTitle?: string
}

export function FeedbackModal({ isOpen, onClose, taskId, taskTitle }: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    // Simulate feedback submission
    setSubmitted(true)
    setTimeout(() => {
      onClose()
      setRating(0)
      setFeedback("")
      setSubmitted(false)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Feedback</DialogTitle>
          <DialogDescription>
            {taskTitle
              ? `Help us improve your experience with "${taskTitle}"`
              : "Your feedback helps us improve the annotation experience"}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 mb-4">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <p className="font-medium">Thank you for your feedback!</p>
            <p className="text-sm text-muted-foreground mt-1">We appreciate your input</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Rate Your Experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="transition-colors">
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="feedback" className="text-sm font-medium">
                Comments (Optional)
              </label>
              <Textarea
                id="feedback"
                placeholder="Tell us what you think... Any suggestions for improvement?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-32 resize-none"
              />
            </div>

            <div className="flex gap-2">
              <Badge variant="outline">Helpful</Badge>
              <Badge variant="outline">Needs Improvement</Badge>
              <Badge variant="outline">Bug Report</Badge>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={submitted}>
            {submitted ? "Submitting..." : "Cancel"}
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0 || submitted}>
            {submitted ? "Submitted" : "Submit Feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
