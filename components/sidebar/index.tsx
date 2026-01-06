"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu, X, TriangleAlert, SirenIcon } from "lucide-react";

import { useSidebarStore } from "@/store/use-sidebar-store";
import { Button } from "../ui/button";

import React from 'react'

export default function Sidebar() {
  const { isOpen, toggleSidebar } = useSidebarStore();
  const pathname = usePathname();
  const router = useRouter();

  const icons = [
    { icon: SirenIcon, redirect: "/illegal-transhipment" },
    { icon: TriangleAlert, redirect: "/illegal" },
  ];

  return (
    <nav className="fixed z-50 top-5 right-5 flex flex-col items-center bg-indigo-950 text-white rounded-xl shadow-lg py-2 w-12">
      <Button
        variant="ghost"
        onClick={toggleSidebar}
        className="p-3 rounded-lg hover:bg-gray-700"
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      {isOpen && (
        <div className="flex flex-col items-center gap-y-5 mt-4">
          {icons.map(({ icon: Icon, redirect }, index) => (
            <Button
              key={index}
              variant="ghost"
              onClick={() => router.push(redirect)}
              className={`p-3 rounded-lg w-10 h-10 flex items-center justify-center transition-all ${
                pathname === redirect
                  ? "bg-gray-500 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              <Icon size={24} />
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
};


