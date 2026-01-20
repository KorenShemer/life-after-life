"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Upload, ImageIcon, Video, FileText, Check, Sparkles, Heart } from "lucide-react"
import type { Memory, Recipient } from "@/components/dashboard"

interface CreateMemoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  recipients: Recipient[]
  onSubmit: (memory: Omit<Memory, "id" | "createdAt">) => void
  onAddNewRecipient: () => void
}

interface MediaFile {
  id: string
  name: string
  type: "image" | "video" | "document"
  preview: string
  size: string
}

export function CreateMemoryModal({
  open,
  onOpenChange,
  recipients,
  onSubmit,
  onAddNewRecipient,
}: CreateMemoryModalProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) {
      setTitle("")
      setContent("")
      setSelectedRecipients([])
      setMediaFiles([])
      setShowSuccess(false)
      setIsSaving(false)
    }
  }, [open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || selectedRecipients.length === 0) return
    if (!content.trim() && mediaFiles.length === 0) return

    setIsSaving(true)

    // Simulate save delay for animation
    setTimeout(() => {
      let type: "text" | "photo" | "video" = "text"
      if (mediaFiles.some((f) => f.type === "video")) {
        type = "video"
      } else if (mediaFiles.some((f) => f.type === "image")) {
        type = "photo"
      }

      const preview = content
        ? content.slice(0, 50) + (content.length > 50 ? "..." : "")
        : mediaFiles.length > 0
          ? `${mediaFiles.length} attachment${mediaFiles.length > 1 ? "s" : ""}`
          : ""

      onSubmit({
        title,
        type,
        recipients: selectedRecipients,
        preview,
        content: content || undefined,
      })

      setIsSaving(false)
      setShowSuccess(true)

      setTimeout(() => {
        onOpenChange(false)
      }, 2000)
    }, 800)
  }

  const toggleRecipient = (name: string) => {
    setSelectedRecipients((prev) => (prev.includes(name) ? prev.filter((r) => r !== name) : [...prev, name]))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      addFiles(Array.from(files))
    }
  }

  const addFiles = (files: File[]) => {
    const newMediaFiles: MediaFile[] = files.map((file) => {
      let fileType: "image" | "video" | "document" = "document"
      if (file.type.startsWith("image")) {
        fileType = "image"
      } else if (file.type.startsWith("video")) {
        fileType = "video"
      }

      return {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: fileType,
        preview: fileType !== "document" ? URL.createObjectURL(file) : "",
        size: formatFileSize(file.size),
      }
    })
    setMediaFiles((prev) => [...prev, ...newMediaFiles])
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const removeFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      addFiles(files)
    }
  }

  const verifiedRecipients = recipients.filter((r) => r.status === "verified")
  const canSubmit = title.trim() && selectedRecipients.length > 0 && (content.trim() || mediaFiles.length > 0)

  const getFileIcon = (type: "image" | "video" | "document") => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-primary" />
      case "video":
        return <Video className="h-5 w-5 text-chart-4" />
      case "document":
        return <FileText className="h-5 w-5 text-chart-3" />
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border p-0 gap-0 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Heart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Create New Memory</h2>
              <p className="text-sm text-muted-foreground">Preserve a moment for your loved ones</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-muted-foreground hover:text-foreground rounded-full"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-background/98 z-50 flex items-center justify-center">
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center">
                  <Check className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Memory Saved Successfully</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                Your legacy memory has been securely stored and scheduled for your recipients.
              </p>
            </div>
          </div>
        )}

        {/* Form Content */}
        <ScrollArea className="flex-1">
          <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-6">
            {/* Section 1: Memory Title */}
            <div className="space-y-3">
              <Label htmlFor="memory-title" className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  1
                </span>
                Memory Title
              </Label>
              <Input
                id="memory-title"
                placeholder="e.g., A message for my daughter"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background border-border h-12 text-base"
                required
              />
            </div>

            {/* Section 2: Your Message */}
            <div className="space-y-3">
              <Label htmlFor="memory-content" className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  2
                </span>
                Your Message
              </Label>
              <Textarea
                id="memory-content"
                placeholder="Write your heartfelt message here. Share your thoughts, wisdom, love, and anything you want your loved ones to remember..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="bg-background border-border min-h-[160px] text-base resize-none leading-relaxed"
              />
              <p className="text-xs text-muted-foreground">{content.length} characters</p>
            </div>

            {/* Section 3: Media Upload */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                <span className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  3
                </span>
                Attach Media / Files
              </Label>

              <div
                className={`relative rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
                  isDragging
                    ? "border-primary bg-primary/5 scale-[1.01]"
                    : "border-border hover:border-primary/50 hover:bg-secondary/30"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  multiple
                  onChange={handleFileSelect}
                />

                <div className="py-10 text-center">
                  <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">Drag & drop or click to upload media/files</p>
                  <p className="text-xs text-muted-foreground">
                    Supports Images (PNG, JPG), Videos (MP4, MOV), and Documents (PDF, DOC)
                  </p>
                </div>
              </div>

              {/* Live Preview of Attached Files */}
              {mediaFiles.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Attached Files ({mediaFiles.length})
                  </p>
                  <div className="grid gap-2">
                    {mediaFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border bg-secondary/30"
                      >
                        {/* Preview Thumbnail */}
                        {file.type === "image" && file.preview ? (
                          <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                            <img
                              src={file.preview || "/placeholder.svg"}
                              alt={file.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : file.type === "video" && file.preview ? (
                          <div className="h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 border border-border bg-chart-4/10 flex items-center justify-center">
                            <Video className="h-6 w-6 text-chart-4" />
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-lg flex-shrink-0 border border-border bg-chart-3/10 flex items-center justify-center">
                            <FileText className="h-6 w-6 text-chart-3" />
                          </div>
                        )}

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {getFileIcon(file.type)}
                            <span className="text-xs text-muted-foreground capitalize">{file.type}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{file.size}</span>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full flex-shrink-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(file.id)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 4: Assign Recipients */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <span className="h-5 w-5 rounded bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                    4
                  </span>
                  Assign Recipients
                </Label>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs text-primary hover:text-primary/80"
                  onClick={(e) => {
                    e.preventDefault()
                    onAddNewRecipient()
                  }}
                >
                  + Add New Recipient
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Select one or more recipients who will receive this memory.
              </p>

              {verifiedRecipients.length === 0 ? (
                <div className="rounded-xl border border-border bg-secondary/30 p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-3">No verified recipients yet.</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault()
                      onAddNewRecipient()
                    }}
                  >
                    Add Your First Recipient
                  </Button>
                </div>
              ) : (
                <div className="rounded-xl border border-border bg-secondary/20 divide-y divide-border overflow-hidden">
                  {verifiedRecipients.map((recipient) => {
                    const isSelected = selectedRecipients.includes(recipient.name)
                    return (
                      <label
                        key={recipient.id}
                        className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/5" : "hover:bg-secondary/50"
                        }`}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRecipient(recipient.name)}
                          className="h-5 w-5"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground">{recipient.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{recipient.email}</p>
                        </div>
                        {isSelected && (
                          <div className="flex items-center gap-1.5 text-primary">
                            <Check className="h-4 w-4" />
                            <span className="text-xs font-medium">Selected</span>
                          </div>
                        )}
                      </label>
                    )
                  })}
                </div>
              )}

              {selectedRecipients.length > 0 && (
                <p className="text-xs text-primary flex items-center gap-1.5">
                  <Check className="h-3 w-3" />
                  {selectedRecipients.length} recipient{selectedRecipients.length > 1 ? "s" : ""} selected
                </p>
              )}

              {verifiedRecipients.length > 0 && selectedRecipients.length === 0 && (
                <p className="text-xs text-amber-500 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Please select at least one recipient
                </p>
              )}
            </div>
          </form>
        </ScrollArea>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 px-6 py-5 border-t border-border bg-secondary/30">
          <Button
            type="button"
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 min-w-[160px] h-11 text-base font-medium gap-2"
            disabled={!canSubmit || isSaving}
            onClick={handleSubmit}
          >
            {isSaving ? (
              <>
                <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Save & Schedule
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
