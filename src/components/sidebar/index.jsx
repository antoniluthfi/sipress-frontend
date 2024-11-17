"use client";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "./provider";
import {
  BookIcon,
  BookUserIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MapPinIcon,
  NotebookPenIcon,
  UserIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { PATH_NAME } from "@/lib/utils";

const Sidebar = () => {
  const router = useRouter();
  const { isOpen } = useSidebar();
  const { removeUser } = useAuthStore();

  const MENU = [
    {
      href: PATH_NAME.DASHBOARD,
      icon: <LayoutDashboardIcon />,
      title: "Dashboard",
    },
    {
      href: PATH_NAME.COURSE,
      icon: <BookIcon />,
      title: "Mata Kuliah",
    },
    {
      href: PATH_NAME.STUDENT,
      icon: <UserIcon />,
      title: "Mahasiswa",
    },
    {
      href: PATH_NAME.LECTURER,
      icon: <BookUserIcon />,
      title: "Dosen",
    },
    {
      href: PATH_NAME.LOCATION,
      icon: <MapPinIcon />,
      title: "Ruangan",
    },
    {
      href: PATH_NAME.ATTENDANCE,
      icon: <NotebookPenIcon />,
      title: "Presensi",
    },
    {
      href: PATH_NAME.LANDING_PAGE,
      icon: <LogOutIcon />,
      title: "Logout",
    },
  ];

  const logout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    router.push("/login");
    removeUser();
  };

  return (
    <div
      className={`h-screen bg-[#253763] text-white flex flex-col transform ${
        isOpen ? "w-[275px] lg:w-[358px]" : "w-20"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="py-9 font-bold text-lg border-b border-gray-700">
        <div className="flex items-center justify-center gap-3 w-full">
          <Image src="/images/ic_logo.png" width={48} height={40} alt="logo" priority />
          {isOpen && <h3 className="text-white text-3xl font-bold">SiPress</h3>}
        </div>
      </div>
      {isOpen ? (
        <nav className="flex flex-col flex-1">
          {MENU.map((data) => {
            if (data.title === "Logout") {
              return (
                <button
                  key={data.title}
                  type="button"
                  className="flex items-center gap-7 py-[15px] lg:py-[30px] px-10 lg:px-20 hover:bg-white hover:text-[#253763] text-base lg:text-xl font-semibold whitespace-nowrap"
                  onClick={logout}
                >
                  {data.icon}
                  {data.title}
                </button>
              );
            }

            return (
              <Link
                key={data.title}
                href={data.href}
                className="flex items-center gap-7 py-[15px] lg:py-[30px] px-10 lg:px-20 hover:bg-white hover:text-[#253763] text-base lg:text-xl font-semibold whitespace-nowrap"
              >
                {data.icon}
                {data.title}
              </Link>
            );
          })}
        </nav>
      ) : (
        <nav className="flex flex-col flex-1">
          {MENU.map((data) => (
            <Tooltip key={data.title} delayDuration={0}>
              <TooltipTrigger asChild>
                {data.title === "Logout" ? (
                  <button
                    key={data.title}
                    type="button"
                    className="flex items-center justify-center py-[15px] lg:py-[30px] hover:bg-white hover:text-[#253763] text-base lg:text-xl font-semibold"
                    onClick={logout}
                  >
                    {data.icon}
                  </button>
                ) : (
                  <Link
                    key={data.title}
                    href={data.href}
                    className="flex items-center justify-center py-[15px] lg:py-[30px] hover:bg-white hover:text-[#253763] text-base lg:text-xl font-semibold"
                  >
                    {data.icon}
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{data.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
      )}
    </div>
  );
};

export default Sidebar;
