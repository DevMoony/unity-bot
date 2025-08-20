import React from "react";
import { Link, useLocation } from "wouter";
import { useSidebar } from "@/hooks/use-sidebar";

interface MenuLink {
    href: string;
    label: string;
}

interface MenuItem {
    id: string;
    icon: string;
    label: string;
    href?: string;
    subMenu?: MenuLink[];
}

const menuItems: MenuItem[] = [
    {
        id: "getting-started",
        icon: "fas fa-home",
        label: "Getting Started",
        href: "/",
    },
    {
        id: "commands",
        icon: "fas fa-terminal",
        label: "Commands",
        href: "/commands",
        subMenu: [
            { href: "/commands#community", label: "Community" },
            { href: "/commands#utility", label: "Utility" },
            { href: "/commands#moderation", label: "Moderation" },
            { href: "/commands#management", label: "Management" },
        ],
    },
    {
        id: "features",
        icon: "fas fa-cogs",
        label: "Features",
        href: "/features",
        subMenu: [
            { href: "/features#join-role", label: "Join Role" },
            { href: "/features#join-to-create", label: "Join To Create" },
            { href: "/features#reaction-roles", label: "Reaction Roles" },
            {
                href: "/features#auto-reaction-system",
                label: "Auto Reaction System",
            },
            { href: "/features#reviews", label: "Reviews" },
            { href: "/features#suggestions", label: "Suggestions" },
            { href: "/features#tickets", label: "Tickets" },
            { href: "/features#reputation", label: "Reputation" },
            { href: "/features#invite-rewards", label: "Invite Rewards" },
            { href: "/features#messages-tracker", label: "Messages Tracker" },
            { href: "/features#text-leveling", label: "Text Leveling" },
            { href: "/features#voice-leveling", label: "Voice Leveling" },
            { href: "/features#auto-moderation", label: "Auto Moderation" },
            { href: "/features#leaderboards", label: "Leaderboards" },
        ],
    },
    {
        id: "modules",
        icon: "fas fa-sliders-h",
        label: "Modules",
        href: "/modules",
        subMenu: [
            { href: "/modules#community", label: "Community" },
            { href: "/modules#utility", label: "Utility" },
            { href: "/modules#moderation", label: "Moderation" },
            { href: "/modules#management", label: "Management" },
        ],
    },
    {
        id: "support",
        icon: "fas fa-headset",
        label: "Support",
        href: "/support",
    },
];

const Sidebar: React.FC = () => {
    const {
        isOpen,
        toggleSidebar,
        activeSection,
        setActiveSection,
        expandedMenus,
        toggleMenu,
    } = useSidebar();
    const [location, setLocation] = useLocation();

    const handleMenuItemClick = (item: MenuItem) => {
        setActiveSection(item.id);

        if (item.subMenu) {
            toggleMenu(item.id);
        }

        if (item.href) {
            setLocation(item.href);
        }

        // Close sidebar on mobile after click
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    };

    return (
        <aside
            className={`bg-[#202225] w-full md:w-64 flex-shrink-0 md:sticky md:top-0 md:h-screen overflow-y-auto transition-all duration-300 transform ${
                isOpen
                    ? "md:translate-x-0"
                    : "-translate-x-full md:translate-x-0"
            } z-40 fixed md:relative inset-0 h-full`}
        >
            {/* Bot info section */}
            <div className="p-4 border-b border-gray-700 flex items-center">
                <div className="w-10 h-10 rounded-full bg-[#7289DA] flex items-center justify-center">
                    <i className="fas fa-robot text-white"></i>
                </div>
                <div className="ml-3">
                    <h1 className="font-bold text-lg">DiscordBot</h1>
                    <p className="text-[#B9BBBE] text-sm">Documentation</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="py-4">
                {menuItems.map((item) => (
                    <div className="px-4 mb-2" key={item.id}>
                        <button
                            className={`flex items-center justify-between w-full text-left py-2 px-2 ${
                                activeSection === item.id
                                    ? "text-white bg-[#2F3136] rounded"
                                    : "text-[#B9BBBE] hover:text-white hover:bg-[#2F3136] rounded"
                            } transition duration-150`}
                            onClick={() => handleMenuItemClick(item)}
                        >
                            <div className="flex items-center">
                                <i className={`${item.icon} w-5`}></i>
                                <span className="ml-2">{item.label}</span>
                            </div>
                            {item.subMenu && (
                                <i
                                    className={`fas fa-chevron-right text-xs transition-transform duration-200 ${
                                        expandedMenus.includes(item.id)
                                            ? "transform rotate-90"
                                            : ""
                                    }`}
                                ></i>
                            )}
                        </button>

                        {item.subMenu && (
                            <div
                                className={`submenu pl-6 mt-1 space-y-1 ${
                                    expandedMenus.includes(item.id)
                                        ? ""
                                        : "hidden"
                                }`}
                            >
                                {item.subMenu.map((subItem, index) => (
                                    <Link
                                        key={index}
                                        href={subItem.href}
                                        className="block py-1 px-3 rounded text-[#B9BBBE] hover:text-white hover:bg-[#2F3136] transition duration-150"
                                    >
                                        {subItem.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {/* Status indicator */}
            <div className="mt-auto p-4 border-t border-gray-700">
                <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[#57F287]"></div>
                    <span className="ml-2 text-[#B9BBBE] text-sm">
                        Bot Online
                    </span>
                </div>
                <div className="text-xs text-[#72767D] mt-1">
                    v1.5.2 - Last updated: 2 days ago
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;