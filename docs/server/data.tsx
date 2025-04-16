import * as React from "react";

type Command = {
    category: string;
    name: string;
    description: string;
    usage: string;
    examples: string[];
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

const commands: Command[] = [
    {
        category: "Community",
        name: "afk",
        description: "Manage your AFK status in the server.",
        usage: "/afk [set/check/remove/change-reason] <Reason>",
        examples: [
            "/afk set Gonna eat dinner",
            "/afk check @Moony",
            "/afk remove",
            "/afk change-reason Gonna sleep",
        ],
    },
];

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
                    <li>Check certain information about the server or a user.</li>
                </ul>
            </div>
        ),
    },
];

export { commands, features };
