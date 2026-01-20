"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, Mail, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Recipient } from "@/components/dashboard"

interface RecipientsQuickViewProps {
  recipients: Recipient[]
  onAddRecipient: () => void
  onViewAll: () => void
}

const statusConfig = {
  verified: {
    icon: CheckCircle2,
    label: "Verified",
    className: "text-primary bg-primary/10",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    className: "text-warning bg-warning/10",
  },
  expired: {
    icon: AlertCircle,
    label: "Expired",
    className: "text-destructive bg-destructive/10",
  },
}

export function RecipientsQuickView({ recipients, onAddRecipient, onViewAll }: RecipientsQuickViewProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-foreground">Recipients</CardTitle>
        <Button size="sm" variant="outline" className="h-8 bg-transparent" onClick={onAddRecipient}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recipients.slice(0, 5).map((recipient) => {
            const status = statusConfig[recipient.status]
            const StatusIcon = status.icon
            const initials = recipient.name
              .split(" ")
              .map((n) => n[0])
              .join("")

            return (
              <div
                key={recipient.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer"
                onClick={onViewAll}
              >
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm">{initials}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">{recipient.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span className="truncate">{recipient.email}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <Badge variant="secondary" className={cn("text-xs px-2 py-0.5", status.className)}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{recipient.memoriesAssigned} memories</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Total Recipients</span>
            <span className="font-medium text-foreground">{recipients.length}</span>
          </div>
          <div className="flex items-center justify-between text-sm mt-2">
            <span className="text-muted-foreground">Pending Verification</span>
            <span className="font-medium text-warning">{recipients.filter((r) => r.status === "pending").length}</span>
          </div>
          <Button variant="ghost" className="w-full mt-3 text-primary" onClick={onViewAll}>
            View All Recipients
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
