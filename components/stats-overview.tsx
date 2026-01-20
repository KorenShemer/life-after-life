import { Card, CardContent } from "@/components/ui/card"
import { BookHeart, Users, HardDrive } from "lucide-react"

interface StatsOverviewProps {
  totalMemories: number
  totalRecipients: number
  storageUsed: string
}

export function StatsOverview({ totalMemories, totalRecipients, storageUsed }: StatsOverviewProps) {
  const stats = [
    {
      label: "Total Memories Saved",
      value: totalMemories.toString(),
      icon: BookHeart,
      description: "Across all media types",
    },
    {
      label: "Scheduled Recipients",
      value: totalRecipients.toString(),
      icon: Users,
      description: "Active recipients",
    },
    {
      label: "Storage Used",
      value: storageUsed,
      icon: HardDrive,
      description: "of 10 GB available",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-semibold text-foreground mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
