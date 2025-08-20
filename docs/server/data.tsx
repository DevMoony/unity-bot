import * as React from "react";
import { CategoryID, Command, Feature } from "@/types";

type SubFeature = {
    name: string;
    enabled: boolean;
};

const CommunityCommands: Command[] = [
    {
        category: "Utility",
        name: "afk",
        description: "Manage your AFK status in the server.",
        usage: [
            "/afk set [Reason]",
            "/afk check [User]",
            "/afk remove",
            "/afk change-reason [Reason]",
        ],
        examples: [
            "/afk set Gonna eat dinner",
            "/afk check @Moony",
            "/afk remove",
            "/afk change-reason Gonna sleep",
        ],
        arguments: [
            "Reason — The reason for your AFK status.",
            "User — The user to check the AFK status of.",
        ],
        permission: "Everyone",
        permissionColor: "discord-green",
    },
    {
        category: "Utility",
        name: "botinfo",
        description: "Get information about the bot.",
        usage: ["/botinfo"],
        examples: ["/botinfo"],
        arguments: [],
        permission: "Everyone",
        permissionColor: "discord-green",
    },
];

const MiscCommands: Command[] = [
    {
        category: "Utility",
        name: "boosters",
        description: "View the boosters of the server.",
        usage: [
            "/boosters overview",
            "/boosters list",
            "/boosters check <User>",
        ],
        examples: [
            "/boosters overview",
            "/boosters list",
            "/boosters check @Moony",
        ],
        arguments: ["User — The user to check the boosters of."],
        permission: "Everyone",
        permissionColor: "discord-green",
    },
];

const ModCommands: Command[] = [
    {
        category: "Moderation",
        name: "punishments",
        description: "View the punishments of a member.",
        usage: ["/punishments <User>"],
        examples: ["/punishments @Moony"],
        arguments: ["User — The user to check the punishments of."],
        permission: "Mod Only",
        permissionColor: "discord-green",
    }
];

const AdminCommands: Command[] = [];

const OwnerCommands: Command[] = [];

const commands = {
    fun: [...CommunityCommands],
    utility: [...MiscCommands],
    moderation: [...ModCommands],
    management: [...AdminCommands],
    owner: [...OwnerCommands],
};

const features: Feature[] = [
    {
        id: "fun",
        title: "Fun",
        description: "All the features for fun, this is mainly about games and commands/features which may be marked as fun.",
        enabled: true,
        commands: commands.fun,
        preview: (
            <div className="bg-[#202225] rounded-md p-4">
                <p className="text-[#B9BBBE] mb-3">
                    The fun feature is a collection of commands that are fun to use.
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 mb-3">
                    <li>Play a game with the bot or play a game with another user.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "utility",
        title: "Utility",
        description: "Features for the community.",
        enabled: true,
        commands: commands.utility,
        preview: (
            <div className="bg-[#202225] rounded-md p-4">
                <p className="text-[#B9BBBE] mb-3">
                    The community feature is a collection of commands that are
                    useful for the community.
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 mb-3">
                    <li>
                        Check certain information about the server or a user.
                    </li>
                </ul>
            </div>
        ),
    },
    {
        id: "moderation",
        title: "Moderation",
        description: "Features for moderation.",
        enabled: true,
        commands: commands.moderation,
        preview: (
            <div className="bg-[#202225] rounded-md p-4">
                <p className="text-[#B9BBBE] mb-3">
                    The moderation feature is a collection of commands that are
                    useful for maintaining order for members and channels in the server.
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 mb-3">
                    <li>Manage the server or a user.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "management",
        title: "Management",
        description: "Features for management.",
        enabled: true,
        commands: commands.management,
        preview: (
            <div className="bg-[#202225] rounded-md p-4">
                <p className="text-[#B9BBBE] mb-3">
                    The management feature is a collection of commands that are
                    useful for managing the bot.
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 mb-3">
                    <li>Manage the bot or a user.</li>
                </ul>
            </div>
        ),
    },
    {
        id: "owner",
        title: "Owner",
        description: "Features for the owner.",
        enabled: true,
        commands: commands.owner,
        preview: (
            <div className="bg-[#202225] rounded-md p-4">
                <p className="text-[#B9BBBE] mb-3">
                    The owner feature is a collection of commands that are
                    useful for the owner of the bot.
                </p>
                <ul className="list-disc list-inside text-[#B9BBBE] space-y-2 mb-3">
                    <li>Manage the bot or a user.</li>
                </ul>
            </div>
        ),
    }
];

export { commands, features };
