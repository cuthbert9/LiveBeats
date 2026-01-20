import Image from "next/image"
import Link from "next/link"
import { 
  Calendar, Clock, MapPin, DollarSign, Share2, Heart, 
  ExternalLink, Music, Users, Star, ChevronRight, Ticket
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

// Mock event data - in production this would come from an API
const eventData = {
  id: "1",
  title: "Late Night Jazz Sessions",
  description: "Experience the magic of live jazz in an intimate setting. The Marcus Miller Quartet brings their signature blend of smooth melodies and improvisational brilliance to the legendary Blue Note Jazz Club. An unforgettable evening of world-class musicianship awaits.",
  longDescription: "Join us for an extraordinary evening as the Marcus Miller Quartet takes the stage at the iconic Blue Note Jazz Club. Known for their virtuosic performances and deep musical conversations, this quartet has been captivating audiences worldwide for over two decades.\n\nThe evening will feature selections from their latest album 'Midnight Stories' alongside beloved jazz standards reimagined through their unique lens. Expect intimate moments of solo brilliance, powerful ensemble interplay, and the kind of spontaneous musical magic that only happens in live jazz.",
  artist: {
    name: "Marcus Miller Quartet",
    bio: "Grammy-winning jazz ensemble known for pushing the boundaries of contemporary jazz while honoring its rich traditions.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80",
    followers: "125K",
  },
  venue: {
    id: "1",
    name: "Blue Note Jazz Club",
    address: "131 W 3rd St, New York, NY 10012",
    type: "Jazz Club",
    rating: 4.8,
    reviews: 324,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&auto=format&fit=crop&q=80",
  },
  date: "Saturday, January 25, 2026",
  time: "9:00 PM - 12:00 AM",
  doors: "8:30 PM",
  price: "$45",
  priceRange: "$45 - $120",
  genre: "Jazz",
  tags: ["Live Music", "Jazz", "Intimate Setting", "Full Bar"],
  image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&auto=format&fit=crop&q=80",
  capacity: 200,
  attending: 156,
  ageRestriction: "21+",
}

const relatedEvents = [
  {
    id: "6",
    title: "Piano Bar Sessions",
    artist: "Tommy Keys",
    venue: "The Grand Lounge",
    date: "Today",
    time: "9:30 PM",
    price: "$15",
    genre: "Jazz",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80",
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
]

export default async function EventDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero image */}
        <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <Image
            src={eventData.image || "/placeholder.svg"}
            alt={eventData.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Back navigation */}
          <div className="absolute top-4 left-4 z-10">
            <Link href="/events">
              <Button variant="secondary" size="sm" className="gap-1">
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back to Events
              </Button>
            </Link>
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button variant="secondary" size="icon">
              <Share2 className="h-4 w-4" />
              <span className="sr-only">Share event</span>
            </Button>
            <Button variant="secondary" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Save event</span>
            </Button>
          </div>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 -mt-24 relative z-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event header */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-lg">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary text-primary-foreground">{eventData.genre}</Badge>
                  {eventData.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
                
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-balance">
                  {eventData.title}
                </h1>
                
                <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                  {eventData.description}
                </p>

                {/* Quick info */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-sm font-medium text-foreground">Jan 25, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Time</p>
                      <p className="text-sm font-medium text-foreground">9:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="text-sm font-medium text-foreground">{eventData.priceRange}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Attending</p>
                      <p className="text-sm font-medium text-foreground">{eventData.attending} going</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">About This Event</h2>
                <div className="prose prose-neutral max-w-none text-muted-foreground">
                  {eventData.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Artist */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">The Artist</h2>
                <Link href="/artists/1" className="flex items-start gap-4 group">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={eventData.artist.image || "/placeholder.svg"} alt={eventData.artist.name} />
                    <AvatarFallback>{eventData.artist.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {eventData.artist.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{eventData.artist.bio}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Music className="h-4 w-4" />
                        {eventData.artist.followers} followers
                      </span>
                      <span className="text-sm text-primary font-medium">View Profile</span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Venue */}
              <div className="bg-card rounded-xl p-6 md:p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">Venue</h2>
                <Link href={`/venues/${eventData.venue.id}`} className="block group">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-48 h-32 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={eventData.venue.image || "/placeholder.svg"}
                        alt={eventData.venue.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                        {eventData.venue.name}
                      </h3>
                      <Badge variant="secondary" className="mt-1">{eventData.venue.type}</Badge>
                      <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {eventData.venue.address}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="text-sm font-medium">{eventData.venue.rating}</span>
                        <span className="text-sm text-muted-foreground">({eventData.venue.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </Link>
                
                {/* Map placeholder */}
                <div className="mt-4 rounded-lg bg-muted h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-muted-foreground mt-2">Map view</p>
                    <Button variant="link" size="sm" className="mt-1">
                      Open in Google Maps
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Ticket card */}
                <Card className="shadow-lg border-0">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <p className="text-sm text-muted-foreground">Starting from</p>
                      <p className="text-4xl font-bold text-foreground mt-1">{eventData.price}</p>
                    </div>

                    <Separator className="mb-6" />

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date</span>
                        <span className="text-foreground font-medium">{eventData.date}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Doors Open</span>
                        <span className="text-foreground font-medium">{eventData.doors}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Show Time</span>
                        <span className="text-foreground font-medium">{eventData.time}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Age</span>
                        <span className="text-foreground font-medium">{eventData.ageRestriction}</span>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      <Ticket className="h-4 w-4 mr-2" />
                      Get Tickets
                    </Button>

                    <p className="text-xs text-center text-muted-foreground mt-3">
                      {eventData.capacity - eventData.attending} spots remaining
                    </p>
                  </CardContent>
                </Card>

                {/* Related events */}
                <Card className="shadow-sm border-0">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">You Might Also Like</h3>
                    <div className="space-y-4">
                      {relatedEvents.map((event) => (
                        <Link key={event.id} href={`/events/${event.id}`} className="flex gap-3 group">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-primary font-medium">{event.genre}</p>
                            <p className="font-medium text-sm text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                              {event.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
