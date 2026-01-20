"use client"

import { useState } from "react"
import { Search, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EventCard, type Event } from "@/components/event-card"
import { EventsFilters } from "@/components/events-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

const allEvents: Event[] = [
  {
    id: "1",
    title: "Late Night Jazz Sessions",
    artist: "Marcus Miller Quartet",
    venue: "Blue Note Jazz Club",
    date: "Sat, Jan 25",
    time: "9:00 PM",
    price: "$45",
    genre: "Jazz",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Acoustic Nights",
    artist: "Sarah Mitchell & Friends",
    venue: "The Listening Room",
    date: "Fri, Jan 24",
    time: "8:00 PM",
    price: "$30",
    genre: "Folk",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Electronic Sunset",
    artist: "DJ Momentum",
    venue: "Rooftop Terrace",
    date: "Sun, Jan 26",
    time: "6:00 PM",
    price: "$25",
    genre: "Electronic",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Blues Night",
    artist: "The Delta Kings",
    venue: "Smoky Joe's",
    date: "Today",
    time: "8:00 PM",
    price: "$20",
    genre: "Blues",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    title: "Open Mic Night",
    artist: "Various Artists",
    venue: "The Coffeehouse",
    date: "Today",
    time: "7:00 PM",
    price: "Free",
    genre: "Various",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    title: "Piano Bar Sessions",
    artist: "Tommy Keys",
    venue: "The Grand Lounge",
    date: "Today",
    time: "9:30 PM",
    price: "$15",
    genre: "Jazz",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b5292ceea?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "7",
    title: "Indie Rock Night",
    artist: "The Papercuts",
    venue: "Underground Stage",
    date: "Today",
    time: "10:00 PM",
    price: "$18",
    genre: "Indie",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "8",
    title: "Symphony Under Stars",
    artist: "City Philharmonic",
    venue: "Central Park Pavilion",
    date: "Tomorrow",
    time: "7:30 PM",
    price: "$35",
    genre: "Classical",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "9",
    title: "Latin Fusion Night",
    artist: "Fuego Band",
    venue: "Casa de la Música",
    date: "Tomorrow",
    time: "9:00 PM",
    price: "$28",
    genre: "Latin",
    image: "https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "10",
    title: "Funk & Soul Revival",
    artist: "The Groove Collective",
    venue: "Soulsville",
    date: "Tomorrow",
    time: "8:30 PM",
    price: "$22",
    genre: "Soul",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "11",
    title: "Country Roads",
    artist: "Nashville Nights",
    venue: "The Barn",
    date: "Sun, Jan 26",
    time: "7:00 PM",
    price: "$25",
    genre: "Country",
    image: "https://images.unsplash.com/photo-1508854710579-599a3abdf9fc?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "12",
    title: "Hip-Hop Showcase",
    artist: "Local Legends",
    venue: "The Warehouse",
    date: "Sat, Jan 25",
    time: "9:00 PM",
    price: "$30",
    genre: "Hip-Hop",
    image: "https://images.unsplash.com/photo-1546708770-599a3abdf9fc?w=800&auto=format&fit=crop&q=80",
  },
]

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("date")

  const filteredEvents = allEvents.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesGenre = activeFilters.length === 0 || 
      activeFilters.some(filter => 
        event.genre.toLowerCase() === filter.toLowerCase() ||
        (filter === "Free" && event.price === "Free")
      )

    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <section className="bg-secondary/30 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Discover Events</h1>
            <p className="mt-2 text-muted-foreground">Find live music events happening near you</p>

            {/* Search and controls */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search events, artists, venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content area */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex gap-8">
              {/* Filters sidebar */}
              <EventsFilters 
                activeFilters={activeFilters} 
                onFilterChange={setActiveFilters} 
              />

              {/* Events grid */}
              <div className="flex-1">
                {/* Mobile filters row */}
                <div className="flex items-center gap-4 mb-6 lg:hidden">
                  <EventsFilters 
                    activeFilters={activeFilters} 
                    onFilterChange={setActiveFilters} 
                  />
                </div>

                {/* Results count */}
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {filteredEvents.length} events
                </p>

                {/* Events grid */}
                {filteredEvents.length > 0 ? (
                  <div className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "space-y-4"
                  }>
                    {filteredEvents.map((event) => (
                      <EventCard 
                        key={event.id} 
                        event={event} 
                        variant={viewMode === "list" ? "compact" : "default"}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto">
                      <SlidersHorizontal className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 font-semibold text-foreground">No events found</h3>
                    <p className="mt-2 text-muted-foreground">
                      Try adjusting your filters or search query
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4 bg-transparent"
                      onClick={() => {
                        setActiveFilters([])
                        setSearchQuery("")
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}

                {/* Load more */}
                {filteredEvents.length > 0 && (
                  <div className="mt-12 text-center">
                    <Button variant="outline" size="lg">
                      Load More Events
                    </Button>
                  </div>
                )}
              </div>
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
