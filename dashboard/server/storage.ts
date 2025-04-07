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
    Stats,
} from "@shared/schema";

export interface IStorage {
    // AFK
    addAFK(user: InsertAfkUsers): AfkUsers;
    updateAFK(id: string, reason: string): AfkUsers | undefined;
    deleteAFK(id: string): void;
    // Boosters
    addBooster(user: InsertBoostersUsers): BoostersUsers;
    deleteBooster(id: string): void;
    // Leaderboard
    addLeaderboardUser(
        id: string,
        data: InsertLeaderboard
    ): Leaderboard | undefined;
    updateLeaderboardUser(
        id: string,
        data: { [key in keyof InsertLeaderboard]: InsertLeaderboard[key] }
    ): Leaderboard | undefined;
    deleteLeaderboardUser(id: string): boolean;
    resetLeaderboard(): void;
    getLeaderboard(id: string): Leaderboard[];
    // Bot Commands
    getBotCommandsUsed(): BotCommands[];
    updateBotCommandUsed(
        commandID: string,
        data: { [key in keyof InsertBotCommands]: BotCommands[key] }
    ): void;
    // Settings
    getSettings(id: string): Settings | undefined;
    updateSettings(
        id: string,
        settings: { [key in keyof InsertSettings]: InsertSettings[key] }
    ): void;
    // Other
    updateServerStats(
        id: string,
        data: { [key in keyof InsertServerStats]: InsertServerStats[key] }
    ): ServerStats;
    getServerStats(): ServerStats[];
    updateStats(
        id: string,
        data: { [key in keyof InsertServerStats]: InsertServerStats[key] }
    ): Stats | undefined;
    getStats(): Stats[];
    getRecentActivities(): Activity[];
    getCommandsByCategory(category: string): any[];
}

export class MemStorage implements IStorage {
    private afkUsers: AfkUsers[] = [];
    private boostersUsers: BoostersUsers[] = [];
    private leaderboard: Leaderboard[] = [];
    private botCommandsUsed: BotCommands[] = [];
    private settings: Settings[] = [];
    private currentActivityId: number;
    private stats: ServerStats[] = [];
    private serverStats: ServerStats[] = [];
    private activities: Activity[];

    /**
     * Initializes the MemStorage instance.
     *
     * @remarks
     * Sets the initial activity ID to 1, initializes the stats array, and sets the initial bot commands used and server stats. */
    constructor() {
        this.currentActivityId = 1;
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
    public addAFK(user: InsertAfkUsers): AfkUsers {
        this.afkUsers.push(user);

        const activityId = this.currentActivityId++;
        const activity = {
            id: activityId,
            type: "set-afk",
            username: user.username,
            action: "went",
            target: "AFK",
            timestamp: "just now",
        };
        this.activities.push(activity as unknown as Activity);

        return user;
    }

    /**
     * Updates the reason for a user in the AFK list by ID.
     * @param id - The ID of the user to update.
     * @param reason - The new reason for the user being AFK.
     * @returns The updated user data, or undefined if the user is not found. */
    public updateAFK(id: string, reason: string): AfkUsers | undefined {
        const index = this.afkUsers.findIndex((user) => user.id === id);
        if (index !== -1) return undefined;

        const user = this.afkUsers[index];
        const updatedUser = {
            ...user,
            id: user.id,
            reason,
        };

        this.afkUsers[index] = updatedUser;

        const activityId = this.currentActivityId++;
        const activity = {
            id: activityId,
            type: "updated-afk",
            username: updatedUser.username,
            action: "updated reason to",
            target: reason,
            timestamp: "just now",
        };
        this.activities.push(activity as unknown as Activity);

        return updatedUser;
    }

    /**
     * Deletes a user from the AFK list by ID.
     * @param id The ID of the user to delete from the AFK list.
     * @returns A promise that resolves when the user is deleted. */
    public deleteAFK(id: string): boolean {
        const initialLength = this.afkUsers.length;
        this.afkUsers = this.afkUsers.filter((user) => user.id !== id);

        if (initialLength > this.afkUsers.length) return true;

        return false;
    }

    /**
     * Adds a user to the boosters list.
     * @param user - The user to add to the boosters list. Must contain an id, username, and since properties.
     * @returns The user that was added to the boosters list. */
    public addBooster(user: InsertBoostersUsers): BoostersUsers {
        this.boostersUsers.push(user);

        const activityId = this.currentActivityId++;
        const activity = {
            id: activityId,
            type: "set-boosters",
            username: user.username,
            action: "has added a",
            target: "Boost",
            timestamp: "just now",
        };
        this.activities.push(activity as unknown as Activity);

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
    ): Leaderboard {
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

        const activityId = this.currentActivityId++;
        const activity = {
            id: activityId.toString(),
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
    public updateLeaderboardUser(
        id: string,
        data: { [key in keyof InsertLeaderboard]: InsertLeaderboard[key] }
    ): Leaderboard | undefined {
        const index = this.leaderboard.findIndex((user) => user.id === id);
        if (index === -1) return undefined;

        const user = this.leaderboard[index];
        const updatedUser = {
            ...user,
            ...data,
            id: user.id,
        };

        this.leaderboard[index] = updatedUser;

        if (data.level !== undefined && data.xp > user.level!) {
            this.recalculateRanks();

            if (data.level !== undefined && data.level > user.level!) {
                const activityId = this.currentActivityId++;
                const activity = {
                    id: activityId,
                    type: "level-up",
                    username: updatedUser.username,
                    action: "levelled up to",
                    target: `Level ${updatedUser.level}`,
                    timestamp: "just now",
                };
                this.activities.unshift(activity as unknown as Activity);
            }
        }

        return updatedUser;
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
    public resetLeaderboard(): void {
        this.leaderboard = [];
    }

    /**
     * Returns the current leaderboard as an array of `Leaderboard` objects
     * @returns The current leaderboard */
    public getLeaderboard(id: string): Leaderboard[] {
        return this.leaderboard.filter((user) => user.id !== id);
    }

    private recalculateRanks(): void {
        this.leaderboard.sort((a, b) => {
            if (b.level !== a.level) {
                return b.level! - a.level!;
            }

            return b.xp! - a.xp!;
        });

        this.leaderboard.forEach((user, index) => {
            user.rank = index + 1;
        });
    }

    /**
     * Adds a bot command to the list of used commands
     * @param command The command to add to the list. Must contain an id, name, description, and category
     * @returns The command that was added to the list */
    public addBotCommandUsed(command: InsertBotCommands): InsertBotCommands {
        this.botCommandsUsed.push(command);

        return command;
    }

    /**
     * Updates a bot command by ID in the list of used commands.
     * @param id The ID of the command to update
     * @param data The new command data. Must contain the same properties as the `InsertBotCommands` type.
     * @returns The updated command, or undefined if the command is not found */
    updateBotCommandUsed(
        id: string,
        data: { [key in keyof InsertBotCommands]: InsertBotCommands[key] }
    ): BotCommands | undefined {
        const index = this.botCommandsUsed.findIndex(
            (command) => command.id === id
        );
        if (index === -1) return undefined;

        const command = this.botCommandsUsed[index];
        const updatedCommand = {
            ...command,
            ...data,
            id: command.id,
        };

        this.botCommandsUsed[index] = updatedCommand;

        return updatedCommand;
    }

    /**
     * Retrieves the list of bot commands that have been used.
     * @returns An array of `BotCommands` representing the used commands. */
    public getBotCommandsUsed(): BotCommands[] {
        return this.botCommandsUsed;
    }

    /**
     * Updates a server's settings by ID in the list of server settings.
     * @param id The ID of the server to update
     * @param data The new server settings. Must contain the same properties as the `InsertSettings` type.
     * @returns The updated server settings, or undefined if the server is not found */
    public updateSettings(
        id: string,
        data: { [key in keyof InsertSettings]: InsertSettings[key] }
    ): Settings | undefined {
        const index = this.settings.findIndex((server) => server.id === id);
        if (index === -1) return undefined;

        const settings = this.settings[index];
        const updatedSettings = {
            ...data,
            ...settings,
            id: settings.id,
        };

        this.settings[index] = updatedSettings;

        return updatedSettings;
    }

    public getSettings(id: string): Settings | undefined {
        return this.settings.find((server) => server.id === id)!;
    }

    /**
     * Updates a server's stats by ID in the list of server stats.
     * @param id The ID of the server to update
     * @param data The new server stats. Must contain the same properties as the `InsertServerStats` type.
     * @returns The updated server stats, or undefined if the server is not found */
    public updateStats(
        id: string,
        data: { [key in keyof InsertServerStats]: InsertServerStats[key] }
    ): Stats | undefined {
        const index = this.stats.findIndex((server) => server.id === id);
        if (index === -1) return undefined;

        const server = this.stats[index];
        const updatedServer = {
            ...server,
            ...data,
            id: server.id,
        };

        this.stats[index] = updatedServer;

        return updatedServer;
    }

    /**
     * Retrieves the list of server stats.
     * @returns An array of `Stats` representing the server stats. */
    public getStats(): Stats[] {
        return this.stats;
    }

    /**
     * Adds a server to the list of server stats, and adds a new activity to the list of activities
     * @param server The server to add to the list of server stats
     * @returns The server that was added to the list of server stats
     * @private */
    private addServerStats(server: InsertServerStats) {
        this.stats.push(server);

        const activityId = this.currentActivityId++;
        const activity = {
            id: activityId.toString(),
            type: "server-joined",
            username: server.name,
            note: `${server.name} joined the server`,
            timestamp: "just now",
        };
        this.activities.unshift(activity);

        return server;
    }

    /**
     * Updates a server's stats by ID
     * @param id The ID of the server to update
     * @param data The new server stats. Must contain the same properties as the `InsertServerStats` type.
     * @returns The updated server stats, or the created server stats if the server does not exist */
    public updateServerStats(
        id: string,
        data: { [key in keyof InsertServerStats]: InsertServerStats[key] }
    ): ServerStats {
        const index = this.stats.findIndex((server) => server.id === id);
        if (index === -1) {
            this.addServerStats(data as InsertServerStats);

            return data as ServerStats;
        }

        const server = this.stats[index];
        const updatedServer = {
            ...server,
            ...data,
            id: server.id,
        };

        this.stats[index] = updatedServer;

        return updatedServer;
    }

    /**
     * Retrieves the list of server stats
     * @returns An array of `ServerStats` objects, where each object represents the stats of a server */
    public getServerStats(): ServerStats[] {
        return this.stats;
    }

    /**
     * Updates a custom activity by ID
     * @param id The ID of the activity to update
     * @param data The new activity data. Must contain the same properties as the `InsertActivity` type.
     * @returns The updated activity, or undefined if the activity is not found */
    public updateCustomActivity(id: string, data: InsertActivity) {
        const activityId = this.currentActivityId++;
        const activity = {
            ...data,
            activityId: activityId.toString(),
        };
        this.activities.unshift(activity);
    }

    /**
     * Retrieves the list of recent activities, in reverse chronological order.
     * @returns An array of `Activity` objects, where each object represents an activity that has occurred in the server. */
    public getRecentActivities(): Activity[] {
        return this.activities;
    }

    /**
     * Retrieves a list of bot commands filtered by category.
     * @param category The category to filter commands by.
     * @returns An array of `BotCommands` objects that belong to the specified category. */
    public getCommandsByCategory(category: string): any[] {
        return this.botCommandsUsed.filter(
            (command) => command.category === category
        );
    }
}

export const storage = new MemStorage();