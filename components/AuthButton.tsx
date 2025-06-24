'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function AuthButton() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication status on component mount
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/me', { 
        method: 'GET',
        credentials: 'include' 
      })
      setIsLoggedIn(response.ok)
    } catch (error) {
      console.error('Auth check error:', error)
      setIsLoggedIn(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' })
      setIsLoggedIn(false)
      router.push('/auth')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleLogin = () => {
    router.push('/auth')
  }

  if (isLoading) {
    return (
      <div className="text-muted-foreground font-medium">
        ...
      </div>
    )
  }

  return (
    <button 
      onClick={isLoggedIn ? handleLogout : handleLogin}
      className="text-muted-foreground hover:text-orange-500 transition-colors font-medium"
    >
      {isLoggedIn ? 'Logout' : 'Login'}
    </button>
  )
}