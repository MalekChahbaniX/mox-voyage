'use client'

import { useEffect } from 'react'

export function KeepAlive() {
  useEffect(() => {
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

  return null
}
