"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

interface CreateMemoryButtonProps {
  onClick: () => void
}

export function CreateMemoryButton({ onClick }: CreateMemoryButtonProps) {
  return (
    <Button
      size="lg"
      onClick={onClick}
      className="h-14 px-8 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300"
    >
      <Plus className="h-5 w-5 mr-2" />
      New Memory
    </Button>
  )
}
