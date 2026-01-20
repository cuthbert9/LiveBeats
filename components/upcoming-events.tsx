import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard, type Event } from "@/components/event-card"

const upcomingEvents: Record<string, Event[]> = {
  today: [
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
      image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80",
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
  ],
  tomorrow: [
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
      title: "Acoustic Brunch",
      artist: "Sunday Sessions",
      venue: "The Garden Cafe",
      date: "Tomorrow",
      time: "11:00 AM",
      price: "$12",
      genre: "Acoustic",
      image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&auto=format&fit=crop&q=80",
    },
  ],
  weekend: [
    {
      id: "12",
      title: "Electric Dreams",
      artist: "Synth Wave Collective",
      venue: "Neon Club",
      date: "Sat, Jan 25",
      time: "11:00 PM",
      price: "$40",
      genre: "Electronic",
      image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "13",
      title: "Country Roads",
      artist: "Nashville Nights",
      venue: "The Barn",
      date: "Sun, Jan 26",
      time: "7:00 PM",
      price: "$25",
      genre: "Country",
      image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "14",
      title: "Hip-Hop Showcase",
      artist: "Local Legends",
      venue: "The Warehouse",
      date: "Sat, Jan 25",
      time: "9:00 PM",
      price: "$30",
      genre: "Hip-Hop",
      image: "https://images.unsplash.com/photo-1546708770-599a3abdf9fc?w=800&auto=format&fit=crop&q=80",
    },
    {
      id: "15",
      title: "World Music Festival",
      artist: "Global Beats",
      venue: "Riverside Amphitheater",
      date: "Sun, Jan 26",
      time: "3:00 PM",
      price: "$35",
      genre: "World",
      image: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&auto=format&fit=crop&q=80",
    },
  ],
}

export function UpcomingEvents() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">Upcoming Events</h2>
            <p className="mt-2 text-muted-foreground">Find something for every night of the week</p>
          </div>
          <Link href="/calendar">
            <Button variant="ghost" className="hidden sm:flex items-center gap-2">
              View Calendar
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="today" className="w-full">
          <TabsList className="mb-6 bg-secondary/50">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="weekend">This Weekend</TabsTrigger>
          </TabsList>

          {Object.entries(upcomingEvents).map(([key, events]) => (
            <TabsContent key={key} value={key}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/calendar">
            <Button variant="outline" className="w-full bg-transparent">
              View Full Calendar
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
