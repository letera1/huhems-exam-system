export function getApiBaseUrl(): string {
  let url: string;
  if (typeof window === "undefined") {
    url = process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
  } else {
    url = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";
  }
  // Remove trailing slash if present
  return url.replace(/\/$/, "");
}
