import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const PATH_NAME = {
  LANDING_PAGE: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  COURSE: "/course",
  COURSE_NEW: "/course/new",
  STUDENT: "/student",
  LECTURER: "/lecturer",
  ATTENDANCE: "/attendance",
};

export const GUEST_ROUTES = [PATH_NAME.LANDING_PAGE, PATH_NAME.LOGIN];

export const PROTECTED_ROUTES = [
  PATH_NAME.DASHBOARD,
  PATH_NAME.COURSE,
  PATH_NAME.COURSE_NEW,
  PATH_NAME.STUDENT,
  PATH_NAME.LECTURER,
  PATH_NAME.ATTENDANCE,
];
