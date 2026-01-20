"use client"

import { use } from "react"
import { OrganizerHeader } from "@/components/organizer-header"
import { EventForm } from "@/components/event-form"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock event data - would come from API
const mockEventData = {
  title: "Friday Night Jazz Sessions",
  description: "Join us for an unforgettable evening of live jazz music featuring the renowned Marcus Miller Quartet. Experience smooth melodies, improvisation, and the authentic atmosphere of a classic jazz club.",
  genre: "jazz",
  venueId: "1",
  date: "2025-01-24",
  startTime: "20:00",
  endTime: "23:00",
  doorTime: "19:30",
  ageRestriction: "21+",
  isFreeEvent: false,
  ticketTiers: [
    { id: "1", name: "General Admission", price: "35", quantity: "150", description: "Standard entry" },
    { id: "2", name: "VIP Table", price: "100", quantity: "20", description: "Reserved seating with bottle service" },
  ],
  posterImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&auto=format&fit=crop&q=80",
  artistName: "Marcus Miller Quartet",
  artistBio: "Grammy-winning bassist and composer Marcus Miller brings his quartet for an intimate evening of contemporary jazz. Known for his work with Miles Davis and his unique fusion of jazz, funk, and R&B.",
  socialLinks: {
    website: "https://marcusmiller.com",
    instagram: "@marcusmiller",
    spotify: "https://open.spotify.com/artist/marcusmiller",
  },
  isPublished: true,
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EditEventPage({ params }: PageProps) {
  const { id } = use(params)
  
  // In a real app, fetch event data based on id
  console.log("Editing event:", id)

  return (
    <>
      <OrganizerHeader
        title="Edit Event"
        description="Update your event details"
      />
      
      <ScrollArea className="flex-1">
        <div className="p-4 lg:p-6 pb-12">
          <EventForm mode="edit" initialData={mockEventData} />
        </div>
      </ScrollArea>
    </>
  )
}
