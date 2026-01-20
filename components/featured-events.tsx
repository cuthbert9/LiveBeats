import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EventCard, type Event } from "@/components/event-card"

const featuredEvents: Event[] = [
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
    featured: true,
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
    featured: true,
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
    featured: true,
  },
]

export function FeaturedEvents() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">Featured Events</h2>
            <p className="mt-2 text-muted-foreground">Handpicked experiences you won't want to miss</p>
          </div>
          <Link href="/events">
            <Button variant="ghost" className="hidden sm:flex items-center gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="featured" />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/events">
            <Button variant="outline" className="w-full bg-transparent">
              View All Events
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
