import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatNumber(num: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', options).format(num);
}

export function formatCurrency(amount: number, currency = 'USD') {
  return formatNumber(amount, {
    style: 'currency',
    currency,
  });
} 