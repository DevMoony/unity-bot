// Dashboard types
export interface Stat {
    id: string;
    name: string;
    value: number;
}

// Leaderboard types
export interface Leaderboard {
    id: string;
    username: string;
    avatar?: string;
    level: number;
    xp: number;
    xpNeeded: number;
    rank: number;
    colorClass: string;
}

// Booster types
export interface Booster {
    id: string;
    username: string;
    colorClass: string;
    since: number;
    avatar?: string;
    tier: number;
    perks: string[];
}

// AFK types
export interface AFK {
    id: string;
    username: string;
    since: number;
    reason: string;
}

// Bot commands types
export interface BotCommands {
    id: string;
    name: string;
    description: string;
    category: string;
    used: number;
    examples: string[];
    usage: string;
}

export type ActivityType = 
    | 'set-afk'
    | 'updated-afk'
    | 'set-boosters'
    | 'server-joined'
    | 'level-up'
    | 'left-server'
    | 'server-stat-added';

export interface Activity {
    id: string;
    type: ActivityType;
    username?: string;
    action?: string;
    note?: string;
    target?: string;
    timestamp: string;
}

export interface ServerStats {
    id: string;
    name: string;
    memberCount: number;
    features: string[];
}

export interface Settings {
    id: string;
    joinRoleEnabled: boolean;
    invitesEnabled: boolean;
    reactionRoleEnabled: boolean;
    ticketEnabled: boolean;
    automodEnabled: boolean;
    // Channels
    joinChannel: string;
    leaveChannel: string;
    autoReactionSystemChannel: string;
    reportLogChannel: string;
    reviewSendChannel: string;
    suggestionSendChannel: string;
    ticketForumChannel: string;
    giveawayChannel: string;
    pollChannel: string;
    // For transcripts as well
    ticketLogChannel: string;
    automodLogChannel: string;
    punishmentLogChannel: string;
    //
    reactionRoleMessageId: string;
    starboardMessageId: string;
}