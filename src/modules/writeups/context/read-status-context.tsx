"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

interface ReadStatusContextType {
  readStatus: Record<number, boolean>
  toggleReadStatus: (id: number) => void
  setInitialReadStatus: (id: number, isRead: boolean) => void
}

const ReadStatusContext = createContext<ReadStatusContextType | undefined>(undefined)

export function ReadStatusProvider({ children }: { children: ReactNode }) {
  const [readStatus, setReadStatus] = useState<Record<number, boolean>>({})

  const toggleReadStatus = (id: number) => {
    setReadStatus((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const setInitialReadStatus = (id: number, isRead: boolean) => {
    setReadStatus((prev) => {
      // Only set if not already set
      if (prev[id] === undefined) {
        return {
          ...prev,
          [id]: isRead
        }
      }
      return prev
    })
  }

  return (
    <ReadStatusContext.Provider value={{ readStatus, toggleReadStatus, setInitialReadStatus }}>
      {children}
    </ReadStatusContext.Provider>
  )
}

export function useReadStatus() {
  const context = useContext(ReadStatusContext)
  if (context === undefined) {
    throw new Error("useReadStatus must be used within a ReadStatusProvider")
  }
  return context
}
