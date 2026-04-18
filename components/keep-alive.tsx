'use client'

import { useEffect, useState } from 'react'

export function KeepAlive() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const ping = () => {
      fetch('/api/keepalive')
        .then(response => {
          if (response.ok) {
            console.log('Keep-alive ping successful')
          }
        })
        .catch(error => {
          console.error('Keep-alive ping failed:', error)
        })
    }

    // Ping immediately
    ping()

    // Set up interval to ping every 5 minutes (300000 ms)
    const interval = setInterval(ping, 300000)

    return () => clearInterval(interval)
  }, [])

  // Don't render anything on the server to prevent hydration mismatch
  if (!isMounted) {
    return null
  }

  return null
}
