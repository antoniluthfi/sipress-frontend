import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getUserLocalStorage() {
  const data = localStorage.getItem("user");
  return JSON.parse(data);
}
