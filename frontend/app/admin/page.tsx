import Link from "next/link";
import { cookies } from "next/headers";
import { 
  FileTextIcon, 
  UsersIcon, 
  BarChartIcon, 
  AlertTriangleIcon,
  ShieldIcon,
  ArrowRightIcon,
  SparklesIcon,
  TrendingUpIcon,
  ClipboardListIcon,
  SettingsIcon
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FirstLoginChangePasswordDialog } from "@/components/auth/first-login-change-password-dialog";
import { getApiBaseUrl } from "@/lib/env";

const FIRST_LOGIN_COOKIE = "huhems_first_login";
const TOKEN_COOKIE = "huhems_token";

export default async function AdminDashboard() {
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
      <FirstLoginChangePasswordDialog show={showFirstLogin} role="admin" />
      
      {/* Background Decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 right-0 h-96 w-96 animate-blob rounded-full bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-fuchsia-400/20 blur-3xl filter" />
        <div className="animation-delay-2000 absolute top-20 left-0 h-96 w-96 animate-blob rounded-full bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-indigo-400/20 blur-3xl filter" />
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
              <Link href="/admin/password" className="font-semibold">
                Change Password →
              </Link>
            </Button>
          </div>
        </div>
      ) : null}

      {/* Header Section */}
      <div className="mb-10 animate-fade-in">
        <div className="flex items-center gap-2">
          <Badge className="border-0 bg-gradient-to-r from-violet-600 to-purple-600 px-3 py-1 text-white shadow-lg">
            <ShieldIcon className="mr-1.5 size-3" />
            Admin
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 shadow-md">
            <SparklesIcon className="mr-1.5 size-3" />
            Control Panel
          </Badge>
        </div>
        <h1 className="mt-4 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400">
          Admin Dashboard
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Manage exams, students, and monitor performance across your institution.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="animation-delay-200 mb-10 grid animate-fade-in-up gap-4 sm:grid-cols-3">
        <Card className="border-2 bg-gradient-to-br from-background to-violet-50/50 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:to-violet-950/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
              <FileTextIcon className="size-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">Exams</div>
              <div className="text-sm text-muted-foreground">Manage & Publish</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 bg-gradient-to-br from-background to-cyan-50/50 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:to-cyan-950/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
              <UsersIcon className="size-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">Students</div>
              <div className="text-sm text-muted-foreground">Enrollment Data</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 bg-gradient-to-br from-background to-pink-50/50 shadow-lg transition-all hover:scale-105 hover:shadow-xl dark:to-pink-950/20">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
              <BarChartIcon className="size-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold">Analytics</div>
              <div className="text-sm text-muted-foreground">Performance Data</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Action Cards */}
      <div className="animation-delay-400 grid animate-fade-in-up gap-6 lg:grid-cols-2">
        {/* Manage Exams */}
        <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-[1.02] hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/20">
          <div className="absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-2xl transition-all group-hover:scale-150" />
          <CardHeader className="relative">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-xl">
              <ClipboardListIcon className="size-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Manage Exams</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Create new exams, configure duration and availability, add or bulk-import questions, and publish when ready. Manage the full exam lifecycle from drafting to reviewing submitted attempts.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Button asChild size="lg" className="group/btn w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg hover:from-violet-700 hover:to-purple-700 sm:w-auto">
              <Link href="/admin/exams">
                Open Exam Manager
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Manage Students */}
        <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-[1.02] hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
          <div className="absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-2xl transition-all group-hover:scale-150" />
          <CardHeader className="relative">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-xl">
              <UsersIcon className="size-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Manage Students</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Create, edit, and remove student accounts. Keep enrollment details up to date including name, year, and department. Bulk-import students from CSV to onboard entire classes quickly.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Button asChild size="lg" className="group/btn w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:from-cyan-700 hover:to-blue-700 sm:w-auto">
              <Link href="/admin/students">
                Open Student Manager
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Analytics */}
        <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-[1.02] hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/20 lg:col-span-2">
          <div className="absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 blur-2xl transition-all group-hover:scale-150" />
          <CardHeader className="relative">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-xl">
              <TrendingUpIcon className="size-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Analytics & Reports</CardTitle>
            <CardDescription className="text-base leading-relaxed">
              Review performance trends across exams, including scores, completion stats, and question-level insights. Use these reports to identify difficult topics, validate question quality, and monitor student outcomes over time.
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <Button asChild size="lg" className="group/btn w-full bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg hover:from-pink-700 hover:to-rose-700 sm:w-auto">
              <Link href="/admin/analytics">
                Open Analytics Dashboard
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="animation-delay-600 mt-8 animate-fade-in-up rounded-2xl border-2 bg-gradient-to-br from-background/50 to-background p-6 shadow-lg backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
            <SettingsIcon className="size-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Manage your account settings</p>
          </div>
          <Button asChild variant="outline" className="group">
            <Link href="/admin/password">
              Change Password
              <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
