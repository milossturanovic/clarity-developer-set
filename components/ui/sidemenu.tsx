/**
 * ============================================================================
 * SIDEMENU — mobile navigation drawer
 * ============================================================================
 *
 * WHAT THIS IS:
 *   Slide-over panel used by the site navbar on small screens. Portaled to
 *   document.body so it sits above page content. Light-theme styling matches
 *   Clarity (white panel, soft zinc overlay).
 *
 * DEVELOPER EDIT NOTES:
 *   1. Prefer editing nav links in config/site.ts — the navbar wires this.
 *   2. Overlay / panel colors are set inline below for the light theme.
 *
 * ============================================================================
 */

"use client"

import * as React from "react"
import ReactDOM from "react-dom"

import { cn } from "@/lib/utils"

interface SidemenuContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SidemenuContext = React.createContext<SidemenuContextValue | undefined>(
  undefined
)

function useSidemenu() {
  const context = React.useContext(SidemenuContext)
  if (!context) {
    throw new Error("Sidemenu components must be used within a Sidemenu")
  }
  return context
}

interface SidemenuProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

const Sidemenu = ({
  open: controlledOpen,
  onOpenChange,
  children,
}: SidemenuProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen
  const handleOpenChange = onOpenChange || setUncontrolledOpen

  React.useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return
      event.preventDefault()
      handleOpenChange(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, handleOpenChange])

  return (
    <SidemenuContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </SidemenuContext.Provider>
  )
}

interface SidemenuTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const SidemenuTrigger = React.forwardRef<
  HTMLButtonElement,
  SidemenuTriggerProps
>(({ className, onClick, asChild, children, ...props }, ref) => {
  const { open, onOpenChange } = useSidemenu()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    onOpenChange(!open)
  }

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{
      className?: string
      onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    }>
    return React.cloneElement(child, {
      ...props,
      className: cn(child.props.className, className),
      onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
        child.props.onClick?.(e)
        handleClick(e)
      },
    })
  }

  return (
    <button ref={ref} className={className} onClick={handleClick} {...props}>
      {children}
    </button>
  )
})
SidemenuTrigger.displayName = "SidemenuTrigger"

const SIDEMENU_DURATION_DEFAULT = 400

interface SidemenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left"
  /** Duration in ms for enter/exit animation */
  duration?: number
}

const sidePositionClasses = {
  right: "top-0 right-0 bottom-0 h-full w-[min(100%,20rem)] sm:max-w-sm",
  left: "top-0 left-0 bottom-0 h-full w-[min(100%,20rem)] sm:max-w-sm",
  top: "top-0 left-0 right-0 w-full",
  bottom: "bottom-0 left-0 right-0 w-full",
}

function getClosedTransform(side: "top" | "right" | "bottom" | "left") {
  if (side === "right") return "translate3d(100%, 0, 0)"
  if (side === "left") return "translate3d(-100%, 0, 0)"
  if (side === "top") return "translate3d(0, -100%, 0)"
  return "translate3d(0, 100%, 0)"
}

type SidemenuPhase = "closed" | "entering" | "open" | "exiting"

const SidemenuContent = React.forwardRef<HTMLDivElement, SidemenuContentProps>(
  (
    {
      side = "right",
      duration = SIDEMENU_DURATION_DEFAULT,
      className,
      children,
      id,
      ...props
    },
    ref
  ) => {
    const { open, onOpenChange } = useSidemenu()
    const [phase, setPhase] = React.useState<SidemenuPhase>(
      open ? "open" : "closed"
    )
    const reduceMotionRef = React.useRef(false)

    React.useEffect(() => {
      reduceMotionRef.current =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    }, [])

    // Drive enter / exit from the controlled `open` flag
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = "hidden"
        if (phase === "closed" || phase === "exiting") {
          setPhase(reduceMotionRef.current ? "open" : "entering")
        }
      } else if (phase === "open" || phase === "entering") {
        document.body.style.overflow = ""
        setPhase(reduceMotionRef.current ? "closed" : "exiting")
      }
    }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

    // Paint off-screen first, then slide in on the next frames
    React.useEffect(() => {
      if (phase !== "entering") return

      let cancelled = false
      let inner = 0
      const outer = requestAnimationFrame(() => {
        // Force layout so the closed transform is committed before we open
        void document.body.offsetHeight
        inner = requestAnimationFrame(() => {
          if (!cancelled) setPhase("open")
        })
      })

      return () => {
        cancelled = true
        cancelAnimationFrame(outer)
        cancelAnimationFrame(inner)
      }
    }, [phase])

    React.useEffect(() => {
      if (phase !== "exiting") return
      const t = window.setTimeout(() => setPhase("closed"), duration)
      return () => window.clearTimeout(t)
    }, [phase, duration])

    React.useEffect(() => {
      return () => {
        document.body.style.overflow = ""
      }
    }, [])

    if (phase === "closed") return null

    const isOpen = phase === "open"
    const durationMs = `${duration}ms`
    const easing = "cubic-bezier(0.32, 0.72, 0, 1)"
    const closedTransform = getClosedTransform(side)

    const overlayStyle: React.CSSProperties = {
      transition: `opacity ${durationMs} ${easing}`,
      opacity: isOpen ? 1 : 0,
      backgroundColor: "rgba(24, 24, 27, 0.28)",
      backdropFilter: "blur(6px)",
    }

    const panelStyle: React.CSSProperties = {
      transition: `transform ${durationMs} ${easing}`,
      transform: isOpen ? "translate3d(0, 0, 0)" : closedTransform,
      backgroundColor: "hsl(var(--background))",
      willChange: "transform",
    }

    const content = (
      <>
        <div
          className="sidemenu-overlay"
          style={overlayStyle}
          onClick={() => onOpenChange(false)}
          aria-hidden
        />
        <div
          ref={ref}
          id={id}
          role="dialog"
          aria-modal="true"
          className={cn(
            "sidemenu-panel border-l border-zinc-200 text-zinc-950 shadow-[0_0_40px_rgba(24,24,27,0.08)]",
            sidePositionClasses[side],
            className
          )}
          style={panelStyle}
          {...props}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 rounded-sm text-zinc-500 opacity-80 ring-offset-background transition-opacity hover:opacity-100 hover:text-zinc-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span className="sr-only">Close</span>
          </button>
          {children}
        </div>
      </>
    )

    return typeof document !== "undefined"
      ? ReactDOM.createPortal(content, document.body)
      : content
  }
)
SidemenuContent.displayName = "SidemenuContent"

const SidemenuHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-2 text-left", className)}
    {...props}
  />
)
SidemenuHeader.displayName = "SidemenuHeader"

const SidemenuTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-lg font-semibold tracking-tight text-zinc-950",
      className
    )}
    {...props}
  />
))
SidemenuTitle.displayName = "SidemenuTitle"

const SidemenuDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-zinc-500", className)} {...props} />
))
SidemenuDescription.displayName = "SidemenuDescription"

export {
  Sidemenu,
  SidemenuTrigger,
  SidemenuContent,
  SidemenuHeader,
  SidemenuTitle,
  SidemenuDescription,
}
