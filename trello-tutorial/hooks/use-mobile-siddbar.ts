import { create } from "zustand";

type MiobileSidebarStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useMobileSidebar = create<MiobileSidebarStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
