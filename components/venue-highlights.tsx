import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/badge"
import { Badge } from "@/components/ui/badge"

const venues = [
  {
    id: "1",
    name: "Blue Note Jazz Club",
    type: "Jazz Club",
    location: "Greenwich Village",
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 12,
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
  },
  {
    id: "3",
    name: "Rooftop Terrace",
    type: "Outdoor Venue",
    location: "Downtown",
    rating: 4.6,
    reviews: 256,
    image: "https://images.unsplash.com/photo-1578946956088-940c3b502864?w=800&auto=format&fit=crop&q=80",
    upcomingEvents: 6,
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
  },
]

export function VenueHighlights() {
  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">Popular Venues</h2>
            <p className="mt-2 text-muted-foreground">Discover the best places for live music in your area</p>
          </div>
          <Link href="/venues">
            <Button variant="ghost" className="hidden sm:flex items-center gap-2">
              All Venues
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.map((venue) => (
            <Link key={venue.id} href={`/venues/${venue.id}`}>
              <div className="group relative overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300">
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
                  <h3 className="font-semibold text-foreground">{venue.name}</h3>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{venue.location}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{venue.rating}</span>
                      <span className="text-sm text-muted-foreground">({venue.reviews})</span>
                    </div>
                    <span className="text-sm text-primary font-medium">{venue.upcomingEvents} events</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/venues">
            <Button variant="outline" className="w-full bg-transparent">
              View All Venues
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
