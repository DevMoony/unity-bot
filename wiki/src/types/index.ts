export interface Command {
    name: string;
    permission: "Admin Only" | "Mod Only" | "Everyone";
    permissionColor: string;
    description: string;
    usage: string;
    arguments?: {
        name: string;
        description: string;
    }[];
    examples?: string[];
}

export interface Feature {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    commands?: {
        name: string;
        description: string;
    }[];
    subFeatures?: {
        name: string;
        defaults_enabled: boolean;
    }[];
    preview?: React.ReactNode;
}
