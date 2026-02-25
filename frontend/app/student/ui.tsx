"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ClockIcon, 
  FileTextIcon, 
  PlayIcon, 
  RefreshCwIcon,
  TrophyIcon,
  AlertCircleIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";

type ExamListItem = {
  id: string;
  title: string;
  description: string;
  maxAttempts: number;
  durationMinutes: number;
  questionsPerPage: number;
  questionCount: number;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function normalizeExamListItem(raw: unknown): ExamListItem {
  const r = asRecord(raw);
  return {
    id: String(r?.id ?? r?.ID ?? ""),
    title: String(r?.title ?? r?.Title ?? ""),
    description: String(r?.description ?? r?.Description ?? ""),
    maxAttempts: Number(r?.maxAttempts ?? r?.MaxAttempts ?? 1),
    durationMinutes: Number(r?.durationMinutes ?? r?.DurationMinutes ?? 30),
    questionsPerPage: Number(r?.questionsPerPage ?? r?.QuestionsPerPage ?? 5),
    questionCount: Number(r?.questionCount ?? r?.QuestionCount ?? 0),
  };
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  return fallback;
}

export function StudentDashboardClient() {
  const router = useRouter();

  const [exams, setExams] = useState<ExamListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [startError, setStartError] = useState<string | null>(null);
  const [startingId, setStartingId] = useState<string | null>(null);

  const [rulesOpen, setRulesOpen] = useState(false);
  const [rulesAgreed, setRulesAgreed] = useState(false);
  const [rulesExam, setRulesExam] = useState<ExamListItem | null>(null);

  async function load() {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await fetch("/api/student/exams", { cache: "no-store" });
      const text = await res.text();
      const data = (() => {
        try {
          return JSON.parse(text) as unknown;
        } catch {
          return null;
        }
      })();

      if (!res.ok) {
        const r = asRecord(data);
        const msg = r && typeof r.message === "string" ? r.message : text;
        throw new Error(msg || "Failed to load exams");
      }

      setExams(Array.isArray(data) ? data.map(normalizeExamListItem).filter((e) => Boolean(e.id)) : []);
    } catch (e: unknown) {
      setLoadError(getErrorMessage(e, "Failed to load exams"));
    } finally {
      setLoading(false);
    }
  }

  async function startExamAttempt(examId: string) {
    setStartingId(examId);
    setStartError(null);
    try {
      const res = await fetch(`/api/student/exams/${examId}/start`, { method: "POST" });
      const j = (await res.json().catch(() => ({}))) as unknown;
      if (!res.ok) {
        const r = asRecord(j);
        const msg = r && typeof r.message === "string" ? r.message : "Failed to start attempt";
        throw new Error(msg);
      }

      const r = asRecord(j);
      const attemptId = r ? String(r.attemptId ?? "") : "";
      if (!attemptId) throw new Error("Missing attemptId");

      setRulesOpen(false);
      router.push(`/student/attempts/${attemptId}`);
    } catch (e: unknown) {
      setStartError(getErrorMessage(e, "Failed to start attempt"));
    } finally {
      setStartingId(null);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const publishedCount = useMemo(() => exams.length, [exams.length]);

  return (
    <div className="grid gap-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-background/50 p-4 shadow-md backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm">
          {loading ? (
            <div className="flex items-center gap-2">
              <RefreshCwIcon className="size-4 animate-spin text-muted-foreground" />
              <span className="text-muted-foreground">Loading exams...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500">
                <FileTextIcon className="size-4 text-white" />
              </div>
              <span className="font-semibold">{publishedCount}</span>
              <span className="text-muted-foreground">published exams</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            onClick={() => router.push("/student/results")}
            className="group"
          >
            <TrophyIcon className="mr-2 size-4" />
            My Results
          </Button>
          <Button 
            variant="outline" 
            onClick={() => void load()} 
            disabled={loading}
            className="group"
          >
            <RefreshCwIcon className={`mr-2 size-4 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error State */}
      {loadError ? (
        <Card className="border-2 border-red-200 bg-gradient-to-br from-red-50 to-rose-50 dark:border-red-800/50 dark:from-red-950/30 dark:to-rose-950/30">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
                <AlertCircleIcon className="size-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <CardTitle className="text-red-900 dark:text-red-100">Couldn't load exams</CardTitle>
                <CardDescription className="text-red-700 dark:text-red-300">{loadError}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      ) : null}

      {/* Exams Grid */}
      <div className="grid gap-6">
        {exams.map((exam, index) => (
          <Card 
            key={exam.id} 
            className="group relative overflow-hidden border-2 bg-gradient-to-br from-background to-background transition-all hover:scale-[1.01] hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="absolute -right-12 -top-12 size-40 rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 blur-2xl transition-all group-hover:scale-150" />
            
            <CardHeader className="relative">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold">{exam.title}</CardTitle>
                  {exam.description ? (
                    <CardDescription className="mt-2 text-base">{exam.description}</CardDescription>
                  ) : null}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge className="border-0 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <FileTextIcon className="mr-1 size-3" />
                    {exam.questionCount} Questions
                  </Badge>
                  <Badge className="border-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <ClockIcon className="mr-1 size-3" />
                    {exam.durationMinutes} min
                  </Badge>
                  <Badge variant="secondary">
                    {exam.maxAttempts} attempt{exam.maxAttempts !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-muted-foreground">Questions per page:</span>
                  <span className="font-semibold">{exam.questionsPerPage}</span>
                </div>
              </div>
              <Button
                onClick={() => {
                  setRulesExam(exam);
                  setRulesAgreed(false);
                  setStartError(null);
                  setRulesOpen(true);
                }}
                disabled={startingId === exam.id}
                size="lg"
                className="group/btn bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:from-emerald-700 hover:to-teal-700"
              >
                {startingId === exam.id ? (
                  <>
                    <RefreshCwIcon className="mr-2 size-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <PlayIcon className="mr-2 size-4" />
                    Take Exam
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Empty State */}
        {!loading && !loadError && exams.length === 0 ? (
          <Card className="border-2 border-dashed">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <FileTextIcon className="size-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-2xl">No Published Exams</CardTitle>
              <CardDescription className="text-base">
                There are no exams available at the moment. Check back later or contact your administrator.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}
      </div>

      {/* Rules Dialog */}
      <AlertDialog
        open={rulesOpen}
        onOpenChange={(nextOpen) => {
          if (startingId) return;
          if (nextOpen) {
            setStartError(null);
          } else {
            setRulesExam(null);
            setRulesAgreed(false);
          }
          setRulesOpen(nextOpen);
        }}
      >
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl">Exam Rules & Instructions</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              Please read the following rules carefully before starting the exam.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="mt-2 space-y-4">
            <div className="rounded-xl border-2 bg-gradient-to-br from-background to-muted/20 p-5">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                    <ClockIcon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <span className="font-semibold">Time Limit:</span> The exam is time-bound. Once started, the
                    timer cannot be paused.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <AlertCircleIcon className="size-3.5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <span className="font-semibold">No Tab Switching:</span> Do not refresh, close, or switch browser
                    tabs during the exam.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                    <FileTextIcon className="size-3.5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <span className="font-semibold">No External Help:</span> Use of mobile phones, books, notes, or any
                    external assistance is strictly prohibited.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/30">
                    <TrophyIcon className="size-3.5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <span className="font-semibold">Single Attempt:</span> You are allowed only one attempt. Answers
                    cannot be changed after submission.
                  </div>
                </li>
              </ul>
            </div>

            <div className="flex items-start gap-3 rounded-xl border-2 bg-muted/30 p-4">
              <input
                id="agree_exam_rules"
                type="checkbox"
                className="mt-0.5 h-5 w-5 rounded border-input bg-background text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                checked={rulesAgreed}
                onChange={(e) => setRulesAgreed(e.target.checked)}
                disabled={Boolean(startingId)}
              />
              <Label htmlFor="agree_exam_rules" className="cursor-pointer text-sm leading-snug">
                I have read and agree to the exam rules and understand that violating these rules may result in disqualification.
              </Label>
            </div>
          </div>

          {startError ? (
            <div className="rounded-lg border-2 border-red-200 bg-red-50 p-3 dark:border-red-800/50 dark:bg-red-950/30">
              <p className="text-sm font-medium text-red-900 dark:text-red-100">{startError}</p>
            </div>
          ) : null}

          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button type="button" variant="outline" disabled={Boolean(startingId)}>
                Cancel
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button
                type="button"
                disabled={!rulesExam || !rulesAgreed || Boolean(startingId)}
                onClick={(e) => {
                  e.preventDefault();
                  if (!rulesExam) return;
                  void startExamAttempt(rulesExam.id);
                }}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                {startingId ? (
                  <>
                    <RefreshCwIcon className="mr-2 size-4 animate-spin" />
                    Starting...
                  </>
                ) : (
                  <>
                    <PlayIcon className="mr-2 size-4" />
                    Start Exam
                  </>
                )}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
