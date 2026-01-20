"use client"

import Link from "next/link"
import Image from "next/image"
import {
  CalendarDays,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Clock,
  MapPin,
} from "lucide-react"
import { OrganizerHeader } from "@/components/organizer-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data
const stats = [
  {
    label: "Total Events",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: CalendarDays,
  },
  {
    label: "Total Attendees",
    value: "3,847",
    change: "+23%",
    trend: "up",
    icon: Users,
  },
  {
    label: "Revenue",
    value: "$12,450",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Page Views",
    value: "15.2K",
    change: "-3%",
    trend: "down",
    icon: Eye,
  },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Friday Night Jazz",
    date: "Fri, Jan 24",
    time: "8:00 PM",
    venue: "Blue Note Jazz Club",
    ticketsSold: 142,
    capacity: 200,
    status: "published",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    title: "Weekend Blues Session",
    date: "Sat, Jan 25",
    time: "9:00 PM",
    venue: "Smoky Joe's",
    ticketsSold: 85,
    capacity: 120,
    status: "published",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    title: "Sunday Acoustic Brunch",
    date: "Sun, Jan 26",
    time: "11:00 AM",
    venue: "The Garden Cafe",
    ticketsSold: 45,
    capacity: 80,
    status: "draft",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop&q=80",
  },
]

const recentActivity = [
  { action: "New ticket sale", event: "Friday Night Jazz", time: "2 min ago" },
  { action: "Event published", event: "Weekend Blues Session", time: "1 hour ago" },
  { action: "Review received", event: "Late Night Jazz", time: "3 hours ago" },
  { action: "5 ticket sales", event: "Friday Night Jazz", time: "5 hours ago" },
  { action: "Event updated", event: "Sunday Acoustic Brunch", time: "Yesterday" },
]

export default function OrganizerDashboardPage() {
  return (
    <>
      <OrganizerHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your events."
      />
      
      <ScrollArea className="flex-1">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Quick actions */}
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/organizer/events/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Link>
            </Button>
            <Button variant="outline" asChild className="bg-transparent">
              <Link href="/organizer/events">View All Events</Link>
            </Button>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <stat.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === "up" ? "text-green-600" : "text-red-500"
                    }`}>
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming events */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    <CardDescription>Your next scheduled events</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/organizer/events">View all</Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <Link
                      key={event.id}
                      href={`/organizer/events/${event.id}`}
                      className="flex gap-4 p-3 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-foreground truncate">{event.title}</h3>
                          <Badge
                            variant={event.status === "published" ? "default" : "secondary"}
                            className="shrink-0"
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            <span className="truncate">{event.venue}</span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Tickets sold</span>
                            <span className="font-medium text-foreground">
                              {event.ticketsSold} / {event.capacity}
                            </span>
                          </div>
                          <div className="mt-1 h-2 rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(event.ticketsSold / event.capacity) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Recent activity */}
            <div>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                  <CardDescription>Latest updates on your events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground">{activity.action}</p>
                          <p className="text-sm text-muted-foreground truncate">{activity.event}</p>
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick tips */}
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tips to Boost Sales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Add high-quality images to increase engagement by 40%
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Early bird pricing drives 25% more early sales
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      Share events on social media for wider reach
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}
