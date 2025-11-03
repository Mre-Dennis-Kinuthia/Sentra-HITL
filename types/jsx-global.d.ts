// Fallback JSX typing to prevent implicit any errors in environments
// where React/Next ambient types are not loaded yet. Next.js/React types
// will override these when available.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}

export {}