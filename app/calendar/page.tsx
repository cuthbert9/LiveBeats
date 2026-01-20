"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CalendarEvent {
  id: string
  title: string
  artist: string
  venue: string
  time: string
  price: string
  genre: string
  image: string
}

// Mock calendar data - events by day
const weeklyEvents: Record<string, CalendarEvent[]> = {
  "Mon": [
    {
      id: "20",
      title: "Open Mic Monday",
      artist: "Various Artists",
      venue: "The Coffeehouse",
      time: "7:00 PM",
      price: "Free",
      genre: "Various",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80",
    },
  ],
  "Tue": [
    {
      id: "21",
      title: "Jazz Jam Session",
      artist: "House Band + Guests",
      venue: "Blue Note Jazz Club",
      time: "8:00 PM",
      price: "$10",
      genre: "Jazz",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "22",
      title: "Acoustic Tuesday",
      artist: "Local Songwriters",
      venue: "The Listening Room",
      time: "7:30 PM",
      price: "$15",
      genre: "Acoustic",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80",
    },
  ],
  "Wed": [
    {
      id: "23",
      title: "Blues Wednesday",
      artist: "The Delta Kings",
      venue: "Smoky Joe's",
      time: "8:00 PM",
      price: "$20",
      genre: "Blues",
      image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "24",
      title: "Latin Night",
      artist: "Fuego Band",
      venue: "Casa de la Música",
      time: "9:00 PM",
      price: "$18",
      genre: "Latin",
      image: "https://images.unsplash.com/photo-1504704911898-68304a7d2807?w=400&auto=format&fit=crop&q=80",
    },
  ],
  "Thu": [
    {
      id: "25",
      title: "Funk & Soul Night",
      artist: "The Groove Collective",
      venue: "Soulsville",
      time: "8:30 PM",
      price: "$22",
      genre: "Soul",
      image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "26",
      title: "Indie Showcase",
      artist: "The Papercuts",
      venue: "Underground Stage",
      time: "9:00 PM",
      price: "$18",
      genre: "Indie",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "27",
      title: "Piano Lounge",
      artist: "Tommy Keys",
      venue: "The Grand Lounge",
      time: "7:00 PM",
      price: "$15",
      genre: "Jazz",
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&auto=format&fit=crop&q=80",
    },
  ],
  "Fri": [
    {
      id: "1",
      title: "Late Night Jazz",
      artist: "Marcus Miller Quartet",
      venue: "Blue Note Jazz Club",
      time: "9:00 PM",
      price: "$45",
      genre: "Jazz",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "2",
      title: "Acoustic Nights",
      artist: "Sarah Mitchell & Friends",
      venue: "The Listening Room",
      time: "8:00 PM",
      price: "$30",
      genre: "Folk",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "28",
      title: "Hip-Hop Friday",
      artist: "Local Legends",
      venue: "The Warehouse",
      time: "10:00 PM",
      price: "$25",
      genre: "Hip-Hop",
      image: "https://images.unsplash.com/photo-1546708770-599a3abdf9fc?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "29",
      title: "Rock Show",
      artist: "Electric Sunset",
      venue: "The Underground",
      time: "9:30 PM",
      price: "$22",
      genre: "Rock",
      image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=400&auto=format&fit=crop&q=80",
    },
  ],
  "Sat": [
    {
      id: "3",
      title: "Electronic Sunset",
      artist: "DJ Momentum",
      venue: "Rooftop Terrace",
      time: "6:00 PM",
      price: "$25",
      genre: "Electronic",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "30",
      title: "Symphony Night",
      artist: "City Philharmonic",
      venue: "Concert Hall",
      time: "7:30 PM",
      price: "$50",
      genre: "Classical",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "31",
      title: "Country Roads",
      artist: "Nashville Nights",
      venue: "The Barn",
      time: "8:00 PM",
      price: "$25",
      genre: "Country",
      image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "32",
      title: "Late Night Beats",
      artist: "Synth Wave Collective",
      venue: "Neon Club",
      time: "11:00 PM",
      price: "$30",
      genre: "Electronic",
      image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&auto=format&fit=crop&q=80",
    },
  ],
  "Sun": [
    {
      id: "33",
      title: "Jazz Brunch",
      artist: "Sunday Sessions",
      venue: "The Garden Cafe",
      time: "11:00 AM",
      price: "$20",
      genre: "Jazz",
      image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "34",
      title: "World Music Fest",
      artist: "Global Beats",
      venue: "Riverside Amphitheater",
      time: "3:00 PM",
      price: "$35",
      genre: "World",
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=400&auto=format&fit=crop&q=80",
    },
    {
      id: "35",
      title: "Sunset Session",
      artist: "Chill Vibes",
      venue: "Beach Club",
      time: "5:00 PM",
      price: "$15",
      genre: "Acoustic",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80",
    },
  ],
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const fullDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const dates = ["Jan 20", "Jan 21", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26"]

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState("Fri")
  const [viewMode, setViewMode] = useState<"week" | "day">("week")

  const selectedEvents = weeklyEvents[selectedDay] || []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <section className="bg-secondary/30 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Weekly Calendar</h1>
                <p className="mt-2 text-muted-foreground">Plan your week with live music events</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Previous week</span>
                </Button>
                <span className="px-4 py-2 text-sm font-medium">Jan 20 - Jan 26, 2026</span>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Next week</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Calendar content */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Day selector - mobile */}
            <div className="lg:hidden mb-6">
              <div className="flex overflow-x-auto gap-2 pb-2 -mx-4 px-4 scrollbar-hide">
                {days.map((day, index) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={cn(
                      "flex flex-col items-center px-4 py-3 rounded-xl min-w-[70px] transition-colors",
                      selectedDay === day
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground hover:bg-secondary"
                    )}
                  >
                    <span className="text-xs font-medium opacity-70">{day}</span>
                    <span className="text-lg font-semibold mt-1">{dates[index].split(" ")[1]}</span>
                    {weeklyEvents[day]?.length > 0 && (
                      <span className={cn(
                        "mt-1 text-xs",
                        selectedDay === day ? "text-primary-foreground/80" : "text-primary"
                      )}>
                        {weeklyEvents[day].length} events
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Main calendar grid */}
            <div className="flex gap-6">
              {/* Week overview - desktop */}
              <div className="hidden lg:grid lg:grid-cols-7 gap-4 flex-1">
                {days.map((day, index) => (
                  <div key={day} className="min-h-[500px]">
                    {/* Day header */}
                    <button
                      onClick={() => setSelectedDay(day)}
                      className={cn(
                        "w-full text-center p-3 rounded-t-xl transition-colors",
                        selectedDay === day
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-foreground hover:bg-secondary"
                      )}
                    >
                      <span className="block text-sm font-medium opacity-80">{day}</span>
                      <span className="block text-xl font-semibold">{dates[index].split(" ")[1]}</span>
                    </button>

                    {/* Events list */}
                    <div className={cn(
                      "bg-card rounded-b-xl p-3 space-y-3 min-h-[400px]",
                      selectedDay === day && "ring-2 ring-primary"
                    )}>
                      {weeklyEvents[day]?.length > 0 ? (
                        weeklyEvents[day].map((event) => (
                          <Link key={event.id} href={`/events/${event.id}`}>
                            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                              <div className="relative h-20 overflow-hidden">
                                <Image
                                  src={event.image || "/placeholder.svg"}
                                  alt={event.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <Badge className="absolute bottom-2 left-2 text-xs bg-background/80 text-foreground backdrop-blur-sm">
                                  {event.time}
                                </Badge>
                              </div>
                              <CardContent className="p-2">
                                <p className="text-xs text-primary font-medium">{event.genre}</p>
                                <p className="font-medium text-sm text-foreground line-clamp-1">{event.title}</p>
                                <p className="text-xs text-muted-foreground line-clamp-1">{event.venue}</p>
                              </CardContent>
                            </Card>
                          </Link>
                        ))
                      ) : (
                        <div className="h-full flex items-center justify-center text-center py-8">
                          <div>
                            <Calendar className="h-8 w-8 mx-auto text-muted-foreground/50" />
                            <p className="text-sm text-muted-foreground mt-2">No events</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected day detail - mobile */}
              <div className="lg:hidden flex-1">
                <div className="mb-4">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">
                    {fullDays[days.indexOf(selectedDay)]}, {dates[days.indexOf(selectedDay)]}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedEvents.length} {selectedEvents.length === 1 ? "event" : "events"}
                  </p>
                </div>

                {selectedEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedEvents.map((event) => (
                      <Link key={event.id} href={`/events/${event.id}`}>
                        <Card className="border-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex">
                          <div className="relative w-28 h-28 shrink-0">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4 flex-1">
                            <Badge variant="secondary" className="text-xs mb-2">{event.genre}</Badge>
                            <h3 className="font-semibold text-foreground line-clamp-1">{event.title}</h3>
                            <p className="text-sm text-muted-foreground">{event.artist}</p>
                            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {event.venue}
                              </span>
                            </div>
                            <p className="mt-2 font-semibold text-foreground">{event.price}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Card className="border-0 shadow-sm">
                    <CardContent className="py-16 text-center">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50" />
                      <h3 className="mt-4 font-semibold text-foreground">No events scheduled</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Check back later or browse other days
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
              <span className="text-muted-foreground">Event count this week:</span>
              {days.map((day) => (
                <span key={day} className="flex items-center gap-1">
                  <span className="font-medium">{day}:</span>
                  <Badge variant="secondary" className="text-xs">{weeklyEvents[day]?.length || 0}</Badge>
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
