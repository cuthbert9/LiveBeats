"use client"

import { useState } from "react"
import {
  CalendarDays,
  Users,
  DollarSign,
  TrendingUp,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Ticket,
} from "lucide-react"
import { OrganizerHeader } from "@/components/organizer-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data
const overviewStats = [
  {
    label: "Total Revenue",
    value: "$21,395",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    description: "This month",
  },
  {
    label: "Tickets Sold",
    value: "592",
    change: "+24%",
    trend: "up",
    icon: Ticket,
    description: "This month",
  },
  {
    label: "Total Attendees",
    value: "548",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "Checked in",
  },
  {
    label: "Page Views",
    value: "8,432",
    change: "-5%",
    trend: "down",
    icon: Eye,
    description: "Event pages",
  },
]

const revenueData = [
  { month: "Aug", revenue: 4200 },
  { month: "Sep", revenue: 5800 },
  { month: "Oct", revenue: 4900 },
  { month: "Nov", revenue: 7200 },
  { month: "Dec", revenue: 9500 },
  { month: "Jan", revenue: 12400 },
]

const ticketSalesData = [
  { day: "Mon", sales: 24 },
  { day: "Tue", sales: 18 },
  { day: "Wed", sales: 32 },
  { day: "Thu", sales: 45 },
  { day: "Fri", sales: 67 },
  { day: "Sat", sales: 89 },
  { day: "Sun", sales: 52 },
]

const genreData = [
  { name: "Jazz", value: 45, color: "#c4785a" },
  { name: "Blues", value: 25, color: "#8b5a3c" },
  { name: "Rock", value: 15, color: "#d4a574" },
  { name: "Folk", value: 10, color: "#a67c52" },
  { name: "Other", value: 5, color: "#c9b896" },
]

const topEvents = [
  { name: "Friday Night Jazz Sessions", tickets: 142, revenue: 4970, growth: 15 },
  { name: "New Year's Jazz Celebration", tickets: 200, revenue: 10000, growth: 0 },
  { name: "Winter Warmup Sessions", tickets: 120, revenue: 3600, growth: 8 },
  { name: "Weekend Blues Session", tickets: 85, revenue: 1700, growth: 22 },
  { name: "Sunday Acoustic Brunch", tickets: 45, revenue: 1125, growth: -5 },
]

const audienceData = [
  { age: "18-24", percentage: 15 },
  { age: "25-34", percentage: 35 },
  { age: "35-44", percentage: 28 },
  { age: "45-54", percentage: 15 },
  { age: "55+", percentage: 7 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <>
      <OrganizerHeader
        title="Analytics"
        description="Track your event performance and audience insights"
      />
      
      <ScrollArea className="flex-1">
        <div className="p-4 lg:p-6 space-y-6">
          {/* Time range selector */}
          <div className="flex justify-end">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="12m">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Overview stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {overviewStats.map((stat) => (
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

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Monthly revenue from ticket sales</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="month" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--color-revenue)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-revenue)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Ticket sales chart */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Ticket Sales</CardTitle>
                <CardDescription>Tickets sold per day this week</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    sales: {
                      label: "Sales",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ticketSalesData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="day" className="text-muted-foreground" />
                      <YAxis className="text-muted-foreground" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="sales"
                        fill="var(--color-sales)"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Second row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top events */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Events</CardTitle>
                  <CardDescription>Events ranked by revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topEvents.map((event, index) => (
                      <div
                        key={event.name}
                        className="flex items-center gap-4 p-3 rounded-lg border border-border"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-semibold text-foreground">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{event.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {event.tickets} tickets sold
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">${event.revenue.toLocaleString()}</p>
                          <p className={`text-sm flex items-center justify-end gap-1 ${
                            event.growth >= 0 ? "text-green-600" : "text-red-500"
                          }`}>
                            {event.growth >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {event.growth >= 0 ? "+" : ""}{event.growth}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Genre distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Genre Distribution</CardTitle>
                <CardDescription>Events by music genre</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {genreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                  {genreData.map((genre) => (
                    <div key={genre.name} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: genre.color }}
                        />
                        <span className="text-foreground">{genre.name}</span>
                      </div>
                      <span className="text-muted-foreground">{genre.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Audience insights */}
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>Age distribution of your attendees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audienceData.map((item) => (
                  <div key={item.age} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{item.age}</span>
                      <span className="text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </>
  )
}
