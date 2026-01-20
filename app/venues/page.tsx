"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Star, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import Loading from "./loading"

const venues = [
  {
    id: "1",
    name: "Blue Note Jazz Club",
    type: "Jazz Club",
    location: "Greenwich Village, NYC",
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 12,
    capacity: 200,
    description: "Legendary jazz venue featuring world-class performers since 1981.",
  },
  {
    id: "2",
    name: "The Listening Room",
    type: "Acoustic Venue",
    location: "East Nashville",
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 8,
    capacity: 150,
    description: "Intimate songwriter showcase venue with exceptional acoustics.",
  },
  {
    id: "3",
    name: "Rooftop Terrace",
    type: "Outdoor Venue",
    location: "Downtown Manhattan",
    rating: 4.6,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1578946956088-5b5e00ddc764?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 6,
    capacity: 300,
    description: "Open-air venue with stunning city views and summer vibes.",
  },
  {
    id: "4",
    name: "The Underground",
    type: "Rock Venue",
    location: "Brooklyn",
    rating: 4.7,
    reviews: 412,
    image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 15,
    capacity: 500,
    description: "Gritty basement venue known for discovering emerging rock talent.",
  },
  {
    id: "5",
    name: "Smoky Joe's",
    type: "Blues Club",
    location: "Chicago",
    rating: 4.5,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1514320291898-68304a7d2807?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 10,
    capacity: 120,
    description: "Authentic blues experience with soul food and live music nightly.",
  },
  {
    id: "6",
    name: "Casa de la Música",
    type: "Latin Venue",
    location: "Miami",
    rating: 4.7,
    reviews: 231,
    image: "https://images.unsplash.com/photo-1504704911898-bd0b52f945a0?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 14,
    capacity: 250,
    description: "Vibrant Latin music venue with salsa, bachata, and live bands.",
  },
  {
    id: "7",
    name: "The Grand Lounge",
    type: "Piano Bar",
    location: "Upper East Side, NYC",
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 7,
    capacity: 80,
    description: "Elegant piano bar with craft cocktails and sophisticated ambiance.",
  },
  {
    id: "8",
    name: "The Warehouse",
    type: "Urban Venue",
    location: "Downtown LA",
    rating: 4.4,
    reviews: 367,
    image: "https://images.unsplash.com/photo-1546708770-599a3abdf9fc?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 18,
    capacity: 800,
    description: "Industrial space hosting hip-hop, electronic, and live performances.",
  },
]

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [venueType, setVenueType] = useState("all")
  const searchParams = useSearchParams()

  const filteredVenues = venues.filter((venue) => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = venueType === "all" || venue.type.toLowerCase().includes(venueType.toLowerCase())
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <section className="bg-secondary/30 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Discover Venues</h1>
            <p className="mt-2 text-muted-foreground">Find the perfect spot for live music</p>

            {/* Search and filters */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search venues by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={venueType} onValueChange={setVenueType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Venue type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="jazz">Jazz Club</SelectItem>
                  <SelectItem value="rock">Rock Venue</SelectItem>
                  <SelectItem value="acoustic">Acoustic</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="latin">Latin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Venues grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredVenues.length} venues
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVenues.map((venue) => (
                <Link key={venue.id} href={`/venues/${venue.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={venue.image || "/placeholder.svg"}
                        alt={venue.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm">
                        {venue.type}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {venue.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{venue.location}</span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                        {venue.description}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-accent text-accent" />
                          <span className="text-sm font-medium">{venue.rating}</span>
                          <span className="text-sm text-muted-foreground">({venue.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-primary font-medium">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{venue.upcomingEvents} events</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export function Loading() {
  return null
}
