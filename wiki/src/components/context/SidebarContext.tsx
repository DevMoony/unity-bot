import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    isOpen: boolean;
    toggleSidebar: () => void;
    activeSection: string;
    setActiveSection: (section: string) => void;
    expandedMenus: string[];
    toggleMenu: (menuId: string) => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isOpen: false,
    toggleSidebar: () => {},
    activeSection: "getting-started",
    setActiveSection: () => {},
    expandedMenus: [],
    toggleMenu: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
    const [activeSection, setActiveSection] = useState("getting-started");
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const toggleMenu = (menuId: string) => {
        if (expandedMenus.includes(menuId)) {
            setExpandedMenus(expandedMenus.filter((id) => id !== menuId));
        } else {
            setExpandedMenus([...expandedMenus, menuId]);
        }
    };

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                toggleSidebar,
                activeSection,
                setActiveSection,
                expandedMenus,
                toggleMenu,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};
