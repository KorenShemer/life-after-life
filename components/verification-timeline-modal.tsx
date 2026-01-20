"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Heart,
  MessageCircle,
  RotateCcw,
  Send,
  Clock,
  Shield,
  Smartphone,
  Settings2,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationTimelineModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentDay: number
  onSimulateCheckIn: () => void
}

interface MilestoneConfig {
  routine: number // Day of first check-in
  warningDelay: number // Days after routine
  criticalDelay: number // Days after warning
}

const defaultConfig: MilestoneConfig = {
  routine: 30,
  warningDelay: 15,
  criticalDelay: 7,
}

export function VerificationTimelineModal({
  open,
  onOpenChange,
  currentDay,
  onSimulateCheckIn,
}: VerificationTimelineModalProps) {
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success" | "error">("idle")
  const [isSimulating, setIsSimulating] = useState(false)

  const [config, setConfig] = useState<MilestoneConfig>(defaultConfig)
  const [hasChanges, setHasChanges] = useState(false)

  const calculatedMilestones = useMemo(() => {
    const routineDay = config.routine
    const warningDay = routineDay + config.warningDelay
    const criticalDay = warningDay + config.criticalDelay
    const releaseDay = criticalDay + 8 // Final 8 days grace period before release

    return {
      start: 0,
      routine: routineDay,
      warning: warningDay,
      critical: criticalDay,
      release: releaseDay,
    }
  }, [config])

  const totalDays = calculatedMilestones.release

  const milestones = useMemo(
    () => [
      {
        day: 0,
        label: "Cycle Start",
        description: "Timer begins after your last check-in",
        icon: CheckCircle2,
        phase: "safe",
      },
      {
        day: calculatedMilestones.routine,
        label: "Routine Check-in",
        description: "First WhatsApp verification message sent",
        icon: MessageCircle,
        phase: "safe",
      },
      {
        day: calculatedMilestones.warning,
        label: "First Warning",
        description: "Reminder sent if no response received",
        icon: AlertTriangle,
        phase: "warning",
      },
      {
        day: calculatedMilestones.critical,
        label: "Final Warning",
        description: "Urgent alerts via all contact methods",
        icon: AlertOctagon,
        phase: "critical",
      },
      {
        day: calculatedMilestones.release,
        label: "Legacy Release",
        description: "Memories delivered to all recipients",
        icon: Heart,
        phase: "release",
      },
    ],
    [calculatedMilestones],
  )

  const daysUntilNext = Math.max(0, calculatedMilestones.routine - currentDay)
  const currentPhase =
    currentDay < calculatedMilestones.routine
      ? "safe"
      : currentDay < calculatedMilestones.warning
        ? "warning"
        : currentDay < calculatedMilestones.critical
          ? "critical"
          : "release"

  const updateConfig = (key: keyof MilestoneConfig, value: number) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const resetToDefaults = () => {
    setConfig(defaultConfig)
    setHasChanges(false)
  }

  const saveChanges = () => {
    setHasChanges(false)
    // In production, this would persist to backend
  }

  const handleTestConnection = () => {
    setIsTestingConnection(true)
    setConnectionStatus("testing")
    setTimeout(() => {
      setConnectionStatus("success")
      setIsTestingConnection(false)
    }, 2000)
  }

  const handleSimulateCheckIn = () => {
    setIsSimulating(true)
    setTimeout(() => {
      setIsSimulating(false)
      onSimulateCheckIn()
    }, 1500)
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "safe":
        return "bg-phase-safe"
      case "warning":
        return "bg-phase-warning"
      case "critical":
        return "bg-phase-critical"
      case "release":
        return "bg-phase-release"
      default:
        return "bg-muted"
    }
  }

  const getPhaseTextColor = (phase: string) => {
    switch (phase) {
      case "safe":
        return "text-phase-safe"
      case "warning":
        return "text-phase-warning"
      case "critical":
        return "text-phase-critical"
      case "release":
        return "text-phase-release"
      default:
        return "text-muted-foreground"
    }
  }

  const getPhaseBorderColor = (phase: string) => {
    switch (phase) {
      case "safe":
        return "border-phase-safe/30"
      case "warning":
        return "border-phase-warning/30"
      case "critical":
        return "border-phase-critical/30"
      case "release":
        return "border-phase-release/30"
      default:
        return "border-border"
    }
  }

  const progressPercentage = Math.min((currentDay / totalDays) * 100, 100)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-primary" />
            Verification Timeline Settings
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Customize your verification schedule. You have complete control over when and how we check in with you.
          </DialogDescription>
        </DialogHeader>

        {/* Countdown Widget */}
        <Card className={cn("border-2", getPhaseBorderColor(currentPhase))}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={cn("h-16 w-16 rounded-full flex items-center justify-center", getPhaseColor(currentPhase))}
                >
                  <Clock className="h-8 w-8 text-background" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase tracking-wider">Next Verification Message In</p>
                  <p className={cn("text-4xl font-bold", getPhaseTextColor(currentPhase))}>
                    {daysUntilNext} <span className="text-xl font-normal text-muted-foreground">Days</span>
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={cn(
                  "text-sm px-3 py-1",
                  currentPhase === "safe" && "border-phase-safe text-phase-safe",
                  currentPhase === "warning" && "border-phase-warning text-phase-warning",
                  currentPhase === "critical" && "border-phase-critical text-phase-critical",
                  currentPhase === "release" && "border-phase-release text-phase-release",
                )}
              >
                {currentPhase === "safe" && "All Clear"}
                {currentPhase === "warning" && "Warning Phase"}
                {currentPhase === "critical" && "Critical Phase"}
                {currentPhase === "release" && "Release Pending"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-primary" />
              Custom Verification Timeline
            </h3>
            {hasChanges && (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={resetToDefaults} className="text-muted-foreground h-8">
                  Reset to Defaults
                </Button>
                <Button size="sm" onClick={saveChanges} className="bg-primary h-8">
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          <Card className="border-border">
            <CardContent className="p-6 space-y-6">
              {/* Milestone 1: Routine Check-in */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-foreground font-medium">
                    <div className="h-6 w-6 rounded-full bg-phase-safe flex items-center justify-center">
                      <span className="text-xs text-background font-bold">1</span>
                    </div>
                    Routine Check-in
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min={7}
                      max={90}
                      value={config.routine}
                      onChange={(e) => updateConfig("routine", Number.parseInt(e.target.value) || 7)}
                      className="w-20 h-8 text-center bg-secondary border-border"
                    />
                    <span className="text-sm text-muted-foreground">days</span>
                  </div>
                </div>
                <Slider
                  value={[config.routine]}
                  onValueChange={([value]) => updateConfig("routine", value)}
                  min={7}
                  max={90}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  First WhatsApp verification sent on{" "}
                  <span className="text-phase-safe font-medium">Day {config.routine}</span>
                </p>
              </div>

              <Separator className="bg-border" />

              {/* Milestone 2: First Warning */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-foreground font-medium">
                    <div className="h-6 w-6 rounded-full bg-phase-warning flex items-center justify-center">
                      <span className="text-xs text-background font-bold">2</span>
                    </div>
                    First Warning
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">+</span>
                    <Input
                      type="number"
                      min={3}
                      max={30}
                      value={config.warningDelay}
                      onChange={(e) => updateConfig("warningDelay", Number.parseInt(e.target.value) || 3)}
                      className="w-20 h-8 text-center bg-secondary border-border"
                    />
                    <span className="text-sm text-muted-foreground">days after</span>
                  </div>
                </div>
                <Slider
                  value={[config.warningDelay]}
                  onValueChange={([value]) => updateConfig("warningDelay", value)}
                  min={3}
                  max={30}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Warning reminder sent on{" "}
                  <span className="text-phase-warning font-medium">Day {calculatedMilestones.warning}</span> if no
                  response
                </p>
              </div>

              <Separator className="bg-border" />

              {/* Milestone 3: Final Warning */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-foreground font-medium">
                    <div className="h-6 w-6 rounded-full bg-phase-critical flex items-center justify-center">
                      <span className="text-xs text-background font-bold">3</span>
                    </div>
                    Final Warning
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">+</span>
                    <Input
                      type="number"
                      min={2}
                      max={14}
                      value={config.criticalDelay}
                      onChange={(e) => updateConfig("criticalDelay", Number.parseInt(e.target.value) || 2)}
                      className="w-20 h-8 text-center bg-secondary border-border"
                    />
                    <span className="text-sm text-muted-foreground">days after</span>
                  </div>
                </div>
                <Slider
                  value={[config.criticalDelay]}
                  onValueChange={([value]) => updateConfig("criticalDelay", value)}
                  min={2}
                  max={14}
                  step={1}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Urgent alerts via all methods on{" "}
                  <span className="text-phase-critical font-medium">Day {calculatedMilestones.critical}</span>
                </p>
              </div>

              <Separator className="bg-border" />

              {/* Milestone 4: Legacy Release (calculated) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-foreground font-medium">
                    <div className="h-6 w-6 rounded-full bg-phase-release flex items-center justify-center">
                      <span className="text-xs text-background font-bold">4</span>
                    </div>
                    Legacy Release
                  </Label>
                  <Badge className="bg-phase-release/20 text-phase-release border-phase-release/30">
                    Day {calculatedMilestones.release}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  If no response is received, your memories are delivered to all recipients on{" "}
                  <span className="text-phase-release font-medium">Day {calculatedMilestones.release}</span>
                </p>
              </div>

              {/* Total Time Summary */}
              <div className="bg-secondary/50 rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">Total Grace Period</span>
                  </div>
                  <span className="text-2xl font-bold text-primary">{totalDays} days</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  From your last check-in until potential legacy release. You'll receive {4} contact attempts before any
                  action is taken.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Visual Timeline - Real-time update */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Your Verification Cycle</h3>

          {/* Progress Bar with dynamic positioning */}
          <div className="relative pt-2 pb-8">
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all duration-500 rounded-full", getPhaseColor(currentPhase))}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {/* Milestone markers positioned dynamically */}
            {milestones.map((milestone, index) => {
              const position = (milestone.day / totalDays) * 100
              const isActive = currentDay >= milestone.day

              return (
                <div
                  key={milestone.day}
                  className="absolute flex flex-col items-center transition-all duration-300"
                  style={{
                    left: `${position}%`,
                    top: 0,
                    transform: "translateX(-50%)",
                  }}
                >
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2 border-background shadow-md flex items-center justify-center transition-all",
                      isActive ? getPhaseColor(milestone.phase) : "bg-secondary",
                    )}
                  >
                    {isActive && <CheckCircle2 className="h-3 w-3 text-background" />}
                  </div>
                  <div className="mt-2 text-center">
                    <span
                      className={cn(
                        "text-xs font-medium block",
                        isActive ? getPhaseTextColor(milestone.phase) : "text-muted-foreground",
                      )}
                    >
                      Day {milestone.day}
                    </span>
                    <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                      {index === 0
                        ? "Start"
                        : index === 1
                          ? "Check"
                          : index === 2
                            ? "Warn"
                            : index === 3
                              ? "Alert"
                              : "Release"}
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Current day indicator */}
            {currentDay > 0 && currentDay < totalDays && (
              <div
                className="absolute transition-all duration-300"
                style={{
                  left: `${progressPercentage}%`,
                  top: "-2px",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="h-7 w-7 rounded-full bg-foreground border-3 border-background shadow-lg flex items-center justify-center">
                  <span className="text-[9px] font-bold text-background">{currentDay}</span>
                </div>
              </div>
            )}
          </div>

          {/* Gap indicators between milestones */}
          <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/30 rounded-lg p-3">
            <div className="text-center flex-1">
              <span className="block font-medium text-foreground">{config.routine} days</span>
              <span>Until first check</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center flex-1">
              <span className="block font-medium text-phase-warning">+{config.warningDelay} days</span>
              <span>To warning</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center flex-1">
              <span className="block font-medium text-phase-critical">+{config.criticalDelay} days</span>
              <span>To final alert</span>
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="text-center flex-1">
              <span className="block font-medium text-phase-release">+8 days</span>
              <span>To release</span>
            </div>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Verification Method */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-foreground">Verification Method</h3>
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-[#25D366]" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">Primary verification channel</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {connectionStatus === "success" && (
                    <Badge variant="outline" className="border-phase-safe text-phase-safe">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestConnection}
                    disabled={isTestingConnection}
                    className="border-border bg-transparent"
                  >
                    {isTestingConnection ? (
                      <>
                        <span className="h-3 w-3 border-2 border-muted-foreground/30 border-t-muted-foreground rounded-full animate-spin mr-2" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Send className="h-3 w-3 mr-2" />
                        Test Connection
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={handleSimulateCheckIn}
            disabled={isSimulating}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSimulating ? (
              <>
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Resetting Timer...
              </>
            ) : (
              <>
                <RotateCcw className="h-4 w-4 mr-2" />
                Simulate Check-in
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-border">
            Close
          </Button>
        </div>

        {/* Reassurance Message */}
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <p className="text-sm text-muted-foreground text-center">
            <Shield className="h-4 w-4 inline-block mr-1 text-primary" />
            You're in complete control. Adjust your timeline to match your comfort level. We'll always give you multiple
            chances to respond.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
