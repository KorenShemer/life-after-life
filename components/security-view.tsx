"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  ShieldCheck,
  Key,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  LogOut,
  Fingerprint,
  Mail,
} from "lucide-react"

interface SecurityViewProps {
  onBack: () => void
}

export function SecurityView({ onBack }: SecurityViewProps) {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true)
  const [biometricEnabled, setBiometricEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const sessions = [
    { id: 1, device: "MacBook Pro", location: "San Francisco, CA", current: true, lastActive: "Now" },
    { id: 2, device: "iPhone 15 Pro", location: "San Francisco, CA", current: false, lastActive: "2 hours ago" },
    { id: 3, device: "Windows Desktop", location: "New York, NY", current: false, lastActive: "3 days ago" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Security Settings
          </h1>
          <p className="text-sm text-muted-foreground">Protect your account and memories</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Two-Factor Authentication */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-primary" />
              Two-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-lg ${twoFactorEnabled ? "bg-phase-safe/20" : "bg-muted"} flex items-center justify-center`}
                >
                  <Key className={`h-5 w-5 ${twoFactorEnabled ? "text-phase-safe" : "text-muted-foreground"}`} />
                </div>
                <div>
                  <p className="font-medium text-foreground">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">Use an app like Google Authenticator</p>
                </div>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div
                  className={`h-10 w-10 rounded-lg ${biometricEnabled ? "bg-phase-safe/20" : "bg-muted"} flex items-center justify-center`}
                >
                  <Fingerprint
                    className={`h-5 w-5 ${biometricEnabled ? "text-phase-safe" : "text-muted-foreground"}`}
                  />
                </div>
                <div>
                  <p className="font-medium text-foreground">Biometric Login</p>
                  <p className="text-sm text-muted-foreground">Use Face ID or fingerprint</p>
                </div>
              </div>
              <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
            </div>

            {twoFactorEnabled && (
              <Badge className="bg-phase-safe/20 text-phase-safe border-phase-safe/30">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                2FA Enabled - Your account is protected
              </Badge>
            )}
          </CardContent>
        </Card>

        {/* Email Notifications */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Security Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Login Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified of new sign-ins</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Verification Reminders</p>
                <p className="text-sm text-muted-foreground">Email before proof of life check</p>
              </div>
              <Switch checked={true} />
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
              <div>
                <p className="font-medium text-foreground">Security Alerts</p>
                <p className="text-sm text-muted-foreground">Unusual activity notifications</p>
              </div>
              <Switch checked={true} />
            </div>
          </CardContent>
        </Card>

        {/* Change Password */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-foreground">
                Current Password
              </Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Enter current password"
                  className="bg-secondary border-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-foreground">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="bg-secondary border-border pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button className="w-full bg-primary hover:bg-primary/90">Update Password</Button>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Active Sessions
              </span>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                <LogOut className="h-4 w-4 mr-1" />
                Sign out all
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  session.current ? "bg-primary/5 border-primary/30" : "bg-secondary/50 border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground flex items-center gap-2">
                      {session.device}
                      {session.current && (
                        <Badge variant="outline" className="text-xs border-primary text-primary">
                          Current
                        </Badge>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.location} · {session.lastActive}
                    </p>
                  </div>
                </div>
                {!session.current && (
                  <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                    <LogOut className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Encryption Status */}
      <Card className="border-phase-safe/30 bg-phase-safe/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-phase-safe/20 flex items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-phase-safe" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground text-lg">End-to-End Encryption Active</h3>
              <p className="text-sm text-muted-foreground">
                All your memories are encrypted with AES-256. Only you and your designated recipients can access them.
              </p>
            </div>
            <Badge className="bg-phase-safe/20 text-phase-safe border-phase-safe/30 text-sm px-4 py-2">
              <Lock className="h-4 w-4 mr-2" />
              AES-256
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
