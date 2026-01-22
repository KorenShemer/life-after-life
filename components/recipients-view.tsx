"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowLeft,
  Trash2,
  RefreshCw,
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Recipient } from "@/components/dashboard"

interface RecipientsViewProps {
  recipients: Recipient[]
  onAddRecipient: () => void
  onDeleteRecipient: (id: number) => void
  onResendVerification: (id: number) => void
  onBack: () => void
}

const statusConfig = {
  verified: {
    icon: CheckCircle2,
    label: "Verified",
    className: "text-primary bg-primary/10",
    description: "This recipient is verified and will receive memories.",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    className: "text-warning bg-warning/10",
    description: "Waiting for email verification.",
  },
  expired: {
    icon: AlertCircle,
    label: "Expired",
    className: "text-destructive bg-destructive/10",
    description: "Verification expired. Please resend.",
  },
}

export function RecipientsView({
  recipients,
  onAddRecipient,
  onDeleteRecipient,
  onResendVerification,
  onBack,
}: RecipientsViewProps) {
  const verifiedCount = recipients.filter((r) => r.status === "verified").length
  const pendingCount = recipients.filter((r) => r.status === "pending").length
  const expiredCount = recipients.filter((r) => r.status === "expired").length

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Recipients</h1>
            <p className="text-sm text-muted-foreground">Manage who will receive your memories</p>
          </div>
        </div>
        <Button onClick={onAddRecipient} className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Recipient
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{verifiedCount}</p>
                <p className="text-xs text-muted-foreground">Verified</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{expiredCount}</p>
                <p className="text-xs text-muted-foreground">Expired</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recipients List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">All Recipients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recipients.map((recipient) => {
              const status = statusConfig[recipient.status]
              const StatusIcon = status.icon
              const initials = recipient.name
                .split(" ")
                .map((n) => n[0])
                .join("")

              return (
                <div
                  key={recipient.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 transition-all"
                >
                  <Avatar className="h-12 w-12 border border-border">
                    <AvatarFallback className="bg-muted text-muted-foreground">{initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{recipient.name}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{recipient.email}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{status.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Badge variant="secondary" className={cn("text-xs px-2 py-1", status.className)}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {recipient.memoriesAssigned} memories assigned
                      </p>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {(recipient.status === "pending" || recipient.status === "expired") && (
                          <DropdownMenuItem onClick={() => onResendVerification(recipient.id)}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Resend Verification
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => onDeleteRecipient(recipient.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove Recipient
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              )
            })}

            {recipients.length === 0 && (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No recipients added yet</p>
                <Button variant="outline" className="mt-4 bg-transparent" onClick={onAddRecipient}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Recipient
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
