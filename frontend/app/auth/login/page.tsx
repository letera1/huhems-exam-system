"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { DefaultCredentialsHint } from "@/components/auth/default-credentials-hint"

function LoginContent() {
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") === "admin" ? "admin" : "student"
  const [role, setRole] = React.useState<"student" | "admin">(defaultRole)

  return (
    <div className="grid gap-6">
      <DefaultCredentialsHint role={role} />
      <div className="flex items-center justify-center p-1 bg-muted rounded-lg w-fit mx-auto shadow-sm border">
        <Button
          variant={role === "student" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setRole("student")}
          className="text-sm px-8"
        >
          Student
        </Button>
        <Button
          variant={role === "admin" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setRole("admin")}
          className="text-sm px-8"
        >
          Admin
        </Button>
      </div>

      {role === "student" ? (
        <LoginForm
          key="student"
          title="Student Login"
          description="Sign in to access your student dashboard and exams."
          expectedRole="student"
          defaultRedirectPath="/student"
          allowNextPrefix="/student"
        />
      ) : (
        <LoginForm
          key="admin"
          title="Admin Login"
          description="Sign in as an administrator to access management dashboards."
          expectedRole="admin"
          defaultRedirectPath="/admin"
          allowNextPrefix="/admin"
        />
      )}
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}
