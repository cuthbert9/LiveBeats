"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Music, Users, Calendar } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
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

const artists = [
  {
    id: "1",
    name: "Marcus Miller Quartet",
    genre: "Jazz",
    followers: "125K",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 3,
    bio: "Grammy-winning jazz ensemble known for pushing the boundaries of contemporary jazz.",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    genre: "Folk",
    followers: "89K",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 5,
    bio: "Singer-songwriter with a gift for storytelling through acoustic melodies.",
  },
  {
    id: "3",
    name: "DJ Momentum",
    genre: "Electronic",
    followers: "256K",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 8,
    bio: "Electronic music producer creating immersive soundscapes for the dancefloor.",
  },
  {
    id: "4",
    name: "The Delta Kings",
    genre: "Blues",
    followers: "67K",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 4,
    bio: "Authentic Delta blues sound with a modern edge.",
  },
  {
    id: "5",
    name: "Tommy Keys",
    genre: "Jazz",
    followers: "45K",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 6,
    bio: "Virtuoso pianist bringing elegance to every performance.",
  },
  {
    id: "6",
    name: "The Papercuts",
    genre: "Indie",
    followers: "112K",
    image: "https://images.unsplash.com/photo-1459749411898-68304a7d2807?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 7,
    bio: "Indie rock band with anthemic hooks and introspective lyrics.",
  },
  {
    id: "7",
    name: "City Philharmonic",
    genre: "Classical",
    followers: "178K",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 2,
    bio: "World-renowned orchestra performing classical masterworks.",
  },
  {
    id: "8",
    name: "Fuego Band",
    genre: "Latin",
    followers: "93K",
    image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 5,
    bio: "High-energy Latin fusion band that gets everyone dancing.",
  },
  {
    id: "9",
    name: "The Groove Collective",
    genre: "Soul",
    followers: "84K",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 4,
    bio: "Funk and soul revival bringing the classics back to life.",
  },
  {
    id: "10",
    name: "Nashville Nights",
    genre: "Country",
    followers: "156K",
    image: "https://images.unsplash.com/photo-1508854710579-5cecc3a9ff17?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 6,
    bio: "Modern country sound rooted in Nashville tradition.",
  },
  {
    id: "11",
    name: "Local Legends",
    genre: "Hip-Hop",
    followers: "203K",
    image: "https://images.unsplash.com/photo-1546708770579-e4733b0f0bb0?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 9,
    bio: "Hip-hop collective showcasing the best local talent.",
  },
  {
    id: "12",
    name: "Synth Wave Collective",
    genre: "Electronic",
    followers: "145K",
    image: "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&auto=format&fit=crop&q=80",
    upcomingShows: 5,
    bio: "Retro-futuristic electronic sounds for late-night adventures.",
  },
]

export default function ArtistsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [genre, setGenre] = useState("all")
  const searchParams = useSearchParams()

  const filteredArtists = artists.filter((artist) => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGenre = genre === "all" || artist.genre.toLowerCase() === genre.toLowerCase()
    return matchesSearch && matchesGenre
  })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <section className="bg-secondary/30 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">Discover Artists</h1>
            <p className="mt-2 text-muted-foreground">Find your next favorite performer</p>

            {/* Search and filters */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="jazz">Jazz</SelectItem>
                  <SelectItem value="rock">Rock</SelectItem>
                  <SelectItem value="electronic">Electronic</SelectItem>
                  <SelectItem value="indie">Indie</SelectItem>
                  <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                  <SelectItem value="classical">Classical</SelectItem>
                  <SelectItem value="blues">Blues</SelectItem>
                  <SelectItem value="folk">Folk</SelectItem>
                  <SelectItem value="latin">Latin</SelectItem>
                  <SelectItem value="soul">Soul</SelectItem>
                  <SelectItem value="country">Country</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Artists grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-6">
              Showing {filteredArtists.length} artists
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtists.map((artist) => (
                <Link key={artist.id} href={`/artists/${artist.id}`}>
                  <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 h-full">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={artist.image || "/placeholder.svg"}
                        alt={artist.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-primary/90 text-primary-foreground mb-2">{artist.genre}</Badge>
                        <h3 className="font-serif text-xl font-semibold text-white">{artist.name}</h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {artist.bio}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          <span>{artist.followers} followers</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-medium">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{artist.upcomingShows} shows</span>
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
