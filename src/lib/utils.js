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
  STUDENT_NEW: "/student/new",
  LECTURER: "/lecturer",
  LECTURER_NEW: "/lecturer/new",
  LOCATION: "/location",
  LOCATION_NEW: "/location/new",
  ATTENDANCE: "/attendance",
};

export const GUEST_ROUTES = [PATH_NAME.LANDING_PAGE, PATH_NAME.LOGIN];

export const PROTECTED_ROUTES = [
  PATH_NAME.DASHBOARD,
  PATH_NAME.COURSE,
  PATH_NAME.COURSE_NEW,
  PATH_NAME.STUDENT,
  PATH_NAME.STUDENT_NEW,
  PATH_NAME.LECTURER,
  PATH_NAME.LECTURER_NEW,
  PATH_NAME.LOCATION,
  PATH_NAME.LOCATION_NEW,
  PATH_NAME.ATTENDANCE,
];

export const SWR_CONFIG = {
  revalidateOnFocus: true,
  revalidateIfStale: true,
  revalidateOnReconnect: true,
}

export const isDev = process.env.NODE_ENV === 'development';
