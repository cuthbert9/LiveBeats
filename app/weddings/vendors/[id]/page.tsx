import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight, Star, Camera, Flower2, Sparkles, Truck, Cookie, Music
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Category metadata and sample vendors by category
const categoryData: Record<string, {
  name: string
  description: string
  icon: typeof Camera
  vendors: {
    id: string
    name: string
    bio: string
    rating: string
    reviews: number
    image: string
    works: string[]
    specialties?: string[]
  }[]
}> = {
  photography: {
    name: "Photography",
    description: "Capture your special moments with professional wedding photographers who specialize in candid shots, formal portraits, and stunning storytelling.",
    icon: Camera,
    vendors: [
      {
        id: "p1",
        name: "Lens & Love Studios",
        bio: "Award-winning wedding photographer with 10+ years creating timeless, emotional imagery.",
        rating: "4.9",
        reviews: 128,
        image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&auto=format&fit=crop&q=80",
        works: [
          "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80",
        ],
        specialties: ["Candid", "Portrait", "Editorial"],
      },
      {
        id: "p2",
        name: "Golden Hour Photography",
        bio: "Specializing in natural light and outdoor weddings. Your love story, beautifully documented.",
        rating: "4.8",
        reviews: 94,
        image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&auto=format&fit=crop&q=80",
        works: [
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80",
        ],
        specialties: ["Natural Light", "Outdoor", "Romantic"],
      },
    ],
  },
  florists: {
    name: "Florists & Decorators",
    description: "Beautiful floral arrangements and stunning decor to transform your venue into a dream setting.",
    icon: Flower2,
    vendors: [
      {
        id: "f1",
        name: "Bloom & Petal Co.",
        bio: "Luxury floral design with a modern twist. From bouquets to full venue transformation.",
        rating: "4.9",
        reviews: 156,
        image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&auto=format&fit=crop&q=80",
        works: [
          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80",
        ],
        specialties: ["Floral Design", "Centerpieces", "Arches"],
      },
    ],
  },
  beauty: {
    name: "Beauty & Styling",
    description: "Expert makeup artists and hair stylists for the perfect bridal look on your special day.",
    icon: Sparkles,
    vendors: [
      {
        id: "b1",
        name: "The Bridal Glow",
        bio: "Professional bridal makeup and hair styling. Natural glam that photographs beautifully.",
        rating: "5.0",
        reviews: 89,
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&auto=format&fit=crop&q=80",
        works: [
          "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80",
        ],
        specialties: ["Bridal Makeup", "Hair Styling", "Bridal Party"],
      },
    ],
  },
  transportation: {
    name: "Transportation",
    description: "Luxury vehicles and transportation services for your wedding party and guests.",
    icon: Truck,
    vendors: [
      {
        id: "t1",
        name: "Elegant Rides NY",
        bio: "Premium fleet of classic cars, luxury sedans, and party buses for wedding transport.",
        rating: "4.8",
        reviews: 72,
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&auto=format&fit=crop&q=80",
        works: [
          "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&auto=format&fit=crop&q=80",
        ],
        specialties: ["Classic Cars", "Limousines", "Party Buses"],
      },
    ],
  },
  bakery: {
    name: "Wedding Cakes",
    description: "Custom wedding cakes and desserts from top bakers. Edible art for your celebration.",
    icon: Cookie,
    vendors: [
      {
        id: "bk1",
        name: "Sweet Celebrations",
        bio: "Artisan wedding cakes with custom designs. From traditional to modern, we create your vision.",
        rating: "4.9",
        reviews: 112,
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&auto=format&fit=crop&q=80",
        works: [
          "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=800&auto=format&fit=crop&q=80",
        ],
        specialties: ["Custom Cakes", "Dessert Tables", "Cupcakes"],
      },
    ],
  },
  "music-stage": {
    name: "Music & Stage",
    description: "Live bands, DJs, musicians, stage setup, lighting, and audiovisual equipment for your celebration.",
    icon: Music,
    vendors: [
      {
        id: "m1",
        name: "Harmony Entertainment",
        bio: "Full-service wedding entertainment: DJs, live bands, ceremony musicians, and AV production.",
        rating: "4.9",
        reviews: 134,
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&auto=format&fit=crop&q=80",
        works: [
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
        ],
        specialties: ["DJ", "Live Band", "Stage & Lighting"],
      },
      {
        id: "m2",
        name: "Stage Perfect Productions",
        bio: "Professional stage setup, lighting design, and audiovisual services for weddings.",
        rating: "4.8",
        reviews: 87,
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&auto=format&fit=crop&q=80",
        works: [
          "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
        ],
        specialties: ["Lighting", "AV Equipment", "Stage Setup"],
      },
    ],
  },
}

export default async function WeddingVendorCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = categoryData[id]

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link href="/weddings?tab=vendors">
            <Button variant="outline">Back to Vendors</Button>
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  const IconComponent = category.icon

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative h-[30vh] min-h-[200px] bg-secondary/30">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="container mx-auto px-4 relative z-10 pt-8">
            <Link
              href="/weddings?tab=vendors"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
            >
              <ChevronRight className="h-4 w-4 rotate-180" />
              Back to Vendors
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-primary/10">
                <IconComponent className="h-10 w-10 text-primary" />
              </div>
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">{category.name}</h1>
                <p className="mt-1 text-muted-foreground max-w-2xl">{category.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vendor profiles & works */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {category.vendors.map((vendor) => (
                <Card key={vendor.id} className="overflow-hidden border-0 shadow-lg">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      {/* Vendor profile sidebar */}
                      <div className="lg:col-span-1 p-6 md:p-8 bg-secondary/20">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                          <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={vendor.image} alt={vendor.name} />
                            <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h2 className="font-serif text-xl font-semibold text-foreground">{vendor.name}</h2>
                          <p className="mt-2 text-sm text-muted-foreground">{vendor.bio}</p>
                          <div className="mt-4 flex items-center gap-2">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium">{vendor.rating}</span>
                            <span className="text-muted-foreground text-sm">({vendor.reviews} reviews)</span>
                          </div>
                          {vendor.specialties && (
                            <div className="mt-4 flex flex-wrap gap-1 justify-center lg:justify-start">
                              {vendor.specialties.map((s) => (
                                <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                              ))}
                            </div>
                          )}
                          <Button className="w-full mt-6">Contact Vendor</Button>
                        </div>
                      </div>

                      {/* Portfolio / works gallery */}
                      <div className="lg:col-span-2 p-6 md:p-8">
                        <h3 className="font-semibold text-lg text-foreground mb-4">Portfolio & Works</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                          See what {vendor.name} can deliver. Browse their past work to envision your special day.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {vendor.works.map((work, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-square rounded-lg overflow-hidden group"
                            >
                              <Image
                                src={work}
                                alt={`${vendor.name} work sample ${idx + 1}`}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/weddings?tab=vendors">
                <Button variant="outline">Browse All Vendor Categories</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
