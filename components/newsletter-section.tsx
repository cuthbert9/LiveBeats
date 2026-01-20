"use client"

import React from "react"

import { useState } from "react"
import { Bell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-12 md:px-12 md:py-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative max-w-2xl mx-auto text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/20 mx-auto">
              <Bell className="h-6 w-6 text-primary-foreground" />
            </div>

            <h2 className="mt-6 font-serif text-3xl md:text-4xl font-semibold text-primary-foreground text-balance">
              Never Miss a Beat
            </h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">
              Get personalized event recommendations and alerts for shows you&apos;ll love. We&apos;ll notify you about jazz nights, 
              nearby venues, and weekend picks.
            </p>

            {isSubscribed ? (
              <div className="mt-8 flex items-center justify-center gap-2 text-primary-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/20">
                  <Check className="h-5 w-5" />
                </div>
                <span className="font-medium">You&apos;re subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/50"
                  required
                />
                <Button 
                  type="submit" 
                  variant="secondary" 
                  size="lg" 
                  className="h-12 px-8 shrink-0"
                >
                  Subscribe
                </Button>
              </form>
            )}

            <p className="mt-4 text-sm text-primary-foreground/60">
              Join 15,000+ music lovers. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
