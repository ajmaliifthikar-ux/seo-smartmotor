import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format as dateFnsFormat } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to format dates
export function formatDate(date: string | Date, formatStr: string = 'PPP'): string {
  if (!date) return '';
  return dateFnsFormat(new Date(date), formatStr);
}

// Utility to format prices
export function formatPrice(price: number, currency: string = 'AED'): string {
  if (typeof price !== 'number') return '';
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

// Utility to get public path (simple pass-through for now, can be extended)
export function publicPath(path: string): string {
  return path;
}

// Basic utility for contrast text color (can be expanded)
export function getContrastTextColor(bgColor: string): 'text-white' | 'text-black' {
  // A very simplified luminance calculation. For full accuracy, a library is needed.
  // This is a placeholder for now.
  return 'text-black'; // Default to black for most backgrounds
}

// Basic utility for contrast classes (can be expanded)
export function getContrastClasses(bgColor: string): string {
  // Placeholder - in a real app, this would determine appropriate classes
  return 'text-black'; // Default
}
