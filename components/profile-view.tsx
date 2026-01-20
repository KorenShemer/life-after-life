"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Camera, Mail, Phone, MapPin, Calendar, Save, CheckCircle2 } from "lucide-react"

interface ProfileViewProps {
  onBack: () => void
  language?: "en" | "he"
}

export function ProfileView({ onBack, language = "en" }: ProfileViewProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({
    firstName: "Alexander",
    lastName: "Cohen",
    email: "alexander.cohen@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    dateJoined: "March 15, 2024",
  })

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            {language === "he" ? "הפרופיל שלי" : "My Profile"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {language === "he" ? "נהל את המידע האישי שלך" : "Manage your personal information"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="border-border lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block">
              <Avatar className="h-24 w-24 border-4 border-border">
                <AvatarImage src="/professional-portrait.png" alt={profile.firstName} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary hover:bg-primary/90"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            <Badge className="mt-3 bg-primary/20 text-primary border-primary/30">Premium Member</Badge>
            <div className="mt-6 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  {language === "he" ? "הצטרף ב-" : "Member since "}
                  {profile.dateJoined}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <Card className="border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground">
              {language === "he" ? "מידע אישי" : "Personal Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  {language === "he" ? "שם פרטי" : "First Name"}
                </Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  {language === "he" ? "שם משפחה" : "Last Name"}
                </Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  className="bg-secondary border-border"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {language === "he" ? "אימייל" : "Email Address"}
              </Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {language === "he" ? "טלפון" : "Phone Number"}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                {language === "he" ? "מיקום" : "Location"}
              </Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="bg-secondary border-border"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              {saved && (
                <Badge className="bg-phase-safe/20 text-phase-safe border-phase-safe/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  {language === "he" ? "נשמר!" : "Saved!"}
                </Badge>
              )}
              <Button variant="outline" className="border-border bg-transparent">
                {language === "he" ? "ביטול" : "Cancel"}
              </Button>
              <Button className="bg-primary hover:bg-primary/90" onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {language === "he" ? "שומר..." : "Saving..."}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {language === "he" ? "שמור שינויים" : "Save Changes"}
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Statistics */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">
            {language === "he" ? "סטטיסטיקות חשבון" : "Account Statistics"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <p className="text-3xl font-bold text-foreground">6</p>
              <p className="text-sm text-muted-foreground">
                {language === "he" ? "זיכרונות שנוצרו" : "Memories Created"}
              </p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <p className="text-3xl font-bold text-foreground">5</p>
              <p className="text-sm text-muted-foreground">{language === "he" ? "נמענים" : "Recipients"}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <p className="text-3xl font-bold text-foreground">24</p>
              <p className="text-sm text-muted-foreground">{language === "he" ? "אימותים שהושלמו" : "Verifications"}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <p className="text-3xl font-bold text-foreground">9</p>
              <p className="text-sm text-muted-foreground">{language === "he" ? "חודשי חברות" : "Months Active"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
