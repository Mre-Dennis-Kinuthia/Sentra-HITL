"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useAnnotationStore } from "@/lib/annotation-store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Square,
  Circle,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  Upload,
  Undo2,
  Redo2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { KeyboardShortcutsModal } from "@/components/ui/keyboard-shortcuts-modal"

interface AdvancedAnnotationCanvasProps {
  mediaUrl: string
  mediaType: "image" | "video"
  onAnnotationComplete?: (annotations: any[]) => void
}

export function AdvancedAnnotationCanvas({ mediaUrl, mediaType, onAnnotationComplete }: AdvancedAnnotationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const {
    annotations,
    addAnnotation,
    removeAnnotation,
    clearAnnotations,
    undo,
    redo,
    canUndo,
    canRedo,
    exportAnnotations,
    importAnnotations,
  } = useAnnotationStore()

  // Tool and UI state
  const [tool, setTool] = useState<"bbox" | "polygon" | "point" | "line" | "text">("bbox")
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [label, setLabel] = useState("object")
  const [color, setColor] = useState("#7c3aed")
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [videoMuted, setVideoMuted] = useState(false)
  const [showKB, setShowKB] = useState(false)
  const [locked, setLocked] = useState(false)

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "z") {
          e.preventDefault()
          undo()
        } else if (e.key === "y" || (e.shiftKey && e.key === "z")) {
          e.preventDefault()
          redo()
        }
      }

      if (e.key === "?") {
        setShowKB(!showKB)
      }

      // Tool shortcuts
      if (!locked) {
        if (e.key === "b") setTool("bbox")
        if (e.key === "p") setTool("polygon")
        if (e.key === "o") setTool("point")
        if (e.key === "l") setTool("line")
        if (e.key === "t") setTool("text")
        if (e.key === "Delete") clearAnnotations()
      }

      // Space for video playback
      if (mediaType === "video" && e.code === "Space") {
        e.preventDefault()
        if (videoRef.current) {
          if (videoPlaying) {
            videoRef.current.pause()
          } else {
            videoRef.current.play()
          }
          setVideoPlaying(!videoPlaying)
        }
      }

      // Zoom shortcuts
      if (e.key === "+" || e.key === "=") {
        e.preventDefault()
        setZoom((z) => Math.min(z + 0.1, 3))
      }
      if (e.key === "-") {
        e.preventDefault()
        setZoom((z) => Math.max(z - 0.1, 0.5))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [videoPlaying, locked, showKB, undo, redo, clearAnnotations, mediaType])

  // Draw annotations on canvas
  const drawAnnotations = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.translate(pan.x, pan.y)
    ctx.scale(zoom, zoom)

    annotations.forEach((ann) => {
      ctx.strokeStyle = ann.color
      ctx.fillStyle = ann.color + "20"
      ctx.lineWidth = 2 / zoom
      ctx.font = `${14 / zoom}px sans-serif`

      if (ann.type === "bbox") {
        const { x, y, width, height } = ann.data
        ctx.fillRect(x, y, width, height)
        ctx.strokeRect(x, y, width, height)
        ctx.fillStyle = ann.color
        ctx.fillText(ann.label, x, y - 5)
      } else if (ann.type === "point") {
        const { x, y } = ann.data
        const radius = 5 / zoom
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()
        ctx.fillStyle = ann.color
        ctx.fillText(ann.label, x + 10, y)
      }
    })

    ctx.restore()
  }, [annotations, pan, zoom])

  useEffect(() => {
    drawAnnotations()
  }, [drawAnnotations])

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (locked) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left - pan.x) / zoom
    const y = (e.clientY - rect.top - pan.y) / zoom

    setStartPos({ x, y })
    setIsDrawing(true)
  }

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left - pan.x) / zoom
    const y = (e.clientY - rect.top - pan.y) / zoom

    // Real-time preview (would be enhanced in full implementation)
    drawAnnotations()
  }

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const endX = (e.clientX - rect.left - pan.x) / zoom
    const endY = (e.clientY - rect.top - pan.y) / zoom

    if (tool === "bbox") {
      const width = Math.abs(endX - startPos.x)
      const height = Math.abs(endY - startPos.y)
      const x = Math.min(startPos.x, endX)
      const y = Math.min(startPos.y, endY)

      if (width > 5 && height > 5) {
        addAnnotation({
          id: Date.now().toString(),
          type: "bbox",
          label,
          color,
          data: { x, y, width, height },
          timestamp: Date.now(),
        })
      }
    }

    setIsDrawing(false)
  }

  const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setZoom((z) => Math.max(0.5, Math.min(3, z + delta)))
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col bg-surface-subtle rounded-xl overflow-hidden border border-border"
      onWheel={handleMouseWheel}
    >
      {/* Toolbar */}
      <div className="bg-card border-b border-border p-3 flex items-center gap-2 overflow-x-auto">
        <TooltipProvider>
          {/* Tool Selection */}
          <div className="flex items-center gap-1 border-r border-border pr-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={tool === "bbox" ? "default" : "ghost"}
                  onClick={() => setTool("bbox")}
                  className="gap-1"
                >
                  <Square className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bounding Box (B)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={tool === "polygon" ? "default" : "ghost"}
                  onClick={() => setTool("polygon")}
                  className="gap-1"
                >
                  <Circle className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Polygon (P)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={tool === "point" ? "default" : "ghost"}
                  onClick={() => setTool("point")}
                  className="gap-1"
                >
                  <Circle className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Point (O)</TooltipContent>
            </Tooltip>
          </div>

          {/* Undo/Redo */}
          <div className="flex items-center gap-1 border-r border-border px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={undo} disabled={!canUndo} className="gap-1">
                  <Undo2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo (Ctrl+Z)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={redo} disabled={!canRedo} className="gap-1">
                  <Redo2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo (Ctrl+Y)</TooltipContent>
            </Tooltip>
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-1 border-r border-border px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                  className="gap-1"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom Out (-)</TooltipContent>
            </Tooltip>

            <span className="text-xs text-muted-foreground px-1 min-w-8 text-center">{Math.round(zoom * 100)}%</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setZoom((z) => Math.min(3, z + 0.1))}
                  className="gap-1"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Zoom In (+)</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setZoom(1)
                    setPan({ x: 0, y: 0 })
                  }}
                  className="gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset View</TooltipContent>
            </Tooltip>
          </div>

          {/* Lock */}
          <div className="flex items-center gap-1 border-r border-border px-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant={locked ? "default" : "ghost"}
                  onClick={() => setLocked(!locked)}
                  className="gap-1"
                >
                  {locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{locked ? "Unlock" : "Lock"} editing</TooltipContent>
            </Tooltip>
          </div>

          {/* Export/Import */}
          <div className="flex items-center gap-1 ml-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const json = exportAnnotations()
                    const blob = new Blob([json], { type: "application/json" })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    a.href = url
                    a.download = "annotations.json"
                    a.click()
                  }}
                  className="gap-1"
                >
                  <Download className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export Annotations</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = "application/json"
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onload = (e) => {
                          const json = e.target?.result as string
                          importAnnotations(json)
                        }
                        reader.readAsText(file)
                      }
                    }
                    input.click()
                  }}
                  className="gap-1"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Import Annotations</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="ghost" onClick={() => setShowKB(!showKB)} className="gap-1">
                  <span className="text-xs">?</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Keyboard Shortcuts (?)</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 bg-surface-subtle relative overflow-hidden">
          {mediaType === "image" ? (
            <canvas
              ref={canvasRef}
              onMouseDown={handleCanvasMouseDown}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              className="w-full h-full cursor-crosshair bg-cover bg-center"
              style={{
                backgroundImage: `url(${mediaUrl})`,
                backgroundSize: `${100 * zoom}% ${100 * zoom}%`,
                backgroundPosition: `${-pan.x}px ${-pan.y}px`,
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={mediaUrl}
              className="w-full h-full object-contain"
              onPlay={() => setVideoPlaying(true)}
              onPause={() => setVideoPlaying(false)}
            />
          )}
        </div>

        {/* Annotations Sidebar */}
        <div className="w-64 bg-card border-l border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Label</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Enter label"
                className="w-full px-2 py-1 bg-input text-foreground text-sm rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground">Color</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-8 cursor-pointer rounded border border-border"
              />
            </div>
          </div>

          {/* Annotations List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            <div className="text-xs font-semibold text-muted-foreground mb-3">
              {annotations.length} Annotation{annotations.length !== 1 ? "s" : ""}
            </div>
            {annotations.map((ann) => (
              <div key={ann.id} className="p-2 bg-secondary rounded border border-border text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{ann.label}</span>
                  <button
                    onClick={() => removeAnnotation(ann.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <div className="text-xs text-muted-foreground">{new Date(ann.timestamp).toLocaleTimeString()}</div>
              </div>
            ))}
          </div>

          {/* Video Controls */}
          {mediaType === "video" && (
            <div className="border-t border-border p-3 space-y-3">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (videoRef.current) {
                      if (videoPlaying) {
                        videoRef.current.pause()
                      } else {
                        videoRef.current.play()
                      }
                      setVideoPlaying(!videoPlaying)
                    }
                  }}
                  className="gap-1 flex-1"
                >
                  {videoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.muted = !videoMuted
                      setVideoMuted(!videoMuted)
                    }
                  }}
                  className="gap-1"
                >
                  {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcutsModal
        isOpen={showKB}
        onClose={() => setShowKB(false)}
      />
    </div>
  )
}
