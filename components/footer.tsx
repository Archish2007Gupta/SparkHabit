'use client'

import Link from "next/link"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      console.log("Newsletter signup:", email)
      setEmail("")
    }
  }

  return (
    <footer className="bg-foreground text-white py-16 md:py-20" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-primary to-accent flex items-center justify-center text-white">
                ✨
              </div>
              <span className="font-bold text-lg">SparkHabit Studio</span>
            </div>
            <p className="text-white/70 text-sm">Build your creative habit in 10 minutes.</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="#features" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-white/70 text-sm mb-4">Get weekly creative challenge ideas</p>
            <form onSubmit={handleSubscribe} className="flex gap-2" suppressHydrationWarning>
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-white/40 transition"
                required
                suppressHydrationWarning
              />
              <button 
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition font-semibold text-sm"
                suppressHydrationWarning
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
            <p>&copy; 2025 SparkHabit Studio. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition">
                Twitter
              </Link>
              <Link href="#" className="hover:text-white transition">
                Instagram
              </Link>
              <Link href="#" className="hover:text-white transition">
                TikTok
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
