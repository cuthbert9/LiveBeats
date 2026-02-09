"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar as CalendarIcon, MapPin, Users, Camera, Utensils, Music, CheckCircle2, CreditCard, ClipboardList, ArrowLeft, PartyPopper, Phone, Clock, Palette } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

// Mock data - same as weddings page
const weddingVenues = [
    {
        id: "v1",
        name: "Grand Ballroom at The Plaza",
        location: "Manhattan, NY",
        capacity: "500+",
        price: "$$$$",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80",
        tags: ["Luxury", "Classic", "Indoor"],
        bookedDates: [
            new Date(2026, 5, 12), new Date(2026, 5, 20), new Date(2026, 6, 4),
            new Date(2026, 5, 5), new Date(2026, 5, 8), new Date(2026, 5, 15),
            new Date(2026, 6, 10), new Date(2026, 6, 18), new Date(2026, 6, 25),
            new Date(2026, 7, 2), new Date(2026, 7, 14)
        ]
    },
    {
        id: "v2",
        name: "Skyline Garden Loft",
        location: "Brooklyn, NY",
        capacity: "200",
        price: "$$$",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
        tags: ["Modern", "Outdoor", "City View"],
        bookedDates: [
            new Date(2026, 5, 15), new Date(2026, 6, 10), new Date(2026, 6, 25),
            new Date(2026, 5, 3), new Date(2026, 5, 22), new Date(2026, 6, 5),
            new Date(2026, 7, 8), new Date(2026, 7, 20)
        ]
    },
    {
        id: "v3",
        name: "The Glass House",
        location: "Queens, NY",
        capacity: "150",
        price: "$$$",
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80",
        tags: ["Contemporary", "Glass", "Indoor"],
        bookedDates: [
            new Date(2026, 5, 5), new Date(2026, 6, 1), new Date(2026, 5, 18),
            new Date(2026, 6, 12), new Date(2026, 7, 5)
        ]
    },
    {
        id: "v4",
        name: "Garden of Eden",
        location: "Westchester, NY",
        capacity: "350",
        price: "$$$",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
        tags: ["Floral", "Romantic", "Outdoor"],
        bookedDates: [
            new Date(2026, 5, 28), new Date(2026, 7, 4), new Date(2026, 5, 10),
            new Date(2026, 6, 15), new Date(2026, 7, 1), new Date(2026, 7, 22)
        ]
    }
]

export default function VenueBookingPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const venueId = searchParams.get("venue")

    const selectedVenue = weddingVenues.find(v => v.id === venueId)

    const [bookingStep, setBookingStep] = useState<"form" | "calendar" | "success">("form")
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(true)

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsFormDialogOpen(false)
        setBookingStep("calendar")
    }

    const handleConfirmBooking = () => {
        // In a real app, this would save to backend
        // For now, we'll use localStorage to persist the booking state
        localStorage.setItem("hasBookedVenue", "true")
        setBookingStep("success")
    }

    const navigateToService = (tab: string) => {
        router.push(`/weddings?tab=${tab}`)
    }

    if (!selectedVenue) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">Venue not found</h1>
                        <Button onClick={() => router.push("/weddings")}>Back to Venues</Button>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="bg-background animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="container mx-auto px-4 py-12 min-h-[70vh] flex flex-col">
                        <Button variant="ghost" className="w-fit mb-8 gap-2" onClick={() => router.push("/weddings")}>
                            <ArrowLeft className="h-4 w-4" /> Back to Venues
                        </Button>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            <div className="lg:col-span-4 space-y-6">
                                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                                    <Image
                                        src={selectedVenue.image}
                                        alt={selectedVenue.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <Badge className="mb-2">{selectedVenue.tags[0]}</Badge>
                                    <h2 className="font-serif text-3xl font-bold">{selectedVenue.name}</h2>
                                    <p className="text-muted-foreground flex items-center gap-1 mt-2">
                                        <MapPin className="h-4 w-4" /> {selectedVenue.location}
                                    </p>
                                </div>

                                {bookingStep === "calendar" && (
                                    <Card className="bg-primary/5 border-primary/20">
                                        <CardContent className="p-4">
                                            <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                                                <ClipboardList className="h-4 w-4" /> Inquiry Summary
                                            </h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Estimated Guests:</span>
                                                    <span className="font-medium">Up to {selectedVenue.capacity}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Price Category:</span>
                                                    <span className="font-medium text-primary">{selectedVenue.price}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>

                            <div className="lg:col-span-8">
                                {bookingStep === "calendar" ? (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="font-serif text-3xl font-bold mb-2">Select Your Wedding Date</h3>
                                            <p className="text-muted-foreground">Shaded dates indicate existing bookings. Please select an available date to proceed.</p>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-8 bg-card border rounded-3xl p-8 shadow-sm">
                                            <div className="flex justify-center">
                                                <Calendar
                                                    mode="single"
                                                    selected={selectedDate}
                                                    onSelect={setSelectedDate}
                                                    className="rounded-md border-0"
                                                    modifiers={{
                                                        booked: selectedVenue.bookedDates
                                                    }}
                                                    modifiersStyles={{
                                                        booked: { backgroundColor: 'hsl(var(--destructive)/0.1)', color: 'hsl(var(--destructive))', fontWeight: 'bold' }
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-6 flex flex-col justify-center">
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-4 w-4 rounded-full bg-primary" />
                                                        <span className="font-medium">Selected Date</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-4 w-4 rounded-full bg-destructive/10 border border-destructive/20" />
                                                        <span className="text-muted-foreground">Already Booked (Unavailable)</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-4 w-4 rounded-full bg-background border" />
                                                        <span className="text-muted-foreground">Available for your special day</span>
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t">
                                                    <p className="text-sm text-muted-foreground mb-4">
                                                        Selected: <span className="font-bold text-foreground">{selectedDate?.toLocaleDateString('en-US', { dateStyle: 'full' })}</span>
                                                    </p>
                                                    <Button
                                                        className="w-full py-6 text-lg"
                                                        onClick={handleConfirmBooking}
                                                        disabled={selectedVenue.bookedDates.some(d => d.toDateString() === selectedDate?.toDateString())}
                                                    >
                                                        Confirm Venue Booking
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : bookingStep === "success" ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-12 animate-in zoom-in-95 duration-500">
                                        <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                            <PartyPopper className="h-12 w-12" />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="font-serif text-4xl font-bold">Venue Successfully Booked!</h3>
                                            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
                                                Congratulations! Your booking at <span className="text-foreground font-semibold">{selectedVenue.name}</span> for {selectedDate?.toLocaleDateString()} has been confirmed.
                                            </p>
                                        </div>

                                        <div className="w-full max-w-xl bg-primary/5 border border-primary/20 rounded-3xl p-8 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-4">
                                                <Badge variant="default" className="bg-green-600">UNLOCKED</Badge>
                                            </div>
                                            <div className="text-left space-y-4">
                                                <h4 className="font-bold text-2xl flex items-center gap-2">
                                                    <CreditCard className="h-6 w-6 text-primary" /> FREE Digital Invitations
                                                </h4>
                                                <p className="text-muted-foreground">
                                                    As part of your venue booking, the **Basic Invitation Package** is now available to you at **no extra cost**. Start inviting your guests today!
                                                </p>
                                                <div className="flex gap-4 pt-2">
                                                    <Button
                                                        className="flex-1"
                                                        onClick={() => navigateToService("digital-cards")}
                                                    >
                                                        Personalize Digital Cards
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap justify-center gap-4">
                                            <Button variant="outline" className="gap-2" onClick={() => navigateToService("catering")}>
                                                <Utensils className="h-4 w-4" /> Find Catering
                                            </Button>
                                            <Button variant="outline" className="gap-2" onClick={() => navigateToService("vendors")}>
                                                <Camera className="h-4 w-4" /> Photographers
                                            </Button>
                                            <Button variant="outline" className="gap-2" onClick={() => navigateToService("mcs")}>
                                                <Music className="h-4 w-4" /> Choose an MC
                                            </Button>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Inquiry Form Dialog */}
            <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
                <DialogContent className="max-w-md sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">
                            Inquiry for {selectedVenue.name}
                        </DialogTitle>
                        <DialogDescription>
                            Fill in your wedding details to see if the venue is available.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleFormSubmit} className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="phone" placeholder="+1 (555) 000-0000" className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="guests">Estimated Guests</Label>
                                <div className="relative">
                                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="guests" type="number" placeholder="e.g. 150" className="pl-9" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Prefered Date</Label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="date" type="date" className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Preferred Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                    <Input id="time" type="time" className="pl-9" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="theme">Wedding Theme / Style</Label>
                            <div className="relative">
                                <Palette className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="theme" placeholder="e.g. Rustic, Modern, Celestial" className="pl-9" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Alternate Location (if any)</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input id="location" placeholder="e.g. Garden Reception" className="pl-9" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Special Requirements</Label>
                            <Textarea id="notes" placeholder="Tell us about your special day requirements..." className="min-h-[80px]" />
                        </div>

                        <Button type="submit" className="w-full">Check Availability</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
