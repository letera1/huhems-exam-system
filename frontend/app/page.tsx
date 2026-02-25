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
  SparklesIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { parseJwtPayload } from "@/lib/jwt";

export default async function Home() {
  const token = (await cookies()).get("huhems_token")?.value;
  const role = token ? parseJwtPayload(token)?.role : null;
  const isLoggedIn = Boolean(token);
  const canGoAdmin = role === "admin";
  const canGoStudent = role === "student";

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-96 w-96 animate-blob rounded-full bg-purple-300/30 mix-blend-multiply blur-3xl filter dark:bg-purple-900/20" />
        <div className="animation-delay-2000 absolute -top-40 right-1/4 h-96 w-96 animate-blob rounded-full bg-yellow-300/30 mix-blend-multiply blur-3xl filter dark:bg-yellow-900/20" />
        <div className="animation-delay-4000 absolute -bottom-40 left-1/2 h-96 w-96 animate-blob rounded-full bg-pink-300/30 mix-blend-multiply blur-3xl filter dark:bg-pink-900/20" />
      </div>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-5xl text-center">
        <div className="flex items-center justify-center gap-2 animate-fade-in">
          <Badge variant="secondary" className="px-3 py-1">
            <GraduationCapIcon className="mr-1 size-3" />
            Haramaya University
          </Badge>
          <Badge className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
            <SparklesIcon className="mr-1 size-3" />
            Holistic Exams
          </Badge>
        </div>

        <h1 className="mt-8 text-balance bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-5xl font-bold tracking-tight text-transparent sm:text-6xl lg:text-7xl animate-fade-in-up">
          Modern Exam Management
        </h1>
        
        <p className="mt-6 text-balance text-lg text-muted-foreground sm:text-xl animate-fade-in-up animation-delay-200">
          Streamline your examination process with HUHEMS - a comprehensive platform for creating, managing, and grading exams with ease.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-in-up animation-delay-400">
          {!isLoggedIn ? (
            <>
              <Button asChild size="lg" className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                <Link href="/auth/login?role=student">
                  <span className="relative z-10">Student Login</span>
                  <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <Link href="/auth/admin-login">
                  Admin Login
                  <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </>
          ) : null}

          {canGoStudent ? (
            <Button asChild size="lg" className="group bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
              <Link href="/student">
                Go to Dashboard
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : null}

          {canGoAdmin ? (
            <Button asChild size="lg" variant="outline" className="group">
              <Link href="/admin">
                Admin Dashboard
                <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          ) : null}
        </div>

        {isLoggedIn && (
          <div className="mt-6 flex items-center justify-center gap-3 animate-fade-in animation-delay-600">
            <span className="text-sm font-medium text-muted-foreground">
              Signed in as <span className="text-foreground font-semibold">{role ?? "user"}</span>
            </span>
          </div>
        )}
      </section>

      {/* Features Grid */}
      <section className="mt-24 animate-fade-in-up animation-delay-800">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Everything you need for modern exam management
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group relative overflow-hidden border-2 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                <ClockIcon className="size-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl">Timed Exams</CardTitle>
              <CardDescription>Flexible scheduling with precise time controls</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Set start and end times, configure duration limits, and track attempts in real-time with server-side enforcement.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-2 transition-all hover:border-pink-500/50 hover:shadow-lg hover:shadow-pink-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/30">
                <ListChecksIcon className="size-6 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle className="text-xl">Smart MCQs</CardTitle>
              <CardDescription>Single and multiple choice questions</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Create diverse question types with automatic grading, instant feedback, and detailed answer analytics.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-2 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                <ShieldCheckIcon className="size-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl">Secure & Fair</CardTitle>
              <CardDescription>Built-in integrity measures</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Enforce attempt limits, prevent cheating with randomization, and maintain academic integrity throughout.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-2 transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30">
                <BarChartIcon className="size-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl">Analytics</CardTitle>
              <CardDescription>Comprehensive performance insights</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Track student performance, identify trends, and generate detailed reports for data-driven decisions.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-2 transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 dark:bg-orange-900/30">
                <FileTextIcon className="size-6 text-orange-600 dark:text-orange-400" />
              </div>
              <CardTitle className="text-xl">Bulk Import</CardTitle>
              <CardDescription>CSV import for efficiency</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Import students and questions in bulk via CSV files, saving hours of manual data entry work.
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-2 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                <UsersIcon className="size-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle className="text-xl">Role-Based Access</CardTitle>
              <CardDescription>Secure admin and student portals</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Separate interfaces for administrators and students with JWT authentication and role-based permissions.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-24 rounded-2xl border bg-gradient-to-br from-purple-50/50 to-pink-50/50 p-12 dark:from-purple-950/20 dark:to-pink-950/20 animate-fade-in-up animation-delay-1000">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center">
              <CheckCircle2Icon className="size-8 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-4xl font-bold">100%</div>
            <div className="mt-1 text-sm text-muted-foreground">Automated Grading</div>
          </div>
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center">
              <ClockIcon className="size-8 text-pink-600 dark:text-pink-400" />
            </div>
            <div className="text-4xl font-bold">Real-time</div>
            <div className="mt-1 text-sm text-muted-foreground">Exam Monitoring</div>
          </div>
          <div className="text-center">
            <div className="mb-2 flex items-center justify-center">
              <ShieldCheckIcon className="size-8 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-4xl font-bold">Secure</div>
            <div className="mt-1 text-sm text-muted-foreground">JWT Authentication</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isLoggedIn && (
        <section className="mt-24 text-center animate-fade-in-up animation-delay-1200">
          <div className="rounded-2xl border bg-gradient-to-br from-purple-600 to-pink-600 p-12 text-white">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg text-purple-100">
              Join Haramaya University's modern exam management platform today
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="group">
                <Link href="/auth/login?role=student">
                  Student Login
                  <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group border-white bg-white/10 text-white hover:bg-white/20">
                <Link href="/auth/admin-login">
                  Admin Login
                  <ArrowRightIcon className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
