"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Eye,
  Edit,
  Trash2,
  Copy,
  ExternalLink,
  Filter,
} from "lucide-react"
import { OrganizerHeader } from "@/components/organizer-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

// Mock data
const events = [
  {
    id: "1",
    title: "Friday Night Jazz Sessions",
    date: "Fri, Jan 24, 2025",
    time: "8:00 PM",
    venue: "Blue Note Jazz Club",
    ticketsSold: 142,
    capacity: 200,
    revenue: 4970,
    status: "published",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Weekend Blues Session",
    date: "Sat, Jan 25, 2025",
    time: "9:00 PM",
    venue: "Smoky Joe's",
    ticketsSold: 85,
    capacity: 120,
    revenue: 1700,
    status: "published",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Sunday Acoustic Brunch",
    date: "Sun, Jan 26, 2025",
    time: "11:00 AM",
    venue: "The Garden Cafe",
    ticketsSold: 45,
    capacity: 80,
    revenue: 1125,
    status: "draft",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    title: "Late Night Lounge",
    date: "Fri, Jan 31, 2025",
    time: "10:00 PM",
    venue: "The Grand Lounge",
    ticketsSold: 0,
    capacity: 80,
    revenue: 0,
    status: "draft",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    title: "New Year's Jazz Celebration",
    date: "Wed, Jan 1, 2025",
    time: "9:00 PM",
    venue: "Blue Note Jazz Club",
    ticketsSold: 200,
    capacity: 200,
    revenue: 10000,
    status: "completed",
    image: "https://images.unsplash.com/photo-1516450360452-04bf5292ceea?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    title: "Winter Warmup Sessions",
    date: "Sat, Jan 11, 2025",
    time: "7:00 PM",
    venue: "The Listening Room",
    ticketsSold: 120,
    capacity: 150,
    revenue: 3600,
    status: "completed",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&auto=format&fit=crop&q=80",
  },
]

type EventStatus = "all" | "published" | "draft" | "completed"
type ViewMode = "table" | "cards"

function Loading() {
  return null
}

export default function EventsManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<EventStatus>("all")
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const searchParams = useSearchParams()

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || event.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Published</Badge>
      case "draft":
        return <Badge variant="secondary">Draft</Badge>
      case "completed":
        return <Badge variant="outline" className="bg-transparent">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Suspense fallback={<Loading />}>
      <>
        <OrganizerHeader
          title="My Events"
          description="Manage and track all your events"
        />
        
        <ScrollArea className="flex-1">
          <div className="p-4 lg:p-6 space-y-6">
            {/* Actions bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="flex flex-1 gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as EventStatus)}>
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button asChild>
                <Link href="/organizer/events/create">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Link>
              </Button>
            </div>

            {/* View toggle & stats */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {filteredEvents.length} of {events.length} events
              </p>
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)}>
                <TabsList>
                  <TabsTrigger value="table">Table</TabsTrigger>
                  <TabsTrigger value="cards">Cards</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Table view */}
            {viewMode === "table" && (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Event</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Venue</TableHead>
                      <TableHead>Tickets</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-foreground truncate">{event.title}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm">{event.date}</span>
                            <span className="text-xs text-muted-foreground">{event.time}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{event.venue}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {event.ticketsSold} / {event.capacity}
                            </span>
                            <div className="mt-1 h-1.5 w-16 rounded-full bg-secondary overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">${event.revenue.toLocaleString()}</span>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(event.status)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/organizer/events/${event.id}`}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Event
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/events/${event.id}`} target="_blank">
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Live
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
            )}

            {/* Cards view */}
            {viewMode === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="relative aspect-[2/1] overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                    <div className="p-4 space-y-4">
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-1">{event.title}</h3>
                        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate">{event.venue}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-1 text-sm">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{event.ticketsSold}</span>
                          <span className="text-muted-foreground">/ {event.capacity}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">${event.revenue.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                          <Link href={`/organizer/events/${event.id}`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent" asChild>
                          <Link href={`/events/${event.id}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Empty state */}
            {filteredEvents.length === 0 && (
              <div className="text-center py-16">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mx-auto">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-semibold text-foreground">No events found</h3>
                <p className="mt-2 text-muted-foreground">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Create your first event to get started"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Button className="mt-4" asChild>
                    <Link href="/organizer/events/create">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Event
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </>
    </Suspense>
  )
}
