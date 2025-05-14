"use client"

import { ReadStatusProvider } from "../context/read-status-context"
import { WriteupsTable } from "./table"

export function WriteupsTableWrapper() {
  return (
    <ReadStatusProvider>
      <WriteupsTable />
    </ReadStatusProvider>
  )
}
