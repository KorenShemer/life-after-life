"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, ImageIcon, Video, MoreHorizontal, Users, Calendar, Pencil, Eye, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import type { Memory } from "@/components/dashboard"

interface MemoriesGridProps {
  memories: Memory[]
  onEdit: (memory: Memory) => void
  onDelete: (id: number) => void
  onViewAll: () => void
}

const typeIcons = {
  text: FileText,
  photo: ImageIcon,
  video: Video,
}

const typeColors = {
  text: "bg-info/20 text-info",
  photo: "bg-primary/20 text-primary",
  video: "bg-chart-4/20 text-chart-4",
}

export function MemoriesGrid({ memories, onEdit, onDelete, onViewAll }: MemoriesGridProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium text-foreground">Your Memories</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onViewAll}>
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memories.slice(0, 6).map((memory) => {
            const Icon = typeIcons[memory.type]
            const colorClass = typeColors[memory.type]

            return (
              <div
                key={memory.id}
                className="group p-4 rounded-xl bg-secondary/50 border border-border hover:border-primary/30 hover:bg-secondary transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`h-10 w-10 rounded-lg ${colorClass} flex items-center justify-center`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(memory)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        Manage Recipients
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => onDelete(memory.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="font-medium text-foreground mb-1 text-balance">{memory.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{memory.preview}</p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    <span>
                      {memory.recipients.length} recipient{memory.recipients.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{memory.createdAt}</span>
                  </div>
                </div>

                <div className="flex gap-1 mt-3 flex-wrap">
                  {memory.recipients.slice(0, 2).map((recipient) => (
                    <Badge key={recipient} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                      {recipient}
                    </Badge>
                  ))}
                  {memory.recipients.length > 2 && (
                    <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                      +{memory.recipients.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {memories.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No memories created yet</p>
            <p className="text-sm text-muted-foreground mt-1">Click "Create New Memory" to get started</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
