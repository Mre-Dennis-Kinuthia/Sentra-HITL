"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export interface KeyboardShortcut {
  keys: string[]
  description: string
  category: string
}

interface KeyboardShortcutsModalProps {
  isOpen: boolean
  onClose: () => void
  shortcuts?: KeyboardShortcut[]
}

const defaultShortcuts: KeyboardShortcut[] = [
  // Tools
  { keys: ["B"], description: "Select Bounding Box tool", category: "Tools" },
  { keys: ["P"], description: "Select Polygon tool", category: "Tools" },
  { keys: ["O"], description: "Select Point tool", category: "Tools" },
  { keys: ["L"], description: "Select Line tool", category: "Tools" },
  { keys: ["T"], description: "Select Text tool", category: "Tools" },
  
  // Actions
  { keys: ["Ctrl", "Z"], description: "Undo last action", category: "Actions" },
  { keys: ["Ctrl", "Y"], description: "Redo last action", category: "Actions" },
  { keys: ["Ctrl", "Shift", "Z"], description: "Redo last action", category: "Actions" },
  { keys: ["Delete"], description: "Clear all annotations", category: "Actions" },
  
  // Navigation
  { keys: ["Space"], description: "Play/Pause video (when video selected)", category: "Media" },
  { keys: ["+", "="], description: "Zoom in", category: "View" },
  { keys: ["-"], description: "Zoom out", category: "View" },
  
  // Help
  { keys: ["?"], description: "Show/hide keyboard shortcuts", category: "Help" },
]

function KeyBadge({ keyName }: { keyName: string }) {
  const isModifier = ["Ctrl", "Shift", "Alt", "Cmd", "Meta"].includes(keyName)
  
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-mono text-xs px-2 py-1 min-w-[28px] text-center",
        isModifier && "bg-muted"
      )}
    >
      {keyName}
    </Badge>
  )
}

export function KeyboardShortcutsModal({
  isOpen,
  onClose,
  shortcuts = defaultShortcuts,
}: KeyboardShortcutsModalProps) {
  const groupedShortcuts = shortcuts.reduce(
    (acc, shortcut) => {
      if (!acc[shortcut.category]) {
        acc[shortcut.category] = []
      }
      acc[shortcut.category].push(shortcut)
      return acc
    },
    {} as Record<string, KeyboardShortcut[]>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Speed up your workflow with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {category}
              </h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div
                    key={`${shortcut.keys.join("-")}-${index}`}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {shortcut.keys.map((key, keyIndex) => (
                        <React.Fragment key={key}>
                          <KeyBadge keyName={key} />
                          {keyIndex < shortcut.keys.length - 1 && (
                            <span className="text-xs text-muted-foreground">
                              +
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Press <KeyBadge keyName="?" /> to toggle this dialog
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

