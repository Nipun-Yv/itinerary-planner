'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' })
      router.push('/auth')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout}>
      Logout
    </Button>
  )
}