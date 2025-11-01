"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

interface BBox {
  id: string
  x: number
  y: number
  width: number
  height: number
  label: string
}

interface AnnotationCanvasProps {
  taskType: "image" | "text"
  content?: string
}

export function AnnotationCanvas({ taskType, content }: AnnotationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [bboxes, setBboxes] = useState<BBox[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [selectedLabel, setSelectedLabel] = useState("product")

  const labels = ["product", "person", "vehicle", "animal", "text", "other"]

  useEffect(() => {
    if (taskType === "image" && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Draw background
      ctx.fillStyle = "#1a1a1a"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw placeholder image
      ctx.fillStyle = "#27272a"
      ctx.fillRect(50, 50, 300, 200)
      ctx.fillStyle = "#a1a1a6"
      ctx.font = "14px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText("Image Content", 200, 140)

      // Draw existing bboxes
      bboxes.forEach((bbox) => {
        ctx.strokeStyle = "#6366f1"
        ctx.lineWidth = 2
        ctx.strokeRect(bbox.x, bbox.y, bbox.width, bbox.height)
        ctx.fillStyle = "#6366f1"
        ctx.fillRect(bbox.x, bbox.y - 20, 60, 20)
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "left"
        ctx.fillText(bbox.label, bbox.x + 5, bbox.y - 5)
      })
    }
  }, [bboxes, taskType])

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (taskType !== "image") return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    setIsDrawing(true)
    setStartPoint({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPoint || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const endPoint = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }

    const newBBox: BBox = {
      id: Math.random().toString(),
      x: Math.min(startPoint.x, endPoint.x),
      y: Math.min(startPoint.y, endPoint.y),
      width: Math.abs(endPoint.x - startPoint.x),
      height: Math.abs(endPoint.y - startPoint.y),
      label: selectedLabel,
    }

    setBboxes([...bboxes, newBBox])
    setIsDrawing(false)
    setStartPoint(null)
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleRemoveBBox = (id: string) => {
    setBboxes(bboxes.filter((bbox) => bbox.id !== id))
  }

  if (taskType === "text") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Text Annotation</CardTitle>
          <CardDescription>Highlight and annotate text content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-card border border-border rounded-lg min-h-48">
            <p className="text-foreground leading-relaxed text-justify">
              {content ||
                "This is sample text content for annotation. Users can highlight specific portions to annotate sentiment, entities, or other linguistic features. The annotation system supports multiple label types and comprehensive feedback mechanisms."}
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <Button>Highlight Text</Button>
            <Button variant="outline">Clear All</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Annotation</CardTitle>
        <CardDescription>Draw bounding boxes to annotate objects</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Label</label>
          <div className="flex flex-wrap gap-2">
            {labels.map((label) => (
              <button
                key={label}
                onClick={() => setSelectedLabel(label)}
                className={`px-3 py-1 rounded text-sm transition-colors capitalize ${
                  selectedLabel === label
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          onMouseDown={handleCanvasMouseDown}
          onMouseUp={handleCanvasMouseUp}
          className="w-full border border-border rounded-lg cursor-crosshair bg-card"
        />

        {bboxes.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">{bboxes.length} annotation(s)</p>
            <div className="space-y-2">
              {bboxes.map((bbox) => (
                <div key={bbox.id} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div className="text-sm">
                    <Badge className="capitalize">{bbox.label}</Badge>
                    <span className="text-muted-foreground ml-2 text-xs">
                      ({Math.round(bbox.x)}, {Math.round(bbox.y)})
                    </span>
                  </div>
                  <button
                    onClick={() => handleRemoveBBox(bbox.id)}
                    className="text-destructive hover:text-destructive/80 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <Button onClick={handleSave} disabled={isSaving || bboxes.length === 0}>
            {isSaving ? <Spinner /> : "Save Annotations"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setBboxes([])
              setSelectedLabel("product")
            }}
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
