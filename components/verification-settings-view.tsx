"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle2,
  MessageCircle,
  RotateCcw,
  Send,
  Smartphone,
  Info,
  Settings2,
  Save,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface VerificationSettingsViewProps {
  onBack: () => void
}

interface MilestoneConfig {
  routine: number
  warningDelay: number
  criticalDelay: number
}

const defaultConfig: MilestoneConfig = {
  routine: 30,
  warningDelay: 15,
  criticalDelay: 7,
}

export function VerificationSettingsView({ onBack }: VerificationSettingsViewProps) {
  const [currentDay, setCurrentDay] = useState(16)
  const [config, setConfig] = useState<MilestoneConfig>(defaultConfig)
  const [hasChanges, setHasChanges] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"idle" | "testing" | "success">("idle")
  const [isSimulating, setIsSimulating] = useState(false)

  const calculatedMilestones = useMemo(() => {
    const routineDay = config.routine
    const warningDay = routineDay + config.warningDelay
    const criticalDay = warningDay + config.criticalDelay
    const releaseDay = criticalDay + 8

    return { start: 0, routine: routineDay, warning: warningDay, critical: criticalDay, release: releaseDay }
  }, [config])

  const totalDays = calculatedMilestones.release
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
      setCurrentDay(0)
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

  const progressPercentage = Math.min((currentDay / totalDays) * 100, 100)

  const milestones = [
    { day: 0, label: "Start", phase: "safe" },
    { day: calculatedMilestones.routine, label: "Check", phase: "safe" },
    { day: calculatedMilestones.warning, label: "Warn", phase: "warning" },
    { day: calculatedMilestones.critical, label: "Alert", phase: "critical" },
    { day: calculatedMilestones.release, label: "Release", phase: "release" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Verification Settings
            </h1>
            <p className="text-sm text-muted-foreground">Configure your Proof of Life verification timeline</p>
          </div>
        </div>
        {hasChanges && (
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={resetToDefaults} className="text-muted-foreground">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={saveChanges} className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Countdown Widget */}
        <Card
          className={cn(
            "lg:col-span-1 border-2",
            currentPhase === "safe"
              ? "border-phase-safe/30"
              : currentPhase === "warning"
                ? "border-phase-warning/30"
                : "border-phase-critical/30",
          )}
        >
          <CardContent className="p-6 text-center">
            <div
              className={cn(
                "h-20 w-20 rounded-full mx-auto flex items-center justify-center mb-4",
                getPhaseColor(currentPhase),
              )}
            >
              <Clock className="h-10 w-10 text-background" />
            </div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Next Verification In</p>
            <p className={cn("text-5xl font-bold", getPhaseTextColor(currentPhase))}>{daysUntilNext}</p>
            <p className="text-lg text-muted-foreground">Days</p>
            <Badge variant="outline" className={cn("mt-4 text-sm px-4 py-1", getPhaseTextColor(currentPhase))}>
              {currentPhase === "safe" && "All Clear"}
              {currentPhase === "warning" && "Warning Phase"}
              {currentPhase === "critical" && "Critical Phase"}
              {currentPhase === "release" && "Release Pending"}
            </Badge>

            <div className="mt-6 space-y-3">
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleSimulateCheckIn}
                disabled={isSimulating}
              >
                {isSimulating ? (
                  <>
                    <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Resetting...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Simulate Check-in
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground">This resets the 30-day timer to Day 0</p>
            </div>
          </CardContent>
        </Card>

        {/* Custom Timeline Configuration */}
        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-primary" />
              Custom Verification Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Milestone 1 */}
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
              />
              <p className="text-xs text-muted-foreground">
                First WhatsApp verification on <span className="text-phase-safe font-medium">Day {config.routine}</span>
              </p>
            </div>

            <Separator className="bg-border" />

            {/* Milestone 2 */}
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
              />
              <p className="text-xs text-muted-foreground">
                Warning on <span className="text-phase-warning font-medium">Day {calculatedMilestones.warning}</span>
              </p>
            </div>

            <Separator className="bg-border" />

            {/* Milestone 3 */}
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
              />
              <p className="text-xs text-muted-foreground">
                Critical alerts on{" "}
                <span className="text-phase-critical font-medium">Day {calculatedMilestones.critical}</span>
              </p>
            </div>

            <Separator className="bg-border" />

            {/* Milestone 4 (calculated) */}
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

            {/* Total Grace Period */}
            <div className="bg-secondary/50 rounded-lg p-4 border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Total Grace Period</span>
                </div>
                <span className="text-2xl font-bold text-primary">{totalDays} days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visual Timeline */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">Your Verification Cycle</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pt-2 pb-12">
            <div className="h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className={cn("h-full transition-all duration-500 rounded-full", getPhaseColor(currentPhase))}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>

            {milestones.map((milestone) => {
              const position = (milestone.day / totalDays) * 100
              const isActive = currentDay >= milestone.day

              return (
                <div
                  key={milestone.day}
                  className="absolute flex flex-col items-center transition-all duration-300"
                  style={{ left: `${position}%`, top: 0, transform: "translateX(-50%)" }}
                >
                  <div
                    className={cn(
                      "h-5 w-5 rounded-full border-2 border-background shadow-md flex items-center justify-center",
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
                    <span className="text-[10px] text-muted-foreground">{milestone.label}</span>
                  </div>
                </div>
              )
            })}

            {currentDay > 0 && currentDay < totalDays && (
              <div
                className="absolute transition-all duration-300"
                style={{ left: `${progressPercentage}%`, top: "-2px", transform: "translateX(-50%)" }}
              >
                <div className="h-7 w-7 rounded-full bg-foreground border-2 border-background shadow-lg flex items-center justify-center">
                  <span className="text-[9px] font-bold text-background">{currentDay}</span>
                </div>
              </div>
            )}
          </div>

          {/* Gap indicators */}
          <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/30 rounded-lg p-3 mt-4">
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
        </CardContent>
      </Card>

      {/* WhatsApp Connection */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-primary" />
            Verification Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-[#25D366]/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-[#25D366]" />
              </div>
              <div>
                <p className="font-medium text-foreground">WhatsApp</p>
                <p className="text-sm text-muted-foreground">Primary verification channel</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {connectionStatus === "success" && (
                <Badge className="bg-phase-safe/20 text-phase-safe border-phase-safe/30">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={handleTestConnection}
                disabled={isTestingConnection}
                className="border-border bg-transparent"
              >
                {isTestingConnection ? (
                  <>
                    <span className="h-4 w-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin mr-2" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Test Connection
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
