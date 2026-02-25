import Link from "next/link";
import { cookies } from "next/headers";
import { 
  ArrowRightIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  ListChecksIcon,
  GraduationCapIcon,
  BarChartIcon,
  FileTextIcon,
  UsersIcon,
  CheckCircle2Icon,
  SparklesIcon,
  ZapIcon,
  TrendingUpIcon,
  AwardIcon,
  LockIcon,
  RocketIcon,
  StarIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { parseJwtPayload } from "@/lib/jwt";

export default async function Home() {
  const token = (await cookies()).get("huhems_token")?.value;
  const role = token ? parseJwtPayload(token)?.role : null;
  const isLoggedIn = Boolean(token);
  const canGoAdmin = role === "admin";
  const canGoStudent = role === "student";

  return (
    <div className="relative overflow-hidden pb-20">
      {/* Enhanced Animated Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[500px] w-[500px] animate-blob rounded-full bg-gradient-to-r from-violet-400/30 via-purple-400/30 to-fuchsia-400/30 mix-blend-multiply blur-3xl filter dark:from-violet-600/20 dark:via-purple-600/20 dark:to-fuchsia-600/20" />
        <div className="animation-delay-2000 absolute -top-40 right-1/4 h-[500px] w-[500px] animate-blob rounded-full bg-gradient-to-r from-cyan-400/30 via-blue-400/30 to-indigo-400/30 mix-blend-multiply blur-3xl filter dark:from-cyan-600/20 dark:via-blue-600/20 dark:to-indigo-600/20" />
        <div className="animation-delay-4000 absolute top-40 left-1/2 h-[500px] w-[500px] animate-blob rounded-full bg-gradient-to-r from-pink-400/30 via-rose-400/30 to-red-400/30 mix-blend-multiply blur-3xl filter dark:from-pink-600/20 dark:via-rose-600/20 dark:to-red-600/20" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl pt-12 text-center">
        {/* Floating Badge */}
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm shadow-lg backdrop-blur-sm">
            <GraduationCapIcon className="mr-1.5 size-3.5" />
            Haramaya University
          </Badge>
          <Badge className="border-0 bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-4 py-1.5 text-sm text-white shadow-lg">
            <SparklesIcon className="mr-1.5 size-3.5" />
            Next-Gen Platform
          </Badge>
        </div>

        {/* Main Heading with Gradient */}
        <h1 className="mt-10 animate-fade-in-up text-balance bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-6xl font-extrabold leading-tight tracking-tight text-transparent dark:from-violet-400 dark:via-purple-400 dark:to-fuchsia-400 sm:text-7xl lg:text-8xl">
          HUHEMS
        </h1>
        
        <p className="animation-delay-200 mt-6 animate-fade-in-up text-balance text-2xl font-semibold text-foreground/90 sm:text-3xl">
          Holistic Exam Management System
        </p>

        <p className="animation-delay-400 mx-auto mt-6 max-w-2xl animate-fade-in-up text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Transform your examination process with cutting-edge technology. Create, manage, and grade exams effortlessly with our intelligent platform.
        </p>

        {/* CTA Buttons */}
        <div className="animation-delay-600 mt-12 flex flex-col items-center justify-center gap-4 animate-fade-in-up sm:flex-row">
          {!isLoggedIn ? (
            <>
              <Button asChild size="lg" className="group relative h-14 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-8 text-base font-semibold text-white shadow-2xl shadow-purple-500/50 transition-all hover:scale-105 hover:shadow-purple-500/60">
                <Link href="/auth/login?role=student">
                  <span className="relative z-10 flex items-center gap-2">
                    <RocketIcon className="size-5" />
                    Student Portal
                  </span>
                  <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group h-14 rounded-full border-2 px-8 text-base font-semibold shadow-lg transition-all hover:scale-105 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30">
                <Link href="/auth/admin-login">
                  <LockIcon className="mr-2 size-5" />
                  Admin Access
                  <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </>
          ) : null}

          {canGoStudent ? (
            <Button asChild size="lg" className="group h-14 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-8 text-base font-semibold text-white shadow-2xl shadow-purple-500/50 transition-all hover:scale-105">
              <Link href="/student">
                <RocketIcon className="mr-2 size-5" />
                Go to Dashboard
                <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : null}

          {canGoAdmin ? (
            <Button asChild size="lg" variant="outline" className="group h-14 rounded-full border-2 px-8 text-base font-semibold shadow-lg transition-all hover:scale-105">
              <Link href="/admin">
                <LockIcon className="mr-2 size-5" />
                Admin Dashboard
                <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : null}
        </div>

        {isLoggedIn && (
          <div className="animation-delay-800 mt-8 flex animate-fade-in items-center justify-center gap-2 rounded-full border bg-background/50 px-6 py-3 shadow-lg backdrop-blur-sm">
            <div className="size-2 animate-pulse rounded-full bg-green-500" />
            <span className="text-sm font-medium text-muted-foreground">
              Signed in as <span className="font-bold text-foreground">{role ?? "user"}</span>
            </span>
          </div>
        )}

        {/* Floating Stats */}
        <div className="animation-delay-1000 mx-auto mt-16 grid max-w-4xl animate-fade-in-up grid-cols-2 gap-6 sm:grid-cols-4">
          <div className="group rounded-2xl border bg-background/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-gradient-to-br from-violet-500 to-purple-500 p-3">
                <CheckCircle2Icon className="size-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">100%</div>
            <div className="mt-1 text-xs text-muted-foreground">Auto Grading</div>
          </div>
          <div className="group rounded-2xl border bg-background/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 p-3">
                <ZapIcon className="size-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">Real-time</div>
            <div className="mt-1 text-xs text-muted-foreground">Monitoring</div>
          </div>
          <div className="group rounded-2xl border bg-background/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-gradient-to-br from-pink-500 to-rose-500 p-3">
                <ShieldCheckIcon className="size-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">Secure</div>
            <div className="mt-1 text-xs text-muted-foreground">JWT Auth</div>
          </div>
          <div className="group rounded-2xl border bg-background/50 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl">
            <div className="mb-2 flex justify-center">
              <div className="rounded-full bg-gradient-to-br from-amber-500 to-orange-500 p-3">
                <TrendingUpIcon className="size-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold">Smart</div>
            <div className="mt-1 text-xs text-muted-foreground">Analytics</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="animation-delay-1200 relative mx-auto mt-32 max-w-6xl animate-fade-in-up">
        <div className="mb-16 text-center">
          <Badge className="mb-4 border-0 bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-1.5 text-white">
            <StarIcon className="mr-1.5 size-3.5" />
            Features
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Everything You Need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful tools designed for modern education
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Feature Card 1 */}
          <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-105 hover:border-violet-500/50 hover:shadow-2xl hover:shadow-violet-500/20">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-violet-500/10 to-purple-500/10 blur-2xl transition-all group-hover:scale-150" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg">
                <ClockIcon className="size-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Timed Exams</CardTitle>
              <CardDescription className="text-base">Precision scheduling & tracking</CardDescription>
            </CardHeader>
            <CardContent className="relative text-sm leading-relaxed text-muted-foreground">
              Configure exam windows, set duration limits, and monitor attempts in real-time with server-side enforcement.
            </CardContent>
          </Card>

          {/* Feature Card 2 */}
          <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-105 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-2xl transition-all group-hover:scale-150" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg">
                <ListChecksIcon className="size-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Smart MCQs</CardTitle>
              <CardDescription className="text-base">Intelligent question system</CardDescription>
            </CardHeader>
            <CardContent className="relative text-sm leading-relaxed text-muted-foreground">
              Create single and multiple choice questions with automatic grading, instant feedback, and detailed analytics.
            </CardContent>
          </Card>

          {/* Feature Card 3 */}
          <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-105 hover:border-pink-500/50 hover:shadow-2xl hover:shadow-pink-500/20">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-pink-500/10 to-rose-500/10 blur-2xl transition-all group-hover:scale-150" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg">
                <ShieldCheckIcon className="size-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Secure & Fair</CardTitle>
              <CardDescription className="text-base">Academic integrity built-in</CardDescription>
            </CardHeader>
            <CardContent className="relative text-sm leading-relaxed text-muted-foreground">
              Enforce attempt limits, prevent cheating with advanced measures, and maintain fairness throughout.
            </CardContent>
          </Card>

          {/* Feature Card 4 */}
          <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-105 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/20">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-emerald-500/10 to-green-500/10 blur-2xl transition-all group-hover:scale-150" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
                <BarChartIcon className="size-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Analytics</CardTitle>
              <CardDescription className="text-base">Data-driven insights</CardDescription>
            </CardHeader>
            <CardContent className="relative text-sm leading-relaxed text-muted-foreground">
              Track performance, identify trends, and generate comprehensive reports for informed decision-making.
            </CardContent>
          </Card>

          {/* Feature Card 5 */}
          <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-105 hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/20">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-amber-500/10 to-orange-500/10 blur-2xl transition-all group-hover:scale-150" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-lg">
                <FileTextIcon className="size-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Bulk Import</CardTitle>
              <CardDescription className="text-base">Efficient data management</CardDescription>
            </CardHeader>
            <CardContent className="relative text-sm leading-relaxed text-muted-foreground">
              Import students and questions via CSV files in seconds, eliminating hours of manual data entry.
            </CardContent>
          </Card>

          {/* Feature Card 6 */}
          <Card className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-105 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/20">
            <div className="absolute -right-8 -top-8 size-32 rounded-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl transition-all group-hover:scale-150" />
            <CardHeader className="relative">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                <UsersIcon className="size-7 text-white" />
              </div>
              <CardTitle className="text-2xl">Role-Based</CardTitle>
              <CardDescription className="text-base">Secure access control</CardDescription>
            </CardHeader>
            <CardContent className="relative text-sm leading-relaxed text-muted-foreground">
              Separate portals for admins and students with JWT authentication and granular permissions.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="animation-delay-1400 relative mx-auto mt-32 max-w-4xl animate-fade-in-up text-center">
          <div className="relative overflow-hidden rounded-3xl border-2 border-purple-500/20 bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 p-12 shadow-2xl shadow-purple-500/30 sm:p-16">
            {/* Decorative Elements */}
            <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 size-64 rounded-full bg-white/10 blur-3xl" />
            
            <div className="relative">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                  <AwardIcon className="size-12 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-white sm:text-5xl">
                Ready to Transform Your Exams?
              </h2>
              <p className="mt-6 text-xl text-purple-100">
                Join Haramaya University's cutting-edge exam management platform
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="secondary" className="group h-14 rounded-full px-8 text-base font-semibold shadow-xl transition-all hover:scale-105">
                  <Link href="/auth/login?role=student">
                    <RocketIcon className="mr-2 size-5" />
                    Get Started as Student
                    <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" className="group h-14 rounded-full border-2 border-white bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/20">
                  <Link href="/auth/admin-login">
                    <LockIcon className="mr-2 size-5" />
                    Admin Access
                    <ArrowRightIcon className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
