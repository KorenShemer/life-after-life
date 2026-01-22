"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { StatsOverview } from "@/components/stats-overview"
import { ProofOfLifeWidget } from "@/components/proof-of-life-widget"
import { MemoriesGrid } from "@/components/memories-grid"
import { RecipientsQuickView } from "@/components/recipients-quick-view"
import { CreateMemoryButton } from "@/components/create-memory-button"
import { DashboardHeader } from "@/components/dashboard-header"
import { RecipientsView } from "@/components/recipients-view"
import { VerificationSettingsView } from "@/components/verification-settings-view"
import { SecurityView } from "@/components/security-view"
import { SubscriptionView } from "@/components/subscription-view"
import { ProfileView } from "@/components/profile-view"
import { CreateMemoryModal } from "@/components/create-memory-modal"
import { AddRecipientModal } from "@/components/add-recipient-modal"
import { EditMemoryModal } from "@/components/edit-memory-modal"
import { LogoutModal } from "@/components/logout-modal"

export interface Memory {
  id: number
  title: string
  type: "text" | "photo" | "video"
  recipients: string[]
  createdAt: string
  preview: string
  content?: string
}

export interface Recipient {
  id: number
  name: string
  email: string
  status: "verified" | "pending" | "expired"
  memoriesAssigned: number
}

const initialMemories: Memory[] = [
  {
    id: 1,
    title: "Letter to My Children",
    type: "text",
    recipients: ["Emma", "James"],
    createdAt: "Dec 15, 2025",
    preview: "My dearest Emma and James, if you're reading this...",
    content: "My dearest Emma and James, if you're reading this, I want you to know how much I love you both...",
  },
  {
    id: 2,
    title: "Family Photos - Summer 2024",
    type: "photo",
    recipients: ["Emma", "James", "Michael"],
    createdAt: "Nov 28, 2025",
    preview: "12 photos",
  },
  {
    id: 3,
    title: "Birthday Message for Emma",
    type: "video",
    recipients: ["Emma"],
    createdAt: "Nov 10, 2025",
    preview: "3:24 duration",
  },
  {
    id: 4,
    title: "Life Advice & Wisdom",
    type: "text",
    recipients: ["James"],
    createdAt: "Oct 22, 2025",
    preview: "There are things I've learned over the years...",
  },
  {
    id: 5,
    title: "Our Wedding Video",
    type: "video",
    recipients: ["Emma", "James"],
    createdAt: "Oct 5, 2025",
    preview: "15:42 duration",
  },
  {
    id: 6,
    title: "Grandmother's Recipes",
    type: "photo",
    recipients: ["Emma", "James", "Sarah"],
    createdAt: "Sep 18, 2025",
    preview: "8 photos",
  },
]

const initialRecipients: Recipient[] = [
  { id: 1, name: "Emma Johnson", email: "emma.j@email.com", status: "verified", memoriesAssigned: 4 },
  { id: 2, name: "James Johnson", email: "james.j@email.com", status: "verified", memoriesAssigned: 5 },
  { id: 3, name: "Michael Chen", email: "m.chen@email.com", status: "pending", memoriesAssigned: 1 },
  { id: 4, name: "Sarah Williams", email: "sarah.w@email.com", status: "verified", memoriesAssigned: 2 },
  { id: 5, name: "David Park", email: "d.park@email.com", status: "expired", memoriesAssigned: 1 },
]

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("memories")
  const [language, setLanguage] = useState<"en" | "he">("en")
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const [memories, setMemories] = useState<Memory[]>(initialMemories)
  const [recipients, setRecipients] = useState<Recipient[]>(initialRecipients)

  const [isCreateMemoryOpen, setIsCreateMemoryOpen] = useState(false)
  const [isAddRecipientOpen, setIsAddRecipientOpen] = useState(false)
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null)

  const handleCreateMemory = (memory: Omit<Memory, "id" | "createdAt">) => {
    const newMemory: Memory = {
      ...memory,
      id: Date.now(),
      createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    }
    setMemories([newMemory, ...memories])
    setIsCreateMemoryOpen(false)
  }

  const handleEditMemory = (updatedMemory: Memory) => {
    setMemories(memories.map((m) => (m.id === updatedMemory.id ? updatedMemory : m)))
    setEditingMemory(null)
  }

  const handleDeleteMemory = (id: number) => {
    setMemories(memories.filter((m) => m.id !== id))
  }

  const handleAddRecipient = (recipient: Omit<Recipient, "id" | "memoriesAssigned">) => {
    const newRecipient: Recipient = {
      ...recipient,
      id: Date.now(),
      memoriesAssigned: 0,
    }
    setRecipients([...recipients, newRecipient])
    setIsAddRecipientOpen(false)
  }

  const handleDeleteRecipient = (id: number) => {
    setRecipients(recipients.filter((r) => r.id !== id))
  }

  const handleResendVerification = (id: number) => {
    setRecipients(recipients.map((r) => (r.id === id ? { ...r, status: "pending" as const } : r)))
  }

  const handleOpenCreateMemory = () => {
    setIsCreateMemoryOpen(true)
  }

  const handleProfileNavigation = (section: string) => {
    setActiveSection(section)
  }

  const handleLogout = () => {
    setIsLogoutModalOpen(false)
    window.location.href = "/"
  }

  const renderContent = () => {
    switch (activeSection) {
      case "recipients":
        return (
          <RecipientsView
            recipients={recipients}
            onAddRecipient={() => setIsAddRecipientOpen(true)}
            onDeleteRecipient={handleDeleteRecipient}
            onResendVerification={handleResendVerification}
            onBack={() => setActiveSection("memories")}
          />
        )
      case "proof-of-life":
        return <VerificationSettingsView onBack={() => setActiveSection("memories")} />
      case "security":
        return <SecurityView onBack={() => setActiveSection("memories")} />
      case "subscription":
        return <SubscriptionView onBack={() => setActiveSection("memories")} language={language} />
      case "profile":
        return <ProfileView onBack={() => setActiveSection("memories")} language={language} />
      default:
        return (
          <>
            {/* Proof of Life and Stats Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-1 lg:row-span-1">
                <ProofOfLifeWidget onViewSettings={() => setActiveSection("proof-of-life")} />
              </div>
              <div className="lg:col-span-2">
                <StatsOverview
                  totalMemories={memories.length}
                  totalRecipients={recipients.length}
                  storageUsed="2.4 GB"
                />
              </div>
            </div>

            <div className="mb-8">
              <CreateMemoryButton onClick={handleOpenCreateMemory} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <MemoriesGrid
                  memories={memories}
                  onEdit={setEditingMemory}
                  onDelete={handleDeleteMemory}
                  onViewAll={() => {}}
                />
              </div>
              <div className="xl:col-span-1">
                <RecipientsQuickView
                  recipients={recipients}
                  onAddRecipient={() => setIsAddRecipientOpen(true)}
                  onViewAll={() => setActiveSection("recipients")}
                />
              </div>
            </div>
          </>
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          <DashboardHeader
            userName="Alexander"
            userEmail="alexander.cohen@email.com"
            currentPlan="Premium"
            language={language}
            onLanguageChange={setLanguage}
            onNavigate={handleProfileNavigation}
            onLogout={() => setIsLogoutModalOpen(true)}
          />
          {renderContent()}
        </div>
      </main>

      <CreateMemoryModal
        open={isCreateMemoryOpen}
        onOpenChange={setIsCreateMemoryOpen}
        recipients={recipients}
        onSubmit={handleCreateMemory}
        onAddNewRecipient={() => {
          setIsCreateMemoryOpen(false)
          setIsAddRecipientOpen(true)
        }}
      />

      <AddRecipientModal open={isAddRecipientOpen} onOpenChange={setIsAddRecipientOpen} onSubmit={handleAddRecipient} />

      <EditMemoryModal
        open={!!editingMemory}
        onOpenChange={(open) => !open && setEditingMemory(null)}
        memory={editingMemory}
        recipients={recipients}
        onSubmit={handleEditMemory}
      />

      <LogoutModal
        open={isLogoutModalOpen}
        onOpenChange={setIsLogoutModalOpen}
        onConfirm={handleLogout}
        language={language}
      />
    </div>
  )
}
