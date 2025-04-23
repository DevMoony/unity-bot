import React from "react";
import Sidebar from "./Sidebar";
import { useSidebar } from "@/hooks/use-sidebar";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { isOpen, toggleSidebar } = useSidebar();

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />

            {/* Mobile sidebar toggle button */}
            <button
                onClick={toggleSidebar}
                className="md:hidden fixed bottom-5 right-5 z-50 bg-[#5865F2] rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
            >
                <i className="fas fa-bars"></i>
            </button>

            <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
    );
};

export default Layout;
