"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, Mail, User } from "lucide-react"
import type { Recipient } from "@/components/dashboard"

interface AddRecipientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (recipient: Omit<Recipient, "id" | "memoriesAssigned">) => void
}

export function AddRecipientModal({ open, onOpenChange, onSubmit }: AddRecipientModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (!open) {
      setName("")
      setEmail("")
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return

    onSubmit({
      name,
      email,
      status: "pending",
    })
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg">Add New Recipient</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                They will receive a verification email.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="Enter their full name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-secondary border-border pl-10"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter their email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-border pl-10"
                required
              />
            </div>
            {email && !isValidEmail(email) && (
              <p className="text-xs text-destructive">Please enter a valid email address</p>
            )}
          </div>

          {/* Info */}
          <div className="bg-secondary/50 rounded-lg p-4 border border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">What happens next:</span> We'll send a verification email to
              confirm their identity. They won't know about your memories until they're delivered.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-border bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!name.trim() || !email.trim() || !isValidEmail(email)}
            >
              Send Verification
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
