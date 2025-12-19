// src/utils/date.ts
import { format, parseISO, isValid } from "date-fns";

type DateInput = string | number | Date;

/**
 * Safely converts input to Date
 */
const toDate = (date: DateInput): Date | null => {
  if (!date) return null;

  const parsed =
    typeof date === "string" ? parseISO(date) : new Date(date);

  return isValid(parsed) ? parsed : null;
};

/**
 * Format date as: 12 Jan 2025
 */
export const formatDate = (
  date: DateInput,
  pattern = "dd MMM yyyy"
): string => {
  const d = toDate(date);
  if (!d) return "-";
  return format(d, pattern);
};

/**
 * Format date & time as: 12 Jan 2025, 10:45 AM
 */
export const formatDateTime = (
  date: DateInput,
  pattern = "dd MMM yyyy, hh:mm a"
): string => {
  const d = toDate(date);
  if (!d) return "-";
  return format(d, pattern);
};

/**
 * Format time only: 10:45 AM
 */
export const formatTime = (
  date: DateInput,
  pattern = "hh:mm a"
): string => {
  const d = toDate(date);
  if (!d) return "-";
  return format(d, pattern);
};
