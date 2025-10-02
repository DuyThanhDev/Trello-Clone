"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-siddbar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";

export const MobileSidebar = () => {

    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const onOpen = useMobileSidebar((state) => state.onOpen);
    const onClose = useMobileSidebar((state) => state.onClose);
    const isOpen = useMobileSidebar((state) => state.isOpen);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose]);

    if (!isMounted) {
        return null;
    }

    return (
        <>
        <Button
            onClick={onOpen}
            variant="ghost"
            size="sm"
            className="block md:hidden mr-2"
        >
            <Menu className="w-4 h-4" />
        </Button>
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent>
                <Sidebar 
                    storageKey="t-sidebar-mobile-state"
                />
            </SheetContent>
        </Sheet>
        </>
    );
};
