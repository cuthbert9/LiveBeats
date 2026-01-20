import Image from "next/image"
import Link from "next/link"
import { 
  Music, Users, ExternalLink, ChevronRight, Calendar,
  Instagram, Twitter, Globe, Play
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { EventCard, type Event } from "@/components/event-card"

const artistData = {
  id: "1",
  name: "Marcus Miller Quartet",
  genre: "Jazz",
  followers: "125K",
  bio: "Grammy-winning jazz ensemble known for pushing the boundaries of contemporary jazz while honoring its rich traditions. Led by legendary bassist Marcus Miller, the quartet has been captivating audiences worldwide for over two decades with their virtuosic performances and deep musical conversations.",
  longBio: "The Marcus Miller Quartet represents the pinnacle of modern jazz ensemble playing. Each member brings decades of experience and a unique voice to the group, creating a sound that is at once rooted in tradition and boldly contemporary.\n\nTheir performances are known for their spontaneity, technical brilliance, and emotional depth. Whether interpreting jazz standards or showcasing original compositions, the quartet creates an immersive musical experience that leaves audiences spellbound.",
  image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&auto=format&fit=crop&q=80",
  coverImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1600&auto=format&fit=crop&q=80",
  socialLinks: {
    website: "www.marcusmillerquartet.com",
    instagram: "@marcusmillerquartet",
    twitter: "@mmillerquartet",
    spotify: "Marcus Miller Quartet",
  },
  stats: {
    totalShows: 248,
    monthlyListeners: "2.3M",
    yearsActive: 22,
  },
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
    id: "37",
    title: "Jazz Festival Headline",
    artist: "Marcus Miller Quartet",
    venue: "Central Park SummerStage",
    date: "Feb 15",
    time: "7:00 PM",
    price: "$65",
    genre: "Jazz",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "38",
    title: "Intimate Evening",
    artist: "Marcus Miller Quartet",
    venue: "The Village Vanguard",
    date: "Mar 8",
    time: "8:30 PM",
    price: "$55",
    genre: "Jazz",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&auto=format&fit=crop&q=80",
  },
]

const pastVenues = [
  { name: "Blue Note Jazz Club", location: "New York" },
  { name: "Jazz at Lincoln Center", location: "New York" },
  { name: "Ronnie Scott's", location: "London" },
  { name: "Montreux Jazz Festival", location: "Switzerland" },
]

export default async function ArtistDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative h-[40vh] md:h-[50vh]">
          <Image
            src={artistData.coverImage || "/placeholder.svg"}
            alt={artistData.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Back navigation */}
          <div className="absolute top-4 left-4 z-10">
            <Link href="/artists">
              <Button variant="secondary" size="sm" className="gap-1">
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back to Artists
              </Button>
            </Link>
          </div>
        </section>

        {/* Artist info */}
        <section className="container mx-auto px-4 -mt-32 relative z-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Profile header */}
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-4 ring-background shadow-xl shrink-0">
                  <Image
                    src={artistData.image || "/placeholder.svg"}
                    alt={artistData.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Badge className="bg-primary text-primary-foreground mb-2">{artistData.genre}</Badge>
                  <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{artistData.name}</h1>
                  <p className="mt-2 text-muted-foreground">{artistData.bio.split('.')[0]}.</p>
                  
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="font-medium text-foreground">{artistData.followers}</span> followers
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Music className="h-4 w-4" />
                      <span className="font-medium text-foreground">{artistData.stats.monthlyListeners}</span> monthly listeners
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Button>Follow</Button>
                    <Button variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Listen on Spotify
                    </Button>
                  </div>
                </div>
              </div>

              {/* About */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">About</h2>
                  <div className="prose prose-neutral max-w-none text-muted-foreground">
                    {artistData.longBio.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming shows */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-serif text-2xl font-semibold text-foreground">Upcoming Shows</h2>
                  <Link href={`/events?artist=${artistData.id}`}>
                    <Button variant="ghost" size="sm">View All</Button>
                  </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>

              {/* Past venues */}
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4">Notable Venues</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {pastVenues.map((venue) => (
                      <div key={venue.name} className="p-3 rounded-lg bg-secondary/50">
                        <p className="font-medium text-foreground">{venue.name}</p>
                        <p className="text-sm text-muted-foreground">{venue.location}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Stats */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Career Stats</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{artistData.stats.totalShows}</p>
                        <p className="text-xs text-muted-foreground">Total Shows</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{artistData.stats.yearsActive}</p>
                        <p className="text-xs text-muted-foreground">Years Active</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">3</p>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Social links */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Connect</h3>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Globe className="h-4 w-4" />
                        <span>{artistData.socialLinks.website}</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                      <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Instagram className="h-4 w-4" />
                        <span>{artistData.socialLinks.instagram}</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                      <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Twitter className="h-4 w-4" />
                        <span>{artistData.socialLinks.twitter}</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                      <a href="#" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors">
                        <Music className="h-4 w-4" />
                        <span>Spotify</span>
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </a>
                    </div>
                  </CardContent>
                </Card>

                {/* Similar artists */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-4">Similar Artists</h3>
                    <div className="space-y-3">
                      {["Tommy Keys", "City Philharmonic", "The Delta Kings"].map((artist) => (
                        <Link 
                          key={artist} 
                          href={`/artists/${artist.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                            <Music className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{artist}</span>
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
