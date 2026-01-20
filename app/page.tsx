import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { QuickLinks } from "@/components/quick-links"
import { FeaturedEvents } from "@/components/featured-events"
import { UpcomingEvents } from "@/components/upcoming-events"
import { VenueHighlights } from "@/components/venue-highlights"
import { NewsletterSection } from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <QuickLinks />
        <FeaturedEvents />
        <UpcomingEvents />
        <VenueHighlights />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
