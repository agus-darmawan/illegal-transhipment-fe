"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SidebarState = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      isOpen: false,
      toggleSidebar: () =>
        set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "sidebar-open",
    }
  )
);
