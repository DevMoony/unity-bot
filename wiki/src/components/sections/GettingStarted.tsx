import React, { useEffect } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import { Link } from "wouter";

const GettingStarted: React.FC = () => {
    const { setActiveSection } = useSidebar();

    useEffect(() => {
        // Only run this effect once when the component mounts
        setActiveSection("getting-started");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section id="getting-started" className="mb-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">
                    Getting Started
                </h2>

                <div className="bg-[#2F3136] rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Welcome to Unity
                    </h3>
                    <p className="text-[#B9BBBE] mb-4">
                        Unity is a powerful, multipurpose bot designed to
                        enhance your Discord server with moderation tools, fun
                        commands, utilities, and customizable features.
                    </p>

                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-[#202225] rounded-lg p-4 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-[#7289DA] flex items-center justify-center mb-3">
                                <i className="fas fa-plus text-white"></i>
                            </div>
                            <h4 className="font-medium mb-2">Add to Server</h4>
                            <p className="text-[#B9BBBE] text-sm mb-3">
                                Invite the bot to your Discord server
                            </p>
                            <a
                                href="#"
                                className="text-[#7289DA] hover:underline text-sm"
                            >
                                Invite Link
                            </a>
                        </div>

                        <div className="bg-[#202225] rounded-lg p-4 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-[#7289DA] flex items-center justify-center mb-3">
                                <i className="fas fa-book text-white"></i>
                            </div>
                            <h4 className="font-medium mb-2">Read Docs</h4>
                            <p className="text-[#B9BBBE] text-sm mb-3">
                                Learn about commands and features
                            </p>
                            <Link
                                to="/commands"
                                className="text-[#7289DA] hover:underline text-sm"
                            >
                                View Commands
                            </Link>
                        </div>

                        <div className="bg-[#202225] rounded-lg p-4 flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full bg-[#7289DA] flex items-center justify-center mb-3">
                                <i className="fas fa-cog text-white"></i>
                            </div>
                            <h4 className="font-medium mb-2">Configure</h4>
                            <p className="text-[#B9BBBE] text-sm mb-3">
                                Customize the bot for your server
                            </p>
                            <a
                                href="https://devmoony.github.io/dashboard"
                                className="text-[#7289DA] hover:underline text-sm"
                            >
                                Dashboard
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-[#2F3136] rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Quick Start</h3>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2">1. Invite the bot</h4>
                        <p className="text-[#B9BBBE]">
                            Click the invite link above and select your server
                            from the dropdown menu. Make sure to authorize all
                            the requested permissions for full functionality.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2">
                            2. Set up permissions
                        </h4>
                        <p className="text-[#B9BBBE]">
                            The bot uses Discord's slash commands system, which
                            requires the{" "}
                            <span className="text-white font-medium">
                                applications.commands
                            </span>{" "}
                            scope. Ensure the bot has the necessary permissions
                            based on which features you plan to use.
                        </p>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2">
                            3. Use the help command
                        </h4>
                        <p className="text-[#B9BBBE]">
                            Type{" "}
                            <code className="bg-[#202225] px-2 py-1 rounded">
                                /help
                            </code>{" "}
                            to see a list of available commands. All of our
                            commands use Discord's slash command system for easy
                            discovery and use.
                        </p>

                        <div className="bg-[#202225] rounded-lg p-3 mt-3">
                            <div className="flex items-start">
                                <div className="w-8 h-8 rounded-full bg-[#7289DA] flex items-center justify-center mr-3">
                                    <i className="fas fa-question text-white text-xs"></i>
                                </div>
                                <div>
                                    <p className="text-sm text-[#B9BBBE]">
                                        Start typing{" "}
                                        <span className="text-white">/</span> in
                                        any channel to see all available
                                        commands. The Discord slash command
                                        interface will show you the required and
                                        optional parameters for each command.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <h4 className="font-medium mb-2">
                            4. Configure the bot
                        </h4>
                        <p className="text-[#B9BBBE]">
                            Use the{" "}
                            <code className="bg-[#202225] px-2 py-1 rounded">
                                /config
                            </code>{" "}
                            command to customize the bot for your server's
                            needs. Setup channels, permissions, and enable or
                            disable features as needed.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-medium mb-2">5. Get support</h4>
                        <p className="text-[#B9BBBE]">
                            If you need help, use{" "}
                            <code className="bg-[#202225] px-2 py-1 rounded">
                                /support
                            </code>{" "}
                            to get a link to our support server or check the{" "}
                            <Link
                                to="/support"
                                className="text-[#7289DA] hover:underline"
                            >
                                Support
                            </Link>{" "}
                            section of this documentation.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GettingStarted;
