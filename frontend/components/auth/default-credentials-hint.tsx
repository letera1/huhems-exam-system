"use client"

import * as React from "react"
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { getApiBaseUrl } from "@/lib/env"

export function DefaultCredentialsHint({ role }: { role: "admin" | "student" }) {
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    async function checkStatus() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/auth/default-status/${role}`)
        if (response.ok) {
           const data = await response.json()
           setIsVisible(data.isDefault)
        }
      } catch (error) {
        console.error("Failed to fetch default password status:", error)
      }
    }
    checkStatus()
  }, [role])

  if (!isVisible) return null

  return (
    <Alert variant="default" className="relative mb-6 border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
      <AlertCircle className="h-4 w-4 stroke-blue-600 dark:stroke-blue-400" />
      <AlertTitle className="mb-2 font-medium text-blue-700 dark:text-blue-300">Default Logins Detected</AlertTitle>
      <AlertDescription className="grid gap-2 text-xs">
        <p className="mb-2">The following accounts are using default passwords. Change them immediately after login.</p>
        
        {role === "admin" && (
          <div className="rounded bg-white/50 p-2 dark:bg-black/20">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Admin</p>
            <p>Username: <code className="font-mono font-bold">admin</code></p>
            <p>Password: <code className="font-mono font-bold">Admin123!</code></p>
          </div>
        )}
        {role === "student" && (
          <div className="rounded bg-white/50 p-2 dark:bg-black/20">
            <p className="font-semibold text-blue-800 dark:text-blue-200">Student</p>
            <p>Username: <code className="font-mono font-bold">student</code></p>
            <p>Password: <code className="font-mono font-bold">Student123!</code></p>
          </div>
        )}
      </AlertDescription>
    </Alert>
  )
}
