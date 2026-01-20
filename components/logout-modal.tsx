"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LogOut, ShieldCheck } from "lucide-react"

interface LogoutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  language?: "en" | "he"
}

export function LogoutModal({ open, onOpenChange, onConfirm, language = "en" }: LogoutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <div className="mx-auto h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-2">
            <LogOut className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center text-foreground">
            {language === "he" ? "התנתקות מהחשבון" : "Sign Out"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {language === "he"
              ? "האם אתה בטוח שברצונך להתנתק? הזיכרונות שלך יישארו מאובטחים."
              : "Are you sure you want to sign out? Your memories will remain secure."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-3 p-3 bg-phase-safe/5 rounded-lg border border-phase-safe/20">
          <ShieldCheck className="h-5 w-5 text-phase-safe" />
          <p className="text-sm text-muted-foreground">
            {language === "he"
              ? "מערכת ה-Proof of Life תמשיך לעבוד גם כשאתה מנותק."
              : "The Proof of Life system will continue to work while you're signed out."}
          </p>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button variant="outline" className="flex-1 border-border bg-transparent" onClick={() => onOpenChange(false)}>
            {language === "he" ? "ביטול" : "Cancel"}
          </Button>
          <Button
            className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            onClick={onConfirm}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {language === "he" ? "התנתק" : "Sign Out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
