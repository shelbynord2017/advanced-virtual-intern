"use client"

import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/Searchbar";

export default function LayoutContent({ 
    children 
}: { 
    children: React.ReactNode; 
}) {
    const pathname = usePathname();

    const hideSidebar = pathname === "/" || pathname === "/choose-plan";

    return (
        <>
            {!hideSidebar && (
                <>
                    <Sidebar />
                    <Searchbar />
                </>
            )}
            <main>{children}</main>
        </>
    );
}