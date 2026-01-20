"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeartPulse, CheckCircle2, AlertCircle, Settings2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProofOfLifeWidgetProps {
  onViewSettings?: () => void
}

export function ProofOfLifeWidget({ onViewSettings }: ProofOfLifeWidgetProps) {
  const [dayInCycle, setDayInCycle] = useState(16)
  const [isVerifying, setIsVerifying] = useState(false)

  const daysUntilNext = Math.max(0, 30 - dayInCycle)
  const progress = ((30 - daysUntilNext) / 30) * 100

  const currentPhase = dayInCycle < 30 ? "safe" : dayInCycle < 45 ? "warning" : dayInCycle < 52 ? "critical" : "release"

  const handleVerifyNow = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setDayInCycle(0)
    }, 1500)
  }

  const getPhaseColor = () => {
    switch (currentPhase) {
      case "safe":
        return "text-phase-safe"
      case "warning":
        return "text-phase-warning"
      case "critical":
        return "text-phase-critical"
      case "release":
        return "text-phase-release"
      default:
        return "text-primary"
    }
  }

  const getPhaseStrokeColor = () => {
    switch (currentPhase) {
      case "safe":
        return "stroke-phase-safe"
      case "warning":
        return "stroke-phase-warning"
      case "critical":
        return "stroke-phase-critical"
      case "release":
        return "stroke-phase-release"
      default:
        return "stroke-primary"
    }
  }

  const getPhaseLabel = () => {
    switch (currentPhase) {
      case "safe":
        return { text: "Verified", icon: CheckCircle2 }
      case "warning":
        return { text: "Warning Phase", icon: AlertCircle }
      case "critical":
        return { text: "Critical", icon: AlertCircle }
      case "release":
        return { text: "Release Pending", icon: AlertCircle }
      default:
        return { text: "Verified", icon: CheckCircle2 }
    }
  }

  const phaseInfo = getPhaseLabel()
  const PhaseIcon = phaseInfo.icon

  return (
    <Card
      className={cn(
        "bg-card border-border relative overflow-hidden",
        currentPhase === "warning" && "border-phase-warning/50",
        currentPhase === "critical" && "border-phase-critical/50",
        currentPhase === "release" && "border-phase-release/50",
      )}
    >
      {/* Status indicator stripe */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1",
          currentPhase === "safe" && "bg-phase-safe",
          currentPhase === "warning" && "bg-phase-warning",
          currentPhase === "critical" && "bg-phase-critical",
          currentPhase === "release" && "bg-phase-release",
        )}
      />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
            <HeartPulse className={cn("h-4 w-4", getPhaseColor())} />
            Proof of Life
          </CardTitle>
          <span className={cn("flex items-center gap-1 text-xs", getPhaseColor())}>
            <PhaseIcon className="h-3 w-3" />
            {phaseInfo.text}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Progress Circle */}
        <div className="flex items-center justify-center">
          <div className="relative h-32 w-32">
            <svg className="h-32 w-32 -rotate-90 transform">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${progress * 3.52} 352`}
                strokeLinecap="round"
                className={cn("transition-all duration-500", getPhaseStrokeColor())}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-3xl font-bold", getPhaseColor())}>{daysUntilNext}</span>
              <span className="text-xs text-muted-foreground">days left</span>
            </div>
          </div>
        </div>

        {/* Status Text */}
        <p className="text-center text-sm text-muted-foreground">
          Next verification in <span className={cn("font-medium", getPhaseColor())}>{daysUntilNext} days</span>
        </p>

        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">60-Day Cycle Progress</span>
            <span className="text-xs font-medium text-foreground">Day {dayInCycle}</span>
          </div>
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-500 rounded-full",
                currentPhase === "safe" && "bg-phase-safe",
                currentPhase === "warning" && "bg-phase-warning",
                currentPhase === "critical" && "bg-phase-critical",
                currentPhase === "release" && "bg-phase-release",
              )}
              style={{ width: `${(dayInCycle / 60) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-muted-foreground">
            <span>0</span>
            <span>30</span>
            <span>45</span>
            <span>52</span>
            <span>60</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={handleVerifyNow}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <span className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Verify Now
              </>
            )}
          </Button>

          <Button variant="outline" className="w-full border-border bg-transparent" onClick={onViewSettings}>
            <Settings2 className="h-4 w-4 mr-2" />
            View Timeline Settings
          </Button>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          Your memories will be delivered to recipients if verification is missed.
        </p>
      </CardContent>
    </Card>
  )
}
