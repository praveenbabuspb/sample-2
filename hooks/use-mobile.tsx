import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Default to false on the server and initial client render.
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    // This runs only on the client, after the initial render.
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Set the correct value on mount
    checkIsMobile()

    // Listen for window resize
    window.addEventListener("resize", checkIsMobile)

    // Clean up the event listener
    return () => window.removeEventListener("resize", checkIsMobile)
  }, []) // Empty dependency array ensures this runs only once on mount.

  return isMobile
}
