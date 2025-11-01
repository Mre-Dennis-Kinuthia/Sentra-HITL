import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Annotation {
  id: string
  type: "bbox" | "polygon" | "point" | "line" | "text"
  label: string
  color: string
  data: any
  confidence?: number
  timestamp: number
}

interface AnnotationStore {
  annotations: Annotation[]
  history: Annotation[][]
  currentStep: number
  addAnnotation: (annotation: Annotation) => void
  removeAnnotation: (id: string) => void
  updateAnnotation: (id: string, annotation: Partial<Annotation>) => void
  clearAnnotations: () => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  exportAnnotations: () => string
  importAnnotations: (json: string) => void
}

export const useAnnotationStore = create<AnnotationStore>()(
  persist(
    (set, get) => ({
      annotations: [],
      history: [[]],
      currentStep: 0,
      canUndo: false,
      canRedo: false,

      addAnnotation: (annotation) => {
        const { annotations, history, currentStep } = get()
        const newAnnotations = [...annotations, annotation]
        const newHistory = history.slice(0, currentStep + 1)
        newHistory.push(newAnnotations)

        set({
          annotations: newAnnotations,
          history: newHistory,
          currentStep: newHistory.length - 1,
          canUndo: true,
          canRedo: false,
        })
      },

      removeAnnotation: (id) => {
        const { annotations, history, currentStep } = get()
        const newAnnotations = annotations.filter((a) => a.id !== id)
        const newHistory = history.slice(0, currentStep + 1)
        newHistory.push(newAnnotations)

        set({
          annotations: newAnnotations,
          history: newHistory,
          currentStep: newHistory.length - 1,
          canUndo: true,
          canRedo: false,
        })
      },

      updateAnnotation: (id, updates) => {
        const { annotations, history, currentStep } = get()
        const newAnnotations = annotations.map((a) => (a.id === id ? { ...a, ...updates } : a))
        const newHistory = history.slice(0, currentStep + 1)
        newHistory.push(newAnnotations)

        set({
          annotations: newAnnotations,
          history: newHistory,
          currentStep: newHistory.length - 1,
          canUndo: true,
          canRedo: false,
        })
      },

      clearAnnotations: () => {
        set({
          annotations: [],
          history: [[]],
          currentStep: 0,
          canUndo: false,
          canRedo: false,
        })
      },

      undo: () => {
        const { history, currentStep } = get()
        if (currentStep > 0) {
          const newStep = currentStep - 1
          set({
            annotations: history[newStep],
            currentStep: newStep,
            canUndo: newStep > 0,
            canRedo: true,
          })
        }
      },

      redo: () => {
        const { history, currentStep } = get()
        if (currentStep < history.length - 1) {
          const newStep = currentStep + 1
          set({
            annotations: history[newStep],
            currentStep: newStep,
            canUndo: true,
            canRedo: newStep < history.length - 1,
          })
        }
      },

      exportAnnotations: () => {
        const { annotations } = get()
        return JSON.stringify(annotations, null, 2)
      },

      importAnnotations: (json) => {
        try {
          const annotations = JSON.parse(json) as Annotation[]
          set({
            annotations,
            history: [annotations],
            currentStep: 0,
            canUndo: false,
            canRedo: false,
          })
        } catch (error) {
          console.error("Failed to import annotations:", error)
        }
      },
    }),
    {
      name: "annotation-store",
      version: 1,
    },
  ),
)
