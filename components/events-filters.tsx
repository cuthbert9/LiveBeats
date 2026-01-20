"use client"

import { useState } from "react"
import { Filter, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const genres = [
  "Jazz", "Rock", "Electronic", "Indie", "Hip-Hop", "Classical", 
  "Blues", "Folk", "Latin", "Soul", "Country", "World"
]

const timeFilters = ["Morning", "Afternoon", "Evening", "Late Night"]

interface EventsFiltersProps {
  activeFilters: string[]
  onFilterChange: (filters: string[]) => void
}

export function EventsFilters({ activeFilters, onFilterChange }: EventsFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [genreOpen, setGenreOpen] = useState(true)
  const [timeOpen, setTimeOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      onFilterChange(activeFilters.filter((f) => f !== filter))
    } else {
      onFilterChange([...activeFilters, filter])
    }
  }

  const clearAll = () => {
    onFilterChange([])
    setPriceRange([0, 100])
  }

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Genre filter */}
      <Collapsible open={genreOpen} onOpenChange={setGenreOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h3 className="font-semibold text-foreground">Genre</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${genreOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="grid grid-cols-2 gap-2">
            {genres.map((genre) => (
              <div key={genre} className="flex items-center space-x-2">
                <Checkbox
                  id={genre}
                  checked={activeFilters.includes(genre)}
                  onCheckedChange={() => toggleFilter(genre)}
                />
                <Label htmlFor={genre} className="text-sm cursor-pointer">{genre}</Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Time filter */}
      <Collapsible open={timeOpen} onOpenChange={setTimeOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h3 className="font-semibold text-foreground">Time of Day</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${timeOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2">
          <div className="space-y-2">
            {timeFilters.map((time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox
                  id={time}
                  checked={activeFilters.includes(time)}
                  onCheckedChange={() => toggleFilter(time)}
                />
                <Label htmlFor={time} className="text-sm cursor-pointer">{time}</Label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Price filter */}
      <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <h3 className="font-semibold text-foreground">Price Range</h3>
          <ChevronDown className={`h-4 w-4 transition-transform ${priceOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={5}
            className="mb-2"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
          <div className="mt-3 flex items-center space-x-2">
            <Checkbox
              id="free"
              checked={activeFilters.includes("Free")}
              onCheckedChange={() => toggleFilter("Free")}
            />
            <Label htmlFor="free" className="text-sm cursor-pointer">Free events only</Label>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Clear button */}
      {activeFilters.length > 0 && (
        <Button variant="outline" className="w-full bg-transparent" onClick={clearAll}>
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Desktop filters */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 rounded-xl bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg text-foreground">Filters</h2>
            {activeFilters.length > 0 && (
              <Badge variant="secondary">{activeFilters.length}</Badge>
            )}
          </div>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile filters */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1">{activeFilters.length}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active filter badges (mobile) */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 lg:hidden">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="gap-1 pr-1">
              {filter}
              <button
                onClick={() => toggleFilter(filter)}
                className="ml-1 rounded-full p-0.5 hover:bg-muted"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </>
  )
}
