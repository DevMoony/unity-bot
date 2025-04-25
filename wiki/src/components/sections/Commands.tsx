import React, { useState, useEffect } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import CommandCard from "@/components/ui/CommandCard";
import { Command } from "@/types";
import { arrToStrNextLine } from "@/lib/utils";

const commandData: Record<string, Command[]> = {
    community: [
        {
            name: "/afk",
            description: "Manage your AFK status in the server",
            permission: "Everyone",
            permissionColor: "discord-green",
            usage: arrToStrNextLine([
                "/afk set [Reason]",
                "/afk check [User]",
                "/afk remove",
                "/afk change-reason [Reason]",
            ]),
            examples: [
                "/afk set Gonna eat dinner",
                "/afk check @Moony",
                "/afk remove",
                "/afk change-reason Gonna sleep",
            ],
            arguments: [
                {
                    name: "Reason",
                    description: "The reason for your AFK status."
                },
                {
                    name: "User",
                    description: "The user to check the AFK status of."
                }
            ]
        },
    ],
    utility: [
        {
            name: "/botinfo",
            description: "Get information about the bot.",
            permission: "Everyone",
            permissionColor: "discord-green",
            usage: "/botinfo",
            examples: ["/botinfo"],
        }
    ],
    misc: [
        {
            name: "/boosters",
            description: "View the boosters of the server.",
            permission: "Everyone",
            permissionColor: "discord-green",
            usage: arrToStrNextLine([
                "/boosters overview",
                "/boosters list",
                "/boosters check <User>",
            ]),
            examples: [
                "/boosters overview",
                "/boosters list",
                "/boosters check @Moony",
            ],
            arguments: [
                {
                    name: "User",
                    description: "The user to check the boosters of."
                }
            ],
        }
    ]
};
