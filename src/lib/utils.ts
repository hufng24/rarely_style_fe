import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatGender(gender?: string): string {
  switch (gender) {
    case "MALE":
      return "Nam";
    case "FEMALE":
      return "Nữ";
    default:
      return "Khác";
  }
}


export function formatDate(dateInput?: string | number | Date): string {
  if (!dateInput) return "";

  const date = new Date(dateInput);

  // check invalid date
  if (isNaN(date.getTime())) return "";

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


