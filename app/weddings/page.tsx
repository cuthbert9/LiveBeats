"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Calendar as CalendarIcon, MapPin, Users, Camera, Utensils, Music, CheckCircle2, X, CreditCard, Check, Flower2, Sparkles, Truck, Cookie } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Image from "next/image"

// Mock data for Weddings section
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

const mcs = [
    {
        id: "mc1",
        name: "Victor Harmony",
        specialty: "Weddings & Corporate Events",
        experience: "12 years",
        rating: "4.9",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
        bookedDates: [new Date(2026, 5, 15), new Date(2026, 5, 22), new Date(2026, 6, 10)]
    },
    {
        id: "mc2",
        name: "Sarah Mitchell",
        specialty: "High-energy Weddings",
        experience: "8 years",
        rating: "4.8",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80",
        bookedDates: [new Date(2026, 5, 18), new Date(2026, 6, 5), new Date(2026, 6, 20)]
    },
    {
        id: "mc3",
        name: "Daniel Brooks",
        specialty: "Elegant & Traditional",
        experience: "15 years",
        rating: "5.0",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80",
        bookedDates: [new Date(2026, 5, 12), new Date(2026, 5, 28), new Date(2026, 7, 2)]
    }
]

const catering = [
    {
        id: "c1",
        name: "Gourmet Affairs",
        service: "Full-service catering & bar",
        cuisines: ["Italian", "French", "Fusion"],
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop&q=80"
    },
    {
        id: "c2",
        name: "Taste of Elegance",
        service: "Custom menus & tastings",
        cuisines: ["American", "Mediterranean", "Vegan"],
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop&q=80"
    }
]

const invitationPackages = [
    {
        id: "basic",
        name: "Basic",
        price: "$99",
        description: "Perfect for intimate gatherings",
        features: [
            "Digital invitations for up to 100 guests",
            "3 pre-designed templates",
            "RSVP tracking",
            "Email delivery"
        ],
        isFreeIfVenueBooked: true,
        popular: false
    },
    {
        id: "premium",
        name: "Premium",
        price: "$199",
        description: "Most popular for standard weddings",
        features: [
            "Digital invitations for up to 300 guests",
            "10+ premium templates with customization",
            "RSVP tracking + meal preferences",
            "SMS & email delivery",
            "Guest list management",
            "Event website link"
        ],
        isFreeIfVenueBooked: false,
        popular: true
    },
    {
        id: "ultimate",
        name: "Ultimate",
        price: "$349",
        description: "For large-scale celebrations",
        features: [
            "Unlimited digital invitations",
            "Fully custom design service",
            "RSVP tracking + dietary restrictions",
            "SMS, email & WhatsApp delivery",
            "Guest list management",
            "Personalized event website",
            "Photo gallery integration",
            "Thank you card templates"
        ],
        isFreeIfVenueBooked: false,
        popular: false
    }
]

const vendorCategories = [
    {
        id: "photography",
        name: "Photography",
        description: "Capture your special moments with professional wedding photographers",
        count: "24+ vendors",
        image: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&auto=format&fit=crop&q=80",
        icon: Camera
    },
    {
        id: "florists",
        name: "Florists & Decorators",
        description: "Beautiful floral arrangements and stunning decor for your venue",
        count: "18+ vendors",
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80",
        icon: Flower2
    },
    {
        id: "beauty",
        name: "Beauty & Styling",
        description: "Expert makeup artists and hair stylists for the perfect bridal look",
        count: "15+ vendors",
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop&q=80",
        icon: Sparkles
    },
    {
        id: "transportation",
        name: "Transportation",
        description: "Luxury vehicles and transportation services for your wedding party",
        count: "10+ vendors",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80",
        icon: Truck
    },
    {
        id: "bakery",
        name: "Wedding Cakes",
        description: "Custom wedding cakes and desserts from top bakers",
        count: "12+ vendors",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80",
        icon: Cookie
    },
    {
        id: "music-stage",
        name: "Music & Stage",
        description: "Live bands, DJs, musicians, stage setup, lighting, and audiovisual equipment for your celebration",
        count: "34+ vendors",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
        icon: Music
    }
]

export default function WeddingsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const tabParam = searchParams.get("tab")

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [activeMc, setActiveMc] = useState(mcs[0])
    const [hasBookedVenue, setHasBookedVenue] = useState(false)
    const [activeTab, setActiveTab] = useState(tabParam || "venues")

    // Check localStorage for booking state
    useEffect(() => {
        const booked = localStorage.getItem("hasBookedVenue")
        if (booked === "true") {
            setHasBookedVenue(true)
        }
    }, [])

    // Update tab when URL param changes
    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam)
        }
    }, [tabParam])

    const handleCheckAvailability = (venue: (typeof weddingVenues)[0]) => {
        router.push(`/weddings/book?venue=${venue.id}`)
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative py-20 bg-primary/5">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground">Plan Your Dream Wedding</h1>
                        <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                            Discover premium venues, exceptional MCs, and top-tier vendors to make your special day unforgettable.
                        </p>
                    </div>
                </section>

                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <div className="flex justify-center mb-10">
                                <TabsList className="bg-secondary/50 p-1">
                                    <TabsTrigger value="venues" className="gap-2 px-6"><MapPin className="h-4 w-4" /> Venues</TabsTrigger>
                                    <TabsTrigger value="mcs" className="gap-2 px-6"><Music className="h-4 w-4" /> MCs</TabsTrigger>
                                    <TabsTrigger value="catering" className="gap-2 px-6"><Utensils className="h-4 w-4" /> Catering</TabsTrigger>
                                    <TabsTrigger value="digital-cards" className="gap-2 px-6"><CreditCard className="h-4 w-4" /> Digital Cards</TabsTrigger>
                                    <TabsTrigger value="vendors" className="gap-2 px-6"><Camera className="h-4 w-4" /> Vendors</TabsTrigger>
                                </TabsList>
                            </div>

                            {/* Venues Tab */}
                            <TabsContent value="venues">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {weddingVenues.map((venue) => (
                                        <Card key={venue.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                                            <div className="relative aspect-video">
                                                <Image src={venue.image} alt={venue.name} fill className="object-cover transition-transform group-hover:scale-105" />
                                                <div className="absolute top-3 right-3 flex gap-1">
                                                    {venue.tags.slice(0, 1).map(tag => (
                                                        <Badge key={tag} className="bg-white/90 text-black text-[10px] backdrop-blur-sm border-0">{tag}</Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="font-serif text-lg font-semibold truncate flex-1 pr-2">{venue.name}</h3>
                                                    <span className="font-bold text-primary text-sm shrink-0">{venue.price}</span>
                                                </div>
                                                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" /> {venue.location}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-3 w-3" /> {venue.capacity}
                                                    </div>
                                                </div>
                                                <Button className="w-full mt-4 h-8 text-xs font-semibold" onClick={() => handleCheckAvailability(venue)}>
                                                    Check Availability
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* MCs Tab */}
                            <TabsContent value="mcs">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-1 space-y-6">
                                        {mcs.map((mc) => (
                                            <Card
                                                key={mc.id}
                                                className={`cursor-pointer transition-all ${activeMc.id === mc.id ? 'ring-2 ring-primary' : 'hover:bg-accent/50'}`}
                                                onClick={() => setActiveMc(mc)}
                                            >
                                                <CardContent className="p-4 flex gap-4">
                                                    <div className="relative h-20 w-20 rounded-full overflow-hidden shrink-0">
                                                        <Image src={mc.image} alt={mc.name} fill className="object-cover" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">{mc.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{mc.specialty}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <Badge variant="secondary" className="text-[10px]">{mc.experience}</Badge>
                                                            <span className="text-xs font-medium text-yellow-600">★ {mc.rating}</span>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>

                                    <div className="lg:col-span-2">
                                        <Card>
                                            <CardHeader>
                                                <CardTitle className="flex items-center gap-2">
                                                    <CalendarIcon className="h-5 w-5 text-primary" />
                                                    Availability Calendar: {activeMc.name}
                                                </CardTitle>
                                                <CardDescription>
                                                    Select a date to check if {activeMc.name} is available for your wedding.
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="grid md:grid-cols-2 gap-8">
                                                <div>
                                                    <Calendar
                                                        mode="single"
                                                        selected={selectedDate}
                                                        onSelect={setSelectedDate}
                                                        className="rounded-md border shadow-sm"
                                                        modifiers={{
                                                            booked: activeMc.bookedDates
                                                        }}
                                                        modifiersStyles={{
                                                            booked: { backgroundColor: 'hsl(var(--destructive)/0.1)', color: 'hsl(var(--destructive))', fontWeight: 'bold' }
                                                        }}
                                                    />
                                                </div>
                                                <div className="space-y-6">
                                                    <div className="p-4 bg-secondary/30 rounded-lg">
                                                        <h4 className="font-semibold mb-3">Legend</h4>
                                                        <div className="space-y-2 text-sm">
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-3 w-3 rounded-full bg-primary" />
                                                                <span>Selected Date</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-3 w-3 rounded-full bg-destructive/20 border border-destructive/30" />
                                                                <span className="text-destructive font-medium">Fully Booked</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <div className="h-3 w-3 rounded-full bg-white border border-border" />
                                                                <span>Available</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {selectedDate && (
                                                        <div className="p-4 border rounded-lg border-primary/20 bg-primary/5">
                                                            <p className="text-sm text-muted-foreground">Status for {selectedDate.toLocaleDateString()}:</p>
                                                            {activeMc.bookedDates.some(d => d.toDateString() === selectedDate.toDateString()) ? (
                                                                <div className="mt-2 flex items-center gap-2 text-destructive font-bold">
                                                                    <X className="h-5 w-5" /> Sorry, Not Available
                                                                </div>
                                                            ) : (
                                                                <div className="mt-2 flex items-center gap-2 text-primary font-bold">
                                                                    <CheckCircle2 className="h-5 w-5" /> Available to Book
                                                                </div>
                                                            )}
                                                            <Button className="w-full mt-4" disabled={activeMc.bookedDates.some(d => d.toDateString() === selectedDate.toDateString())}>
                                                                Request Booking
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </TabsContent>

                            {/* Catering Tab */}
                            <TabsContent value="catering">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {catering.map((item) => (
                                        <Card key={item.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
                                            <div className="relative aspect-video">
                                                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-serif text-lg font-semibold mb-1">{item.name}</h3>
                                                <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{item.service}</p>
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {item.cuisines.map(c => <Badge key={c} variant="outline" className="text-[10px] px-1.5 py-0.5">{c}</Badge>)}
                                                </div>
                                                <Button className="w-full h-8 text-xs" variant="outline">View Menus</Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>

                            {/* Digital Cards Tab */}
                            <TabsContent value="digital-cards">
                                <div className="space-y-8">
                                    <div className="flex flex-col md:flex-row justify-between items-center bg-primary/5 p-6 rounded-xl border border-primary/10">
                                        <div>
                                            <h3 className="text-xl font-semibold mb-1">Digital Invitation Packages</h3>
                                            <p className="text-muted-foreground">Modern way to invite your guests and track RSVPs in real-time.</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                            <Switch id="venue-booked" checked={hasBookedVenue} onCheckedChange={setHasBookedVenue} />
                                            <Label htmlFor="venue-booked" className="cursor-pointer font-medium">
                                                Mock: Venue Already Booked?
                                            </Label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {invitationPackages.map((pkg) => {
                                            const isBasicFree = pkg.isFreeIfVenueBooked && hasBookedVenue;

                                            return (
                                                <Card key={pkg.id} className={`relative flex flex-col ${pkg.popular ? 'border-primary ring-1 ring-primary' : ''}`}>
                                                    {pkg.popular && (
                                                        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1">MOST POPULAR</Badge>
                                                    )}
                                                    <CardHeader className="text-center pb-2">
                                                        <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                                                        <CardDescription className="min-h-[40px] mt-2">{pkg.description}</CardDescription>
                                                    </CardHeader>
                                                    <CardContent className="flex-1 flex flex-col">
                                                        <div className="text-center mb-6">
                                                            <div className="flex items-center justify-center gap-1">
                                                                <span className={`text-4xl font-bold ${isBasicFree ? 'text-green-600' : ''}`}>
                                                                    {isBasicFree ? 'FREE' : pkg.price}
                                                                </span>
                                                                {!isBasicFree && <span className="text-muted-foreground underline decoration-dotted underline-offset-4" title="One-time payment">/event</span>}
                                                            </div>
                                                            {pkg.isFreeIfVenueBooked && !hasBookedVenue && (
                                                                <p className="text-[10px] text-primary font-medium mt-1 mt-2">FREE with venue booking</p>
                                                            )}
                                                            {isBasicFree && (
                                                                <p className="text-[10px] text-green-600 font-bold mt-1 uppercase tracking-wider">Venue booking discount applied</p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-3 flex-1">
                                                            {pkg.features.map((feature, i) => (
                                                                <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                                                    <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                                                                    <span>{feature}</span>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <Button className="w-full mt-8" variant={pkg.popular ? 'default' : 'outline'}>
                                                            Get Started
                                                        </Button>
                                                    </CardContent>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="vendors">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {vendorCategories.map((category) => (
                                        <Card
                                            key={category.id}
                                            className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
                                            onClick={() => router.push(`/weddings/vendors/${category.id}`)}
                                        >
                                            <div className="relative aspect-video">
                                                <Image src={category.image} alt={category.name} fill className="object-cover transition-transform group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                                    <category.icon className="h-12 w-12 text-white" />
                                                </div>
                                                <Badge className="absolute top-4 right-4 bg-white/90 text-black backdrop-blur-sm border-0">{category.count}</Badge>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-serif text-lg font-semibold mb-1">{category.name}</h3>
                                                <p className="text-muted-foreground text-xs line-clamp-2">{category.description}</p>
                                                <Button className="w-full mt-4 h-8 text-xs" variant="outline">Browse Vendors</Button>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
