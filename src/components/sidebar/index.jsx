"use client";
import Link from "next/link";
import Image from "next/image";
import { useSidebar } from "./provider";
import {
  BookIcon,
  BookUserIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  NotebookPenIcon,
  UserIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const Sidebar = () => {
  const { isOpen } = useSidebar();

  const MENU = [
    {
      href: "/dashboard",
      icon: <LayoutDashboardIcon />,
      title: "Dashboard",
    },
    {
      href: "/course",
      icon: <BookIcon />,
      title: "Mata Kuliah",
    },
    {
      href: "/student",
      icon: <UserIcon />,
      title: "Mahasiswa",
    },
    {
      href: "/lecturer",
      icon: <BookUserIcon />,
      title: "Dosen",
    },
    {
      href: "/attendance",
      icon: <NotebookPenIcon />,
      title: "Presensi",
    },
    {
      href: "/",
      icon: <LogOutIcon />,
      title: "Logout",
    },
  ];

  return (
    <div
      className={`h-screen bg-[#253763] text-white flex flex-col transform ${
        isOpen ? "w-[358px]" : "w-20"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="py-9 font-bold text-lg border-b border-gray-700">
        <div className="flex items-center justify-center gap-3 w-full">
          <Image src="/images/ic_logo.png" width={48} height={40} alt="logo" />
          {isOpen && <h3 className="text-white text-3xl font-bold">SiPress</h3>}
        </div>
      </div>
      {isOpen ? (
        <nav className="flex flex-col flex-1">
          {MENU.map((data) => (
            <Link
              key={data.title}
              href={data.href}
              className="flex items-center gap-7 py-[30px] px-20 hover:bg-white hover:text-[#253763] text-xl font-semibold whitespace-nowrap"
            >
              {data.icon}
              {data.title}
            </Link>
          ))}
        </nav>
      ) : (
        <nav className="flex flex-col flex-1">
          {MENU.map((data) => (
            <Tooltip key={data.title} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  key={data.title}
                  href={data.href}
                  className="flex items-center justify-center py-[30px] hover:bg-white hover:text-[#253763] text-xl font-semibold"
                >
                  {data.icon}
                </Link>
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
