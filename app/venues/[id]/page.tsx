import Image from "next/image"
import Link from "next/link"
import { 
  MapPin, Star, Clock, Users, ExternalLink, Phone, 
  Globe, ChevronRight, Calendar, Music
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { EventCard, type Event } from "@/components/event-card"

const venueData = {
  id: "1",
  name: "Blue Note Jazz Club",
  type: "Jazz Club",
  address: "131 W 3rd St, New York, NY 10012",
  phone: "(212) 475-8592",
  website: "www.bluenotejazz.com",
  rating: 4.8,
  reviews: 324,
  description: "The Blue Note is a jazz club located in the Greenwich Village neighborhood of New York City. It has been called 'the world's most famous jazz club' and has hosted many of the greatest names in jazz since opening in 1981.",
  hours: {
    "Mon-Thu": "7:00 PM - 12:00 AM",
    "Fri-Sat": "7:00 PM - 2:00 AM",
    "Sunday": "6:00 PM - 11:00 PM",
  },
  capacity: 200,
  amenities: ["Full Bar", "Food Menu", "VIP Seating", "Accessible", "Credit Cards"],
  images: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80",
  ],
}

const upcomingEvents: Event[] = [
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
    id: "21",
    title: "Jazz Jam Session",
    artist: "House Band + Guests",
    venue: "Blue Note Jazz Club",
    date: "Tue, Jan 21",
    time: "8:00 PM",
    price: "$10",
    genre: "Jazz",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "36",
    title: "Tribute to Miles Davis",
    artist: "The Miles Project",
    venue: "Blue Note Jazz Club",
    date: "Wed, Jan 22",
    time: "8:30 PM",
    price: "$35",
    genre: "Jazz",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80",
  },
]

const reviews = [
  {
    id: "1",
    user: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Jan 15, 2026",
    comment: "Absolutely incredible experience! The sound quality is perfect and the intimate setting makes you feel like you're part of the performance.",
  },
  {
    id: "2",
    user: "Michael R.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    rating: 5,
    date: "Jan 10, 2026",
    comment: "A must-visit for any jazz lover. The history, the atmosphere, the music - everything is top notch. Book early as it fills up fast!",
  },
  {
    id: "3",
    user: "Emily T.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80",
    rating: 4,
    date: "Jan 5, 2026",
    comment: "Great venue with amazing performances. Only downside is the tight seating, but the music more than makes up for it.",
  },
]

export default async function VenueDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section with images */}
        <section className="bg-secondary/30">
          <div className="container mx-auto px-4 py-6">
            {/* Back navigation */}
            <Link href="/venues" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Venues
            </Link>

            {/* Image gallery */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[300px] md:h-[400px]">
              <div className="relative md:col-span-2 md:row-span-2 rounded-xl overflow-hidden">
                <Image
                  src={venueData.images[0] || "/placeholder.svg"}
                  alt={venueData.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {venueData.images.slice(1).map((image, index) => (
                <div key={index} className="relative hidden md:block rounded-xl overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${venueData.name} ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Venue info */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Header */}
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-primary text-primary-foreground">{venueData.type}</Badge>
                    {venueData.amenities.slice(0, 3).map((amenity) => (
                      <Badge key={amenity} variant="outline">{amenity}</Badge>
                    ))}
                  </div>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{venueData.name}</h1>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{venueData.address}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium text-foreground">{venueData.rating}</span>
                      <span>({venueData.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Capacity: {venueData.capacity}</span>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="about" className="w-full">
                  <TabsList className="bg-secondary/50 mb-6">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="about" className="space-y-6">
                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <h2 className="font-semibold text-lg text-foreground mb-3">About This Venue</h2>
                        <p className="text-muted-foreground leading-relaxed">{venueData.description}</p>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <h2 className="font-semibold text-lg text-foreground mb-3">Hours</h2>
                        <div className="space-y-2">
                          {Object.entries(venueData.hours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{day}</span>
                              <span className="text-foreground font-medium">{hours}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <h2 className="font-semibold text-lg text-foreground mb-3">Amenities</h2>
                        <div className="flex flex-wrap gap-2">
                          {venueData.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary">{amenity}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="events">
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <EventCard key={event.id} event={event} variant="compact" />
                      ))}
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Events at This Venue
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews">
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id} className="border-0 shadow-sm">
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <Avatar>
                                <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.user} />
                                <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-foreground">{review.user}</span>
                                  <span className="text-xs text-muted-foreground">{review.date}</span>
                                </div>
                                <div className="flex items-center gap-0.5 mt-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-3.5 w-3.5 ${i < review.rating ? "fill-accent text-accent" : "text-muted"}`} 
                                    />
                                  ))}
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      <Button variant="outline" className="w-full bg-transparent">
                        Load More Reviews
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Contact card */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-4">Contact & Location</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{venueData.address}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{venueData.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <a href="#" className="text-primary hover:underline">{venueData.website}</a>
                        </div>
                      </div>

                      {/* Map placeholder */}
                      <div className="mt-4 rounded-lg bg-muted h-40 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="h-6 w-6 text-muted-foreground mx-auto" />
                          <Button variant="link" size="sm" className="mt-1">
                            Open in Maps
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>

                      <Button className="w-full mt-4">
                        <Calendar className="h-4 w-4 mr-2" />
                        View All Events
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Quick stats */}
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-4">Venue Stats</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-secondary/50">
                          <p className="text-2xl font-bold text-foreground">12</p>
                          <p className="text-xs text-muted-foreground">Upcoming Events</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-secondary/50">
                          <p className="text-2xl font-bold text-foreground">4.8</p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-secondary/50">
                          <p className="text-2xl font-bold text-foreground">200</p>
                          <p className="text-xs text-muted-foreground">Capacity</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-secondary/50">
                          <p className="text-2xl font-bold text-foreground">324</p>
                          <p className="text-xs text-muted-foreground">Reviews</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
