import React from "react"
import { OrganizerSidebar } from "@/components/organizer-sidebar"

export const metadata = {
  title: "Organizer Dashboard - LiveBeats",
  description: "Manage your events, track performance, and grow your audience on LiveBeats",
}

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <OrganizerSidebar />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  )
}
