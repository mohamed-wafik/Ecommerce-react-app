import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: any): string => {
  const res = error?.response?.data;

  if (res?.errors) {
    return (Object.values(res.errors) as any[])[0][0];
  }

  if (typeof res?.message === "string") {
    return res.message;
  }

  return "Something went wrong ❌";
};
