import * as React from "react";

type Command = {
    category: string;
    name: string;
    description: string;
    usage: string[];
    examples: string[];
    sub_commands?: string[];
    arguments?: string[];
};

type Feature = {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    commands: Command[];
    sub_features?: SubFeature[];
    preview: React.JSX.Element;
};

type SubFeature = {
    name: string;
    enabled: boolean;
};

const CommunityCommands: Command[] = [
    {
        category: "Community",
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
        sub_commands: [
            "set — Set your AFK status in the server.",
            "check — Check your or someone else's AFK status in the server.",
            "remove — Remove your AFK status from the server.",
            "change-reason — Change the reason for your AFK status in the server.",
        ],
        arguments: [
            "Reason — The reason for your AFK status.",
            "User — The user to check the AFK status of.",
        ],
    },
    {
        category: "Community",
        name: "botinfo",
        description: "Get information about the bot.",
        usage: ["/botinfo"],
        examples: ["/botinfo"],
    },
];

const MiscCommands: Command[] = [
    {
        category: "Miscellaneous",
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
        sub_commands: [
            "overview — View the overall status of the boosters of the server.",
            "list — View a list of members who are boosting the server.",
            "check — Check if a member is boosting the server.",
        ],
        arguments: [
            "User — The user to check the boosters of.",
        ],
    },
];

const commands: Command[] = [...CommunityCommands];

const features: Feature[] = [
    {
        id: "community",
        title: "Community",
        description: "Features for the community.",
        enabled: true,
        commands: commands.filter((cmd) => cmd.category === "Community"),
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
];

export { commands, features };
