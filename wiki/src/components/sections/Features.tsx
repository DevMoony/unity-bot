import React, { useEffect } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import FeatureCard from "@/components/ui/FeatureCard";
import { Feature } from "@/types";

const features: Feature[] = [
    {
        id: "auto-moderation",
        title: "Auto Moderation",
        description:
            "Automatically moderate messages and user activity to keep your server safe and clean",
        enabled: true,
        commands: [
            {
                name: "/automod flagged-words [on/off]",
                description: "Block profanity, sexual content, and slurs.",
            },
            {
                name: "/automod spam-messages [on/off]",
                description: "Block messages suspected of spam.",
            },
            {
                name: "/automod mention-spam [on/off]",
                description: "Block messages containing a certain amount of mentions.",
            },
            {
                name: "/automod keyword [keyword]",
                description: "Block a given keyword in the server."
            },
            {
                name: "/automod link [link]",
                description: "Block messages which contain certain links."
            },
            {
                name: "/automod caps [on/off]",
                description: "Block messages which contain a lot of caps."
            }
        ],
        subFeatures: [
            { name: "Flagged Words Filter", defaults_enabled: false },
            { name: "Spam Detection", defaults_enabled: true },
            { name: "Mention Spam Detection", defaults_enabled: true },
            { name: "Keyword Filter", defaults_enabled: false },
            { name: "Link Filter", defaults_enabled: false },
            { name: "Caps Lock Filter", defaults_enabled: false }
        ],
        preview: (
            <div className="bg-[#202225] rounded-md p-4">
                <p className="text-[#B9BBBE] mb-3">
                    The Auto Moderation system helps maintain your server by
                    automatically detecting and acting on potential rule
                    violations. This feature can:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 mb-3">
                    <li>
                        Detect and remove spam messages (repeated text,
                        excessive mentions, etc.)
                    </li>
                    <li>
                        Remove messages containing profanity or links or keywords
                        based on customizable word lists
                    </li>
                    <li>
                        Prevent users from typing in ALL CAPS to maintain chat
                        readability
                    </li>
                    <li>
                        Apply automatic warnings, timeouts or kicks for repeat
                        offenders
                    </li>
                </ul>
                <p className="text-[#B9BBBE]">
                    Each action is fully logged in your designated moderation
                    channel, allowing you to track what actions the bot has
                    taken and why.
                </p>
            </div>
        ),
    },
    {
        id: "welcome-messages",
        title: "Welcome Messages",
        description:
            "Create personalized greetings for new members with customizable messages, images, and more",
        enabled: true,
        commands: [
            {
                name: "/welcome channel #channel",
                description: "Sets the channel for welcome messages",
            },
            {
                name: "/welcome message [message]",
                description: "Sets the welcome message text",
            },
            {
                name: "/welcome image [on/off]",
                description: "Toggles welcome card image generation",
            },
            {
                name: "/welcome test",
                description: "Sends a test welcome message",
            },
        ],
        preview: (
            <>
                <div className="bg-[#202225] rounded-md p-3 mb-3">
                    <div className="flex items-start">
                        <div className="w-10 h-10 rounded-full bg-[#7289DA] flex items-center justify-center mr-3">
                            <i className="fas fa-robot text-white"></i>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <span className="font-medium text-[#7289DA]">
                                    Unity
                                </span>
                                <span className="text-[#72767D] text-xs ml-2">
                                    BOT
                                </span>
                                <span className="text-[#72767D] text-xs ml-2">
                                    Today at 12:34 PM
                                </span>
                            </div>
                            <div className="mt-1 text-[#B9BBBE]">
                                Welcome to the server,{" "}
                                <span className="text-[#7289DA]">@NewUser</span>
                                ! We're glad to have you here. Please check out{" "}
                                <span className="text-[#7289DA]">#rules</span>
                                and{" "}
                                <span className="text-[#7289DA]">
                                    #information
                                </span>{" "}
                                to get started.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#202225] rounded-md p-3 mb-3">
                    <p className="text-[#B9BBBE] mb-2">
                        The Welcome Messages feature allows you to create a
                        warm, personalized greeting for new members. You can:
                    </p>
                    <ul className="list-disc list-inside text-[#B9BBBE] space-y-1 mb-2">
                        <li>
                            Customize the welcome message text and formatting
                        </li>
                        <li>
                            Generate welcome card images with the user's avatar
                            and server info
                        </li>
                        <li>Assign automatic roles to new members</li>
                        <li>
                            Send welcome messages as DMs or in a public channel
                        </li>
                    </ul>
                </div>

                <div className="bg-yellow-900 bg-opacity-20 border border-yellow-700 rounded-md p-3">
                    <div className="flex">
                        <i className="fas fa-info-circle text-yellow-400 mr-2 mt-1"></i>
                        <div className="text-sm text-[#B9BBBE]">
                            <p>
                                You can use these variables in your welcome
                                message:
                            </p>
                            <ul className="list-disc list-inside mt-1">
                                <li>{"{user}"} - Mentions the new user</li>
                                <li>
                                    {"{username}"} - User's name (without @)
                                </li>
                                <li>{"{server}"} - Server name</li>
                                <li>
                                    {"{membercount}"} - Current member count
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        ),
    },
    {
        id: "level-system",
        title: "Level System",
        description:
            "Boost engagement with a customizable XP system that rewards active members with roles and perks",
        enabled: true,
        commands: [
            {
                name: "/levels channel #channel",
                description: "Sets the channel for level up announcements",
            },
            {
                name: "/levels rewards add [level] @role",
                description: "Adds a role reward for reaching a specific level",
            },
            {
                name: "/levels multiplier #channel [1-5]",
                description: "Set XP multipliers for specific channels",
            },
            {
                name: "/levels toggle [card/leaderboard]",
                description: ""
            },
            {
                name: "/rank @user",
                description: "Shows a user's current rank and progress",
            },
        ],
        preview: (
            <div className="bg-[#202225] rounded-md p-4">
                <p className="text-[#B9BBBE] mb-3">
                    The Level System encourages activity and engagement in your
                    server. Members earn XP when they chat, and as they level
                    up, they can earn special roles and perks.
                </p>

                <h5 className="font-medium mb-2 text-white">Key Features:</h5>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-1 mb-3">
                    <li>Customizable XP gain rates and leveling curve</li>
                    <li>Anti-spam protection to prevent XP farming</li>
                    <li>Toggle card or leaderboard display</li>
                    <li>
                        Beautiful rank cards or text showing level, XP, and progress
                    </li>
                    <li>
                        Server leaderboard to encourage friendly competition
                    </li>
                    <li>
                        XP multipliers for specific channels to encourage
                        activity where you want it
                    </li>
                </ul>
            </div>
        ),
    },
    {
        id: "reaction-roles",
        title: "Reaction Roles",
        description:
            "Create self-service role menus where members can assign themselves roles with a simple reaction click",
        enabled: true,
        commands: [
            {
                name: "/reactionrole create",
                description:
                    "Starts the interactive reaction role creation process",
            },
            {
                name: "/reactionrole delete [message ID]",
                description: "Removes a reaction role setup from a message",
            },
            {
                name: "/reactionrole list",
                description: "Lists all active reaction role messages",
            },
            {
                name: "/reactionrole edit [message ID]",
                description: "Edit an existing reaction role message",
            },
        ],
        preview: (
            <div className="bg-[#202225] rounded-md p-4">
                <p className="text-[#B9BBBE] mb-3">
                    Reaction Roles allow members to self-assign roles by
                    clicking on reactions. This feature is perfect for:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-1 mb-3">
                    <li>Color roles to personalize username colors</li>
                    <li>Pronoun selection (he/him, she/her, they/them)</li>
                    <li>Game roles to find others who play the same games</li>
                    <li>Notification roles for event announcements</li>
                    <li>Access roles to opt-in to specific channels</li>
                </ul>

                <p className="text-[#B9BBBE] mb-3">
                    You can create multiple reaction role messages with
                    different styles:
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-1 mb-3">
                    <li>
                        <span className="font-medium">Normal mode:</span>{" "}
                        Members can select any number of roles
                    </li>
                    <li>
                        <span className="font-medium">Unique mode:</span>{" "}
                        Members can only select one role from the set
                    </li>
                    <li>
                        <span className="font-medium">Verified mode:</span>{" "}
                        Members must have a specific role to use the reaction
                        roles
                    </li>
                </ul>

                <div className="bg-[#36393F] rounded p-3 mb-2">
                    <div className="text-white font-medium mb-2">
                        Choose your notification preferences:
                    </div>
                    <div className="flex items-center mb-1">
                        <span className="mr-2">🎮</span>
                        <span className="text-[#B9BBBE]">
                            Game Night Alerts
                        </span>
                    </div>
                    <div className="flex items-center mb-1">
                        <span className="mr-2">🎵</span>
                        <span className="text-[#B9BBBE]">Music Events</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">📢</span>
                        <span className="text-[#B9BBBE]">
                            Server Announcements
                        </span>
                    </div>
                </div>
            </div>
        ),
    },
];

const Features: React.FC = () => {
    const { setActiveSection, toggleMenu } = useSidebar();

    useEffect(() => {
        // Only run this effect once when the component mounts
        setActiveSection("features");

        // Scroll to specific feature if hash is present
        const hash = window.location.hash.substring(1);
        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section id="features" className="mb-12">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700">
                    Features
                </h2>

                <div className="bg-[#2F3136] rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">
                        Discord Bot Features
                    </h3>
                    <p className="text-[#B9BBBE] mb-6">
                        Unity comes with powerful features to enhance your
                        server experience. Here's what you can do with our bot:
                    </p>

                    <div className="space-y-6">
                        {features.map((feature) => (
                            <FeatureCard key={feature.id} feature={feature} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
