"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, ImageIcon, Video, Pencil } from "lucide-react"
import type { Memory, Recipient } from "@/components/dashboard"

interface EditMemoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  memory: Memory | null
  recipients: Recipient[]
  onSubmit: (memory: Memory) => void
}

const typeConfig = {
  text: { icon: FileText, label: "Written Letter", color: "bg-info/20 text-info" },
  photo: { icon: ImageIcon, label: "Photo Memory", color: "bg-primary/20 text-primary" },
  video: { icon: Video, label: "Video Message", color: "bg-chart-4/20 text-chart-4" },
}

export function EditMemoryModal({ open, onOpenChange, memory, recipients, onSubmit }: EditMemoryModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])

  useEffect(() => {
    if (memory) {
      setTitle(memory.title)
      setContent(memory.content || "")
      setSelectedRecipients(memory.recipients)
    }
  }, [memory])

  if (!memory) return null

  const config = typeConfig[memory.type]
  const Icon = config.icon

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || selectedRecipients.length === 0) return

    onSubmit({
      ...memory,
      title,
      recipients: selectedRecipients,
      preview: memory.type === "text" ? content.slice(0, 50) + "..." : memory.preview,
      content: memory.type === "text" ? content : memory.content,
    })
  }

  const toggleRecipient = (name: string) => {
    setSelectedRecipients((prev) => (prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name]))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`h-10 w-10 rounded-lg ${config.color} flex items-center justify-center`}>
              <Pencil className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg">Edit Memory</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Update your {config.label.toLowerCase()}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="edit-title" className="text-foreground">
              Memory Title
            </Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary border-border"
              required
            />
          </div>

          {/* Content for text type */}
          {memory.type === "text" && (
            <div className="space-y-2">
              <Label htmlFor="edit-content" className="text-foreground">
                Your Message
              </Label>
              <Textarea
                id="edit-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-secondary border-border min-h-[150px] resize-none"
                required
              />
            </div>
          )}

          {/* File preview for photo/video */}
          {memory.type !== "text" && (
            <div className="space-y-2">
              <Label className="text-foreground">Uploaded {memory.type === "photo" ? "Photos" : "Video"}</Label>
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-center gap-3">
                  <Icon className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-foreground">{memory.preview}</p>
                    <p className="text-xs text-muted-foreground">Created: {memory.createdAt}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recipients */}
          <div className="space-y-3">
            <Label className="text-foreground">Select Recipients</Label>
            <div className="grid grid-cols-2 gap-2">
              {recipients
                .filter((r) => r.status === "verified")
                .map((recipient) => (
                  <label
                    key={recipient.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedRecipients.includes(recipient.name)
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary/50 hover:border-primary/30"
                    }`}
                  >
                    <Checkbox
                      checked={selectedRecipients.includes(recipient.name)}
                      onCheckedChange={() => toggleRecipient(recipient.name)}
                      className="border-border"
                    />
                    <span className="text-sm text-foreground">{recipient.name}</span>
                  </label>
                ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
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
              disabled={!title.trim() || selectedRecipients.length === 0}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
