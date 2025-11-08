import * as React from "react"

interface Ripple {
  key: number
  style: React.CSSProperties
}

export function useRipple(duration = 450) {
  const [ripples, setRipples] = React.useState<Ripple[]>([])
  const nextKey = React.useRef(0)

  const createRipple = React.useCallback(
    (
      event: React.MouseEvent<HTMLElement> | React.PointerEvent<HTMLElement>,
    ) => {
      const container = event.currentTarget
      if (!(container instanceof HTMLElement)) {
        return
      }

      const rect = container.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const left = event.clientX - rect.left - size / 2
      const top = event.clientY - rect.top - size / 2
      const key = nextKey.current++

      const style: React.CSSProperties = {
        width: size,
        height: size,
        left,
        top,
      }

      setRipples((prev) => [...prev, { key, style }])

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.key !== key))
      }, duration)
    },
    [duration],
  )

  return { ripples, createRipple }
}
