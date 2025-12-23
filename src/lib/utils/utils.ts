import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const toSearchString = (value: unknown): string => {
  if (value === null || value === undefined) return "";
  return String(value).toLowerCase().trim();
};

export const normalizeDateForSearch = (date: unknown): string => {
  if (!date) return "";

  const d = new Date(date as any);
  if (isNaN(d.getTime())) return toSearchString(date);

  return [
    d.toISOString(),
    d.toISOString().split("T")[0],
    d.toLocaleDateString("en-IN"),
    d.toLocaleDateString("en-GB"),
    d.toLocaleDateString("en-US"),
  ]
    .join(" ")
    .toLowerCase();
};
export const  parseDDMMYYYY = (dateStr?: string) => {
  if (!dateStr) return null;

  const [day, month, year] = dateStr.split("/").map(Number);
  if (!day || !month || !year) return null;

  return new Date(year, month - 1, day);
};
