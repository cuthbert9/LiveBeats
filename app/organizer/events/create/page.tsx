import { OrganizerHeader } from "@/components/organizer-header"
import { EventForm } from "@/components/event-form"
import { ScrollArea } from "@/components/ui/scroll-area"

export const metadata = {
  title: "Create Event - LiveBeats",
  description: "Create a new live music event on LiveBeats",
}

export default function CreateEventPage() {
  return (
    <>
      <OrganizerHeader
        title="Create Event"
        description="Fill in the details to publish your event"
      />
      
      <ScrollArea className="flex-1">
        <div className="p-4 lg:p-6 pb-12">
          <EventForm mode="create" />
        </div>
      </ScrollArea>
    </>
  )
}
