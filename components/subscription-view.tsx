"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  CreditCard,
  Check,
  Crown,
  Sparkles,
  Cloud,
  Users,
  HeartPulse,
  ShieldCheck,
  Calendar,
  Download,
  AlertCircle,
} from "lucide-react"

interface SubscriptionViewProps {
  onBack: () => void
  language?: "en" | "he"
}

const plans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    description: "For getting started",
    features: [
      { text: "3 memories", included: true },
      { text: "2 recipients", included: true },
      { text: "500 MB storage", included: true },
      { text: "Basic verification", included: true },
      { text: "Email support", included: false },
      { text: "Priority delivery", included: false },
    ],
    popular: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: 9.99,
    period: "month",
    description: "For individuals",
    features: [
      { text: "Unlimited memories", included: true },
      { text: "10 recipients", included: true },
      { text: "10 GB storage", included: true },
      { text: "Advanced verification", included: true },
      { text: "Priority email support", included: true },
      { text: "Priority delivery", included: false },
    ],
    popular: true,
  },
  {
    id: "family",
    name: "Family",
    price: 19.99,
    period: "month",
    description: "For families",
    features: [
      { text: "Unlimited memories", included: true },
      { text: "Unlimited recipients", included: true },
      { text: "100 GB storage", included: true },
      { text: "Custom verification", included: true },
      { text: "24/7 phone support", included: true },
      { text: "Priority delivery", included: true },
    ],
    popular: false,
  },
]

const invoices = [
  { id: 1, date: "Dec 1, 2025", amount: "$9.99", status: "Paid" },
  { id: 2, date: "Nov 1, 2025", amount: "$9.99", status: "Paid" },
  { id: 3, date: "Oct 1, 2025", amount: "$9.99", status: "Paid" },
]

export function SubscriptionView({ onBack, language = "en" }: SubscriptionViewProps) {
  const [currentPlan] = useState("premium")
  const [isAnnual, setIsAnnual] = useState(false)

  const storageUsed = 2.4
  const storageTotal = 10
  const storagePercent = (storageUsed / storageTotal) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack} className="text-muted-foreground">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <CreditCard className="h-6 w-6 text-primary" />
            {language === "he" ? "מנוי וחיוב" : "Subscription & Billing"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {language === "he" ? "נהל את התוכנית והתשלומים שלך" : "Manage your plan and payment methods"}
          </p>
        </div>
      </div>

      {/* Current Plan Status */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Crown className="h-7 w-7 text-primary" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground text-lg">Premium Plan</h3>
                  <Badge className="bg-primary/20 text-primary border-primary/30">Active</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {language === "he" ? "החיוב הבא: 1 בינואר, 2026" : "Next billing: January 1, 2026"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-border bg-transparent">
                {language === "he" ? "בטל מנוי" : "Cancel Plan"}
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                {language === "he" ? "שדרג לתוכנית משפחתית" : "Upgrade to Family"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Storage Usage */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            {language === "he" ? "שימוש באחסון" : "Storage Usage"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{storageUsed} GB used</span>
            <span className="text-foreground font-medium">{storageTotal} GB total</span>
          </div>
          <Progress value={storagePercent} className="h-3" />
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span>{language === "he" ? "וידאו: 1.8 GB" : "Videos: 1.8 GB"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>{language === "he" ? "תמונות: 0.4 GB" : "Photos: 0.4 GB"}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span>{language === "he" ? "טקסט: 0.2 GB" : "Text: 0.2 GB"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Toggle */}
      <div className="flex items-center justify-center gap-4">
        <span className={`text-sm ${!isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
          {language === "he" ? "חודשי" : "Monthly"}
        </span>
        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className={`relative w-14 h-7 rounded-full transition-colors ${isAnnual ? "bg-primary" : "bg-muted"}`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white transition-transform ${
              isAnnual ? "translate-x-8" : "translate-x-1"
            }`}
          />
        </button>
        <span className={`text-sm ${isAnnual ? "text-foreground font-medium" : "text-muted-foreground"}`}>
          {language === "he" ? "שנתי" : "Annual"}
          <Badge className="ml-2 bg-phase-safe/20 text-phase-safe border-phase-safe/30 text-xs">
            {language === "he" ? "חסכו 20%" : "Save 20%"}
          </Badge>
        </span>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = currentPlan === plan.id
          const price = isAnnual ? (plan.price * 0.8 * 12).toFixed(0) : plan.price.toFixed(2)
          const period = isAnnual ? "year" : plan.period

          return (
            <Card
              key={plan.id}
              className={`relative border-border transition-all duration-200 hover:border-primary/50 ${
                plan.popular ? "border-primary/50 shadow-lg shadow-primary/10" : ""
              } ${isCurrentPlan ? "ring-2 ring-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    <Sparkles className="h-3 w-3 mr-1" />
                    {language === "he" ? "פופולרי" : "Most Popular"}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl font-semibold text-foreground">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-bold text-foreground">${price}</span>
                  {plan.price > 0 && <span className="text-muted-foreground">/{period}</span>}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check
                        className={`h-4 w-4 ${feature.included ? "text-phase-safe" : "text-muted-foreground/30"}`}
                      />
                      <span className={feature.included ? "text-foreground" : "text-muted-foreground/50 line-through"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    isCurrentPlan
                      ? "bg-secondary text-secondary-foreground hover:bg-secondary"
                      : plan.popular
                        ? "bg-primary hover:bg-primary/90"
                        : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  }`}
                  disabled={isCurrentPlan}
                >
                  {isCurrentPlan
                    ? language === "he"
                      ? "התוכנית הנוכחית"
                      : "Current Plan"
                    : plan.price === 0
                      ? language === "he"
                        ? "שנמך"
                        : "Downgrade"
                      : language === "he"
                        ? "שדרג"
                        : "Upgrade"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Payment Method & Billing History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Method */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              {language === "he" ? "אמצעי תשלום" : "Payment Method"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-bold text-sm">
                  VISA
                </div>
                <div>
                  <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">
                    {language === "he" ? "תוקף: 12/27" : "Expires: 12/27"}
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="border-phase-safe/30 text-phase-safe">
                {language === "he" ? "ברירת מחדל" : "Default"}
              </Badge>
            </div>
            <Button variant="outline" className="w-full border-border bg-transparent">
              <CreditCard className="h-4 w-4 mr-2" />
              {language === "he" ? "הוסף אמצעי תשלום" : "Add Payment Method"}
            </Button>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {language === "he" ? "היסטוריית חיובים" : "Billing History"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg border border-border"
              >
                <div>
                  <p className="font-medium text-foreground">{invoice.amount}</p>
                  <p className="text-sm text-muted-foreground">{invoice.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="bg-phase-safe/20 text-phase-safe border-phase-safe/30">{invoice.status}</Badge>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Plan Features Comparison */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-foreground">
            {language === "he" ? "יתרונות התוכנית הנוכחית" : "Your Current Plan Benefits"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <Users className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">10</p>
              <p className="text-xs text-muted-foreground">{language === "he" ? "נמענים" : "Recipients"}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <Cloud className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">10 GB</p>
              <p className="text-xs text-muted-foreground">{language === "he" ? "אחסון" : "Storage"}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <HeartPulse className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">{language === "he" ? "מתקדם" : "Advanced"}</p>
              <p className="text-xs text-muted-foreground">{language === "he" ? "אימות" : "Verification"}</p>
            </div>
            <div className="p-4 bg-secondary/50 rounded-lg border border-border text-center">
              <ShieldCheck className="h-6 w-6 mx-auto text-primary mb-2" />
              <p className="text-2xl font-bold text-foreground">AES-256</p>
              <p className="text-xs text-muted-foreground">{language === "he" ? "הצפנה" : "Encryption"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cancellation Notice */}
      <Card className="border-phase-warning/30 bg-phase-warning/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-phase-warning mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">
                {language === "he" ? "הערה חשובה על ביטול" : "Important Note About Cancellation"}
              </p>
              <p className="text-muted-foreground mt-1">
                {language === "he"
                  ? "אם תבטל את המנוי שלך, הזיכרונות שלך יישארו מאוחסנים בבטחה. עם זאת, לא תוכל להוסיף זיכרונות חדשים מעבר למגבלת התוכנית החינמית."
                  : "If you cancel your subscription, your memories will remain securely stored. However, you won't be able to add new memories beyond the free plan limit."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
