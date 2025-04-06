import {
    type AfkUsers,
    type BoostersUsers,
    type Leaderboard,
    type BotCommands,
    type Settings,
    type Activity,
    type ServerStats,
    // Insert Types
    type InsertLeaderboard,
    type InsertAfkUsers,
    type InsertBoostersUsers,
    type InsertBotCommands,
    type InsertSettings,
    type InsertActivity,
    type InsertServerStats,
} from "@shared/schema";

export interface IStorage {
    // AFK
    addAFK(user: InsertAfkUsers): Promise<AfkUsers>;
    deleteAFK(id: string): Promise<void>;
    // Boosters
    addBooster(user: InsertBoostersUsers): Promise<BoostersUsers>;
    deleteBooster(id: string): Promise<void>;
    // Leaderboard
    addLeaderboardUser(id: string): Leaderboard | undefined;
    updateLeaderboardUser(id: string, user: InsertLeaderboard): void;
    deleteLeaderboardUser(id: string): boolean;
    resetLeaderboard(): Promise<void>;
    // Bot Commands
    getBotCommandsUsed(): Promise<BotCommands[]>;
    updateBotCommandUsed(
        commandID: string,
        command: InsertBotCommands
    ): Promise<void>;
    // Settings
    getSettings(): Promise<Settings>;
    updateSettings(settings: InsertSettings): Promise<void>;
    // Other
    getStats(): Promise<any[]>;
    getRecentActivities(): Promise<Activity[]>;
    getCommandsByCategory(category: string): Promise<any[]>;
    getServerStats(): Promise<ServerStats[]>;
}

export class MemStorage implements IStorage {
    private afkUsers: AfkUsers[] = [];
    private boostersUsers: BoostersUsers[] = [];
    private leaderboard: Leaderboard[] = [];
    private botCommandsUsed: BotCommands[] = [];
    private settings: Settings[] = [];
    private activityId: number;
    private stats: [];
    private activities: Activity[];
    private serverStats: ServerStats[] = [];

    /**
     * Initializes the MemStorage instance.
     *
     * @remarks
     * Sets the initial activity ID to 1, initializes the stats array, and sets the initial bot commands used and server stats. */
    constructor() {
        this.activityId = 1;
        this.stats = [];
        this.botCommandsUsed = [
            {
                id: "1350629730709143667",
                name: "enlarge",
                description: "Enlarge the provided emoji",
                category: "Utilities",
            },
        ];
        this.activities = [];
        this.serverStats = [];
    }

    /**
     * Adds a user to the AFK list.
     * @param user - The user to add to the AFK list. Must contain an id, username, and since properties.
     * @returns The user that was added to the AFK list. */
    async addAFK(user: InsertAfkUsers): Promise<AfkUsers> {
        this.afkUsers.push(user);
        return user;
    }

    /**
     * Deletes a user from the AFK list by ID.
     * @param id The ID of the user to delete from the AFK list.
     * @returns A promise that resolves when the user is deleted. */
    async deleteAFK(id: string): Promise<void> {
        this.afkUsers = this.afkUsers.filter((user) => user.id !== id);
    }

    /**
     * Adds a user to the boosters list.
     * @param user - The user to add to the boosters list. Must contain an id, username, and since properties.
     * @returns The user that was added to the boosters list. */
    async addBooster(user: InsertBoostersUsers): Promise<BoostersUsers> {
        this.boostersUsers.push(user);
        return user;
    }

    /**
     * Deletes a user from the boosters list by ID.
     * @param id The ID of the user to delete from the boosters list.
     * @returns A promise that resolves when the user is deleted. */
    async deleteBooster(id: string): Promise<void> {
        this.boostersUsers = this.boostersUsers.filter(
            (user) => user.id !== id
        );
    }

    /**
     * Adds a user to the leaderboard by ID
     * @param id The ID of the user to add
     * @returns The user that was added, or undefined if the user already exists */
    public addLeaderboardUser(
        id: string,
        data: InsertLeaderboard
    ): Promise<Leaderboard | undefined> {
        const newUser = {
            id,
            username: data.username,
            level: data.level || 1,
            xp: data.xp || 0,
            xpNeeded: data.xpNeeded || 1000,
            rank: this.leaderboard.length + 1,
            colorClass: data.colorClass || "blue",
        };

        // Add the user to the leaderboard
        if (this.leaderboard.find((user) => user.id === id)) {
            // Update the existing user
            this.updateLeaderboardUser(id, newUser);
        } else {
            this.leaderboard.push(newUser);
        }

        this.recalculateRanks();

        const activityId = this.activityId++;
        const activity = {
            id: activityId,
            type: "server-joined",
            username: newUser.username,
            note: `$${newUser.username} joined the server`,
            timestamp: "just now",
        };
        this.activities.unshift(activity);

        return newUser;
    }

    /**
     * Updates a user in the leaderboard by ID
     * @param id The ID of the user to update
     * @param user The new user data
     * @returns A promise that resolves when the user is updated */
    public updateLeaderboardUser(id: string, data: InsertLeaderboard): void {
        const index = this.leaderboard.findIndex((user) => user.id === id);
        if (index === -1) return;

        const user = this.leaderboard[index];
        const updatedUser = {
            ...user,
            ...data,
            id: user.id,
        };

        this.leaderboard[index] = updatedUser;

        if (data.level !== undefined || )
    }

    /**
     * Deletes a user from the leaderboard by ID
     * @param id The ID of the user to delete
     * @returns A promise that resolves when the user is deleted */
    public deleteLeaderboardUser(id: string): boolean {
        const initialLenght = this.leaderboard.length;
        this.leaderboard = this.leaderboard.filter((user) => user.id !== id);

        if (initialLenght !== this.leaderboard.length) {
            this.recalculateRanks();
            return true;
        }

        return false;
    }

    /**
     * Resets the leaderboard back to an empty array
     * @returns A promise that resolves when the leaderboard is reset */
    async resetLeaderboard(): Promise<void> {
        this.leaderboard = [];
    }
}
