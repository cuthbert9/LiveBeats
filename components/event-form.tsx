"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Upload,
  X,
  Plus,
  Trash2,
  Music,
  Users,
  Info,
  Link as LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const genres = [
  "Jazz",
  "Blues",
  "Rock",
  "Indie",
  "Folk",
  "Electronic",
  "Hip-Hop",
  "R&B",
  "Soul",
  "Latin",
  "Classical",
  "Country",
  "Pop",
  "Reggae",
  "World Music",
]

const venues = [
  { id: "1", name: "Blue Note Jazz Club", location: "Greenwich Village, NYC" },
  { id: "2", name: "The Listening Room", location: "East Nashville" },
  { id: "3", name: "Rooftop Terrace", location: "Downtown Manhattan" },
  { id: "4", name: "The Underground", location: "Brooklyn" },
  { id: "5", name: "Smoky Joe's", location: "Chicago" },
  { id: "custom", name: "Add custom venue", location: "" },
]

interface TicketTier {
  id: string
  name: string
  price: string
  quantity: string
  description: string
}

interface EventFormProps {
  initialData?: {
    title: string
    description: string
    genre: string
    venueId: string
    customVenue?: string
    customVenueAddress?: string
    date: string
    startTime: string
    endTime: string
    doorTime: string
    ageRestriction: string
    ticketTiers: TicketTier[]
    isFreeEvent: boolean
    posterImage?: string
    galleryImages?: string[]
    artistName: string
    artistBio: string
    socialLinks: {
      website?: string
      instagram?: string
      spotify?: string
    }
    isPublished: boolean
  }
  mode?: "create" | "edit"
}

export function EventForm({ initialData, mode = "create" }: EventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [title, setTitle] = useState(initialData?.title || "")
  const [description, setDescription] = useState(initialData?.description || "")
  const [genre, setGenre] = useState(initialData?.genre || "")
  const [venueId, setVenueId] = useState(initialData?.venueId || "")
  const [customVenue, setCustomVenue] = useState(initialData?.customVenue || "")
  const [customVenueAddress, setCustomVenueAddress] = useState(initialData?.customVenueAddress || "")
  const [date, setDate] = useState(initialData?.date || "")
  const [startTime, setStartTime] = useState(initialData?.startTime || "")
  const [endTime, setEndTime] = useState(initialData?.endTime || "")
  const [doorTime, setDoorTime] = useState(initialData?.doorTime || "")
  const [ageRestriction, setAgeRestriction] = useState(initialData?.ageRestriction || "all-ages")
  const [isFreeEvent, setIsFreeEvent] = useState(initialData?.isFreeEvent || false)
  const [posterImage, setPosterImage] = useState(initialData?.posterImage || "")
  const [artistName, setArtistName] = useState(initialData?.artistName || "")
  const [artistBio, setArtistBio] = useState(initialData?.artistBio || "")
  const [website, setWebsite] = useState(initialData?.socialLinks?.website || "")
  const [instagram, setInstagram] = useState(initialData?.socialLinks?.instagram || "")
  const [spotify, setSpotify] = useState(initialData?.socialLinks?.spotify || "")
  
  const [ticketTiers, setTicketTiers] = useState<TicketTier[]>(
    initialData?.ticketTiers || [
      { id: "1", name: "General Admission", price: "", quantity: "", description: "" },
    ]
  )

  const addTicketTier = () => {
    setTicketTiers([
      ...ticketTiers,
      {
        id: Date.now().toString(),
        name: "",
        price: "",
        quantity: "",
        description: "",
      },
    ])
  }

  const removeTicketTier = (id: string) => {
    if (ticketTiers.length > 1) {
      setTicketTiers(ticketTiers.filter((tier) => tier.id !== id))
    }
  }

  const updateTicketTier = (id: string, field: keyof TicketTier, value: string) => {
    setTicketTiers(
      ticketTiers.map((tier) =>
        tier.id === id ? { ...tier, [field]: value } : tier
      )
    )
  }

  const handleSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    console.log("Event data:", {
      title,
      description,
      genre,
      venueId,
      customVenue,
      customVenueAddress,
      date,
      startTime,
      endTime,
      doorTime,
      ageRestriction,
      isFreeEvent,
      ticketTiers,
      posterImage,
      artistName,
      artistBio,
      socialLinks: { website, instagram, spotify },
      status,
    })
    
    setIsSubmitting(false)
    router.push("/organizer/events")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="artist">Artist</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Event Information
              </CardTitle>
              <CardDescription>
                Basic details about your event
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Friday Night Jazz Sessions"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell attendees what to expect at your event..."
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="genre">Music Genre *</Label>
                  <Select value={genre} onValueChange={setGenre}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      {genres.map((g) => (
                        <SelectItem key={g} value={g.toLowerCase()}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age Restriction</Label>
                  <Select value={ageRestriction} onValueChange={setAgeRestriction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age restriction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-ages">All Ages</SelectItem>
                      <SelectItem value="18+">18+</SelectItem>
                      <SelectItem value="21+">21+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Venue
              </CardTitle>
              <CardDescription>
                Where is your event taking place?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="venue">Select Venue *</Label>
                <Select value={venueId} onValueChange={setVenueId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a venue" />
                  </SelectTrigger>
                  <SelectContent>
                    {venues.map((v) => (
                      <SelectItem key={v.id} value={v.id}>
                        <div className="flex flex-col">
                          <span>{v.name}</span>
                          {v.location && (
                            <span className="text-xs text-muted-foreground">{v.location}</span>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {venueId === "custom" && (
                <div className="space-y-4 p-4 bg-secondary/30 rounded-lg">
                  <div className="space-y-2">
                    <Label htmlFor="customVenue">Venue Name *</Label>
                    <Input
                      id="customVenue"
                      placeholder="Enter venue name"
                      value={customVenue}
                      onChange={(e) => setCustomVenue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customVenueAddress">Venue Address *</Label>
                    <Input
                      id="customVenueAddress"
                      placeholder="Full address including city and state"
                      value={customVenueAddress}
                      onChange={(e) => setCustomVenueAddress(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Date & Time
              </CardTitle>
              <CardDescription>
                When is your event happening?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Event Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="doorTime">Doors Open</Label>
                  <Input
                    id="doorTime"
                    type="time"
                    value={doorTime}
                    onChange={(e) => setDoorTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Ticket Pricing
              </CardTitle>
              <CardDescription>
                Set up your ticket tiers and pricing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Switch
                    id="freeEvent"
                    checked={isFreeEvent}
                    onCheckedChange={setIsFreeEvent}
                  />
                  <Label htmlFor="freeEvent" className="cursor-pointer">
                    This is a free event
                  </Label>
                </div>
                {isFreeEvent && (
                  <Badge variant="secondary">No payment required</Badge>
                )}
              </div>

              {!isFreeEvent && (
                <div className="space-y-4">
                  {ticketTiers.map((tier, index) => (
                    <div
                      key={tier.id}
                      className="p-4 border border-border rounded-lg space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-foreground">
                          Ticket Tier {index + 1}
                        </h4>
                        {ticketTiers.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeTicketTier(tier.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Tier Name *</Label>
                          <Input
                            placeholder="e.g., General Admission"
                            value={tier.name}
                            onChange={(e) =>
                              updateTicketTier(tier.id, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Price ($) *</Label>
                          <Input
                            type="number"
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            value={tier.price}
                            onChange={(e) =>
                              updateTicketTier(tier.id, "price", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Quantity Available *</Label>
                          <Input
                            type="number"
                            placeholder="100"
                            min="1"
                            value={tier.quantity}
                            onChange={(e) =>
                              updateTicketTier(tier.id, "quantity", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Description (optional)</Label>
                        <Input
                          placeholder="What's included with this ticket?"
                          value={tier.description}
                          onChange={(e) =>
                            updateTicketTier(tier.id, "description", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}

                  <Button
                    variant="outline"
                    onClick={addTicketTier}
                    className="w-full bg-transparent"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Another Ticket Tier
                  </Button>
                </div>
              )}

              {isFreeEvent && (
                <div className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="space-y-2">
                      <Label>Maximum Capacity *</Label>
                      <Input
                        type="number"
                        placeholder="Enter maximum number of attendees"
                        min="1"
                        value={ticketTiers[0]?.quantity || ""}
                        onChange={(e) =>
                          updateTicketTier(ticketTiers[0]?.id || "1", "quantity", e.target.value)
                        }
                      />
                      <p className="text-sm text-muted-foreground">
                        How many people can attend this free event?
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Artist Tab */}
        <TabsContent value="artist" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Artist Information
              </CardTitle>
              <CardDescription>
                Tell attendees about the performing artist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="artistName">Artist / Band Name *</Label>
                <Input
                  id="artistName"
                  placeholder="e.g., The Jazz Quartet"
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artistBio">Artist Bio</Label>
                <Textarea
                  id="artistBio"
                  placeholder="Share the artist's story, achievements, and style..."
                  rows={4}
                  value={artistBio}
                  onChange={(e) => setArtistBio(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5" />
                Social Links
              </CardTitle>
              <CardDescription>
                Help attendees discover more about the artist
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  type="url"
                  placeholder="https://artistwebsite.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="@artisthandle"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spotify">Spotify</Label>
                <Input
                  id="spotify"
                  type="url"
                  placeholder="https://open.spotify.com/artist/..."
                  value={spotify}
                  onChange={(e) => setSpotify(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Event Poster
              </CardTitle>
              <CardDescription>
                Upload a poster or cover image for your event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {posterImage ? (
                  <div className="relative aspect-[3/4] max-w-xs rounded-lg overflow-hidden border border-border">
                    <Image
                      src={posterImage || "/placeholder.svg"}
                      alt="Event poster"
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => setPosterImage("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="flex flex-col items-center justify-center aspect-[3/4] max-w-xs rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer"
                    onClick={() => setPosterImage("https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&auto=format&fit=crop&q=80")}
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Click to upload poster
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Recommended: 600x800px
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gallery Images</CardTitle>
              <CardDescription>
                Add additional photos to showcase your event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div
                  className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer"
                >
                  <Plus className="h-8 w-8 text-muted-foreground" />
                  <p className="mt-1 text-xs text-muted-foreground">Add image</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action buttons */}
      <Separator className="my-8" />
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="bg-transparent"
        >
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleSubmit("draft")}
            disabled={isSubmitting}
            className="bg-transparent"
          >
            Save as Draft
          </Button>
          <Button
            onClick={() => handleSubmit("published")}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : mode === "edit" ? "Update Event" : "Publish Event"}
          </Button>
        </div>
      </div>
    </div>
  )
}
