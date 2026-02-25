import Link from "next/link";
import { cookies } from "next/headers";
import { 
  GraduationCapIcon, 
  SparklesIcon, 
  AlertTriangleIcon,
  BookOpenIcon,
  TrophyIcon,
  ClockIcon,
  ArrowRightIcon,
  SettingsIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudentDashboardClient } from "./ui";
import { FirstLoginChangePasswordDialog } from "@/components/auth/first-login-change-password-dialog";
import { getApiBaseUrl } from "@/lib/env";

const FIRST_LOGIN_COOKIE = "huhems_first_login";
const TOKEN_COOKIE = "huhems_token";

export default async function StudentDashboard() {
  const cookieStore = await cookies();
  const showFirstLogin = Boolean(cookieStore.get(FIRST_LOGIN_COOKIE)?.value);

  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  let passwordNeverChanged = false;
  if (token) {
    const apiBase = getApiBaseUrl();
    const res = await fetch(`${apiBase}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const me = await res.json().catch(() => null);
    passwordNeverChanged = Boolean(me && typeof me === "object" && (me as any).passwordNeverChanged);
  }

  return (
    <div className="relative overflow-hidden pb-12">
      <FirstLoginChangePasswordDialog show={showFirstLogin} role="student" />
      
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-0 h-96 w-96 animate-blob rounded-full bg-gradient-to-r from-emerald-400/20 via-green-400/20 to-teal-400/20 blur-3xl filter" />
        <div className="animation-delay-2000 absolute top-20 right-0 h-96 w-96 animate-blob rounded-full bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 blur-3xl filter" />
      </div>

      {/* Password Warning */}
      {passwordNeverChanged ? (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-5 shadow-lg dark:border-amber-800/50 dark:from-amber-950/30 dark:to-yellow-950/30">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
            <AlertTriangleIcon className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-amber-900 dark:text-amber-100">Security Alert</div>
            <div className="mt-1 text-sm text-amber-800 dark:text-amber-200">
              You haven't changed your password yet. For security, please update it now.
            </div>
            <Button asChild variant="link" className="mt-2 h-auto p-0 text-amber-900 dark:text-amber-100">
              <Link href="/student/password" className="font-semibold">
                Change Password →
              </Link>
            </Button>
          </div>
        </div>
      ) : null}

      {/* Header Section */}
      <div className="mb-10 animate-fade-in">
        <div className="flex items-center gap-2">
          <Badge className="border-0 bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-1 text-white shadow-lg">
            <GraduationCapIcon className="mr-1.5 size-3" />
            Student
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 shadow-md">
            <SparklesIcon className="mr-1.5 size-3" />
            Portal
          </Badge>
        </div>
        <h1 className="mt-4 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400">
          Student Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Take exams, track your progress, and view your results.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="animation-delay-200 mb-10 grid animate-fade-in-up gap-4 sm:grid-cols-3">
        <div className="group rounded-2xl border-2 bg-gradient-to-br from-background to-emerald-50/50 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:to-emerald-950/20">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg">
              <BookOpenIcon className="size-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">Exams</div>
              <div className="text-sm text-muted-foreground">Available Now</div>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border-2 bg-gradient-to-br from-background to-blue-50/50 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:to-blue-950/20">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg">
              <ClockIcon className="size-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">Progress</div>
              <div className="text-sm text-muted-foreground">Track Results</div>
            </div>
          </div>
        </div>

        <div className="group rounded-2xl border-2 bg-gradient-to-br from-background to-amber-50/50 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:to-amber-950/20">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
              <TrophyIcon className="size-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">Results</div>
              <div className="text-sm text-muted-foreground">View Scores</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="animation-delay-400 animate-fade-in-up">
        <StudentDashboardClient />
      </div>

      {/* Quick Actions */}
      <div className="animation-delay-600 mt-8 animate-fade-in-up rounded-2xl border-2 bg-gradient-to-br from-background/50 to-background p-6 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
            <SettingsIcon className="size-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Manage your account settings</p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/student/password">
              Change Password
              <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
