import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS using clsx and tailwind-merge
 * for handling conditional classes and preventing specificity issues.
 * 
 * @param inputs - Class names to be merged
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string into a more readable format
 * 
 * @param dateString - Date string in the format YYYYMMDDHHMMSS
 * @returns Formatted date string (e.g., "March 10, 2020")
 */
export function formatGdeltDate(dateString: string): string {
  if (!dateString || dateString.length < 8) return "Unknown Date";
  
  const year = dateString.substring(0, 4);
  const month = parseInt(dateString.substring(4, 6), 10);
  const day = parseInt(dateString.substring(6, 8), 10);
  
  const date = new Date(parseInt(year), month - 1, day);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Truncates a string to a specified length and adds ellipsis if necessary
 * 
 * @param str - String to truncate
 * @param length - Maximum length of the string
 * @returns Truncated string
 */
export function truncateString(str: string, length: number): string {
  if (!str) return '';
  return str.length > length ? str.substring(0, length) + '...' : str;
}

/**
 * Generates a random color based on string input
 * Useful for visualizations that need consistent colors for specific strings
 * 
 * @param str - String to generate color from
 * @returns HEX color code
 */
export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  
  return color;
}

/**
 * Converts a hex color to RGB values
 * Useful for creating color with opacity
 * 
 * @param hex - Hex color code
 * @returns RGB values object {r, g, b}
 */
export function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}