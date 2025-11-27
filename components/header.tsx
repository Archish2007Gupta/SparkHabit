'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { LogOut, User } from "lucide-react"

interface CurrentUser {
  id: string
  email: string
  username: string
}

export function Header() {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const user = localStorage.getItem('currentUser')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    setCurrentUser(null)
    window.location.href = '/'
  }

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between" suppressHydrationWarning>
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition" suppressHydrationWarning>
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center" suppressHydrationWarning>
            <span className="text-white font-bold text-lg">✨</span>
          </div>
          <span className="text-xl font-bold">SparkHabit</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" suppressHydrationWarning>
          <Link href="#how-it-works" className="text-sm hover:text-primary transition">
            How It Works
          </Link>
          <Link href="#features" className="text-sm hover:text-primary transition">
            Features
          </Link>
          <Link href="#pricing" className="text-sm hover:text-primary transition">
            Pricing
          </Link>
          <Link href="#faq" className="text-sm hover:text-primary transition">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-3" suppressHydrationWarning>
          {currentUser ? (
            <>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{currentUser.username}</span>
              </div>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={handleLogout}
                suppressHydrationWarning
              >
                <LogOut className="w-4 h-4 mr-1" />
                Log Out
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button size="sm" variant="ghost" suppressHydrationWarning>Log In</Button>
            </Link>
          )}
          <Link href="/challenges">
            <Button size="sm" suppressHydrationWarning>Start Challenge</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
