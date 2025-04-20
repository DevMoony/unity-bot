import React, { useState, useEffect } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import CommandCard from "@/components/ui/CommandCard";
import { Command } from "@/types";
import { commands } from "@server/data";

const Commands: React.FC = () => {
    const { setActiveSection, toggleMenu } = useSidebar();
    const [activeTab, setActiveTab] = useState("moderation");

    useEffect(() => {
        setActiveSection("commands");

        const hash = window.location.hash.substring(1);
        if (hash && commands[hash as keyof typeof commands]) {
            setActiveTab(hash);
        }
    }, []);

    return (
        <section id="commands" className="mb-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">
                    Commands
                </h2>

                <div className="flex border-b border-gray-700 mb-6 overflow-x-auto">
                    {Object.keys(commands).map((category) => (
                        <button
                            key={category}
                            className={`command-tab py-2 px-4 whitespace-nowrap ${
                                activeTab === category
                                    ? "text-[#7289DA] border-b-2 border-[#7289DA]"
                                    : "text-[#B9BBBE] hover:text-white"
                            }`}
                            onClick={() => setActiveTab(category)}
                        >
                            {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                        </button>
                    ))}
                </div>

                {Object.keys(commands).map((category) => (
                    <div
                        key={category}
                        id={category}
                        className={activeTab === category ? "" : "hidden"}
                    >
                        <div className="bg-[#2F3136] rounded-lg p-6 mb-6">
                            <h3 className="text-xl font-semibold mb-4">
                                {category.charAt(0).toUpperCase() +
                                    category.slice(1)}{" "}
                                Commands
                            </h3>
                            <p className="text-[#B9BBBE] mb-4">
                                {category === "fun" &&
                                    "Commands to add some fun and entertainment to your server."}
                                {category === "utility" &&
                                    "These commands provide helpful utilities for your server."}
                                {category === "moderation" &&
                                    "These commands help you maintain order in your server by managing users and content."}
                                {category === "management" &&
                                    "These commands help you manage the bot and your server as a whole by managing roles, channels, and more."}
                                {category === "owner" &&
                                    "These commands help you manage the bot and your server as a whole by changing settings and more."}
                            </p>

                            <div className="space-y-4">
                                {commands[
                                    category as keyof typeof commands
                                ].map((command, index) => (
                                    <CommandCard
                                        key={index}
                                        command={command}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Commands;