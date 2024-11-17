"use client";
import React from "react";
import { MenuIcon, UserCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useSidebar } from "../sidebar/provider";
import { Search } from "../ui/search";
import useAuthStore from "@/store/useAuthStore";

const Header = () => {
  const { user } = useAuthStore();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="px-9 py-6 bg-white flex justify-between w-full h-[100px]">
      <div className="flex items-center gap-9">
        <Button variant="outline" onClick={toggleSidebar}>
          <MenuIcon />
        </Button>
        <Search className="w-[430px]" placeholder="Cari" />
      </div>

      <div className="flex items-center gap-9">
        <div className="flex flex-col items-end w-full">
          <h3 className="text-2xl text-[#253763] font-semibold">
            {user?.name || "-"}
          </h3>
          <p className="text-sm text-[#B5B5B5]">
            {user?.role === "lecturer" ? "Dosen" : "Mahasiswa"}
          </p>
        </div>
        <UserCircleIcon className="w-12 h-12" />
      </div>
    </div>
  );
};

export default Header;
