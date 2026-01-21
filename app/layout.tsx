import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Life After Life - Memory Sharing",
  description: "Secure after-death memory sharing platform. Create lasting messages for your loved ones.",
  icons: {
    icon: [
      {
        url: "/life-after-life_logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/life-after-life_logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/life-after-life_logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/life-after-life_logo.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1d2e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
