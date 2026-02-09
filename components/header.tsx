"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"

const navigation = [
  { name: "Weddings", href: "/weddings" },
  { name: "Events", href: "/events" },
  { name: "Calendar", href: "/calendar" },
  { name: "Venues", href: "/venues" },
  { name: "Artists", href: "/artists" }

]

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
            <span className="font-serif text-lg font-bold text-primary-foreground">L</span>
          </div>
          <span className="font-serif text-xl font-semibold text-foreground">LiveBeats</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Location selector */}
          <Button variant="ghost" size="sm" className="hidden sm:flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>New York</span>
          </Button>

          {/* Search toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-muted-foreground"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Sign in */}
          <Button variant="outline" size="sm" className="hidden sm:inline-flex bg-transparent">
            Sign In
          </Button>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-100">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <hr className="my-4 border-border" />
                <Button variant="outline" className="w-full bg-transparent">Sign In</Button>
                <Button className="w-full">Create Account</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Search bar - expandable */}
      {isSearchOpen && (
        <div className="border-t border-border bg-background px-4 py-3">
          <div className="container mx-auto flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search events, artists, venues..."
                className="pl-10"
                autoFocus
              />
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
