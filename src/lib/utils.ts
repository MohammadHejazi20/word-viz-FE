import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch (error) {
    return dateString; // Return the original string if parsing fails
  }
}

export const config = {
  BE_URL: import.meta.env.VITE_GITHUB_BE_URL ?? "",
  FE_URL: import.meta.env.VITE_GITHUB_FE_URL ?? "",
  SOCKET_URL: import.meta.env.VITE_SOCKET_URL ?? "",
};
