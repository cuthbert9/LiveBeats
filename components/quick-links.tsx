import Link from "next/link"
import { Calendar, MapPin, Mic2, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const quickLinks = [
  {
    title: "Tonight",
    description: "Events happening today",
    href: "/events?when=today",
    icon: Clock,
    count: "24 events",
  },
  {
    title: "This Weekend",
    description: "Friday to Sunday",
    href: "/events?when=weekend",
    icon: Calendar,
    count: "67 events",
  },
  {
    title: "Near Me",
    description: "Within 5 miles",
    href: "/events?distance=5",
    icon: MapPin,
    count: "18 events",
  },
  {
    title: "Live Music",
    description: "Bands & performers",
    href: "/events?type=live",
    icon: Mic2,
    count: "45 events",
  },
]

export function QuickLinks() {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <Card className="h-full border-0 bg-card shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4 md:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <link.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{link.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{link.description}</p>
                  <p className="mt-2 text-xs font-medium text-primary">{link.count}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
