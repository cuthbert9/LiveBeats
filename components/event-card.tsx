import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin, DollarSign } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export interface Event {
  id: string
  title: string
  artist: string
  venue: string
  date: string
  time: string
  price: string
  genre: string
  image: string
  featured?: boolean
}

interface EventCardProps {
  event: Event
  variant?: "default" | "featured" | "compact"
}

export function EventCard({ event, variant = "default" }: EventCardProps) {
  if (variant === "featured") {
    return (
      <Link href={`/events/${event.id}`}>
        <Card className="group overflow-hidden border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{event.genre}</Badge>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="font-serif text-2xl font-semibold text-balance">{event.title}</h3>
              <p className="mt-1 text-white/90">{event.artist}</p>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <DollarSign className="h-4 w-4" />
                <span className="font-medium text-foreground">{event.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    )
  }

  if (variant === "compact") {
    return (
      <Link href={`/events/${event.id}`}>
        <Card className="group flex overflow-hidden border-0 bg-card shadow-sm hover:shadow-md transition-all duration-300">
          <div className="relative w-24 h-24 shrink-0 overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <CardContent className="flex flex-col justify-center p-3">
            <p className="text-xs text-primary font-medium">{event.genre}</p>
            <h3 className="font-medium text-foreground line-clamp-1">{event.title}</h3>
            <p className="text-sm text-muted-foreground">{event.time} at {event.venue}</p>
          </CardContent>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/events/${event.id}`}>
      <Card className="group overflow-hidden border-0 bg-card shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative aspect-[3/2] overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground backdrop-blur-sm">{event.genre}</Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1">{event.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{event.artist}</p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{event.time}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
            <span className="font-semibold text-foreground">{event.price}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
