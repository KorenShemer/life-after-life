"use client"

import { useState } from "react"
import { Bell, Search, ChevronDown, User, Globe, CreditCard, ShieldCheck, LogOut, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

interface DashboardHeaderProps {
  userName?: string
  userEmail?: string
  currentPlan?: string
  language?: "en" | "he"
  onLanguageChange?: (language: "en" | "he") => void
  onNavigate?: (section: string) => void
  onLogout?: () => void
}

export function DashboardHeader({
  userName = "Sarah",
  userEmail = "sarah@example.com",
  currentPlan = "Premium",
  language = "en",
  onLanguageChange,
  onNavigate,
  onLogout,
}: DashboardHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: "en" as const, label: "English", flag: "🇺🇸" },
    { code: "he" as const, label: "עברית", flag: "🇮🇱" },
  ]

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          {language === "he" ? `שלום, ${userName}` : `Welcome back, ${userName}`}
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          {language === "he"
            ? "המורשת שלך מאובטחת. אומת לאחרונה לפני 3 ימים."
            : "Your legacy is secure. Last verified 3 days ago."}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === "he" ? "חיפוש זיכרונות..." : "Search memories..."}
            className="pl-10 w-64 bg-card border-border"
          />
        </div>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 h-auto hover:bg-card">
              <Avatar className="h-9 w-9 border-2 border-border">
                <AvatarImage src="/professional-portrait.png" alt={userName} />
                <AvatarFallback className="bg-secondary text-secondary-foreground">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground">{userName}</span>
                <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                  {currentPlan}
                </Badge>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-card border-border">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-foreground">{userName}</p>
                <p className="text-xs text-muted-foreground">{userEmail}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />

            {/* Profile */}
            <DropdownMenuItem className="cursor-pointer focus:bg-secondary" onClick={() => onNavigate?.("profile")}>
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{language === "he" ? "הפרופיל שלי" : "My Profile"}</span>
            </DropdownMenuItem>

            {/* Language Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer focus:bg-secondary">
                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{language === "he" ? "שפה" : "Language"}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-card border-border">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    className="cursor-pointer focus:bg-secondary"
                    onClick={() => onLanguageChange?.(lang.code)}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    <span className="flex-1">{lang.label}</span>
                    {language === lang.code && <Check className="h-4 w-4 text-primary ml-2" />}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Subscription */}
            <DropdownMenuItem
              className="cursor-pointer focus:bg-secondary"
              onClick={() => onNavigate?.("subscription")}
            >
              <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{language === "he" ? "מנוי וחיוב" : "Subscription & Billing"}</span>
            </DropdownMenuItem>

            {/* Security */}
            <DropdownMenuItem className="cursor-pointer focus:bg-secondary" onClick={() => onNavigate?.("security")}>
              <ShieldCheck className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{language === "he" ? "אבטחת חשבון" : "Account Security"}</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-border" />

            {/* Logout */}
            <DropdownMenuItem
              className="cursor-pointer focus:bg-destructive/10 text-destructive focus:text-destructive"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{language === "he" ? "התנתק" : "Sign Out"}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
