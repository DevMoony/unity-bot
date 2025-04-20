export type CategoryID = "fun" | "utility" | "moderation" | "management" | "owner";
type CategoryTitle = "Fun" | "Utility" | "Moderation" | "Management" | "Owner";
type PermissionOnly = "Owner Only" | "Admin Only" | "Mod Only" | "Everyone";

export interface Command {
    category: CategoryTitle;
    name: string;
    permission: PermissionOnly;
    permissionColor: string;
    description: string;
    usage: string[];
    arguments?: string[];
    examples?: string[];
}

export interface Feature {
    id: CategoryID;
    title: CategoryTitle;
    description: string;
    enabled: boolean;
    commands?: {
        name: string;
        description: string;
    }[];
    subFeatures?: {
        name: string;
        enabled: boolean;
    }[];
    preview?: React.ReactNode;
}

export interface ConfigSection {
    id: string;
    title: string;
    description: string;
    content: React.ReactNode;
}
