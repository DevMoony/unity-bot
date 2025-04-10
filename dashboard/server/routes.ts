import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { InsertActivity, InsertServerStats } from "@shared/schema";

export function registerRoutes(app: Express): Server {
    // API Routes - Dashboard stats
    app.get("/api/stats", async (req, res) => {
        try {
            const stats = storage.getStats();
            res.json(stats);
        } catch (err) {
            res.status(500).json({ message: "Error fetching stats" });
        }
    });

    // Update stats
    app.post("/api/stats/:id", async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Missing stats-id" });
            }

            const stats = req.body as InsertServerStats;
            const updatedStats = storage.updateServerStats(id, stats);
            
            res.json(updatedStats);
        } catch (err) {
            res.status(500).json({ message: "Error updating stats" });
        }
    });

    // API Routes - Dashboard activities
    app.get("/api/activities", async (req, res) => {
        try {
            const activities = storage.getRecentActivities();
            res.json(activities);
        } catch (err) {
            res.status(500).json({ message: "Error fetching activities" });
        }
    });

    // Add custom activity
    app.post("/api/activities", async (req, res) => {
        try {
            const activity = req.body as InsertActivity;
            const newActivity = storage.updateCustomActivity(activity);
            
            res.json(newActivity);
        } catch (err) {
            res.status(500).json({ message: "Error adding activity" });
        }
    });

    // API Routes - Dashboard server stats
    app.get("/api/server-stats", async (req, res) => {
        try {
            const serverStats = storage.getServerStats();
            res.json(serverStats);
        } catch (err) {
            res.status(500).json({ message: "Error fetching server stats" });
        }
    });

    // Get stats for a specific server
    app.get("/api/server-stats/:guild", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const serverStats = storage.getSpecificStats(guildId);
            res.json(serverStats);
        } catch (err) {
            res.status(500).json({ message: "Error fetching server stats" });
        }
    });

    // Add server stats to the dashboard
    app.post("/api/server-stats/:guild", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const serverStats = storage.updateServerStats(
                guildId,
                req.body as {
                    [key in keyof InsertServerStats]: InsertServerStats[key];
                }
            );
            res.status(201).json(serverStats);
        } catch (err) {
            res.status(500).json({ message: "Error adding server stats" });
        }
    });

    // Discord bot specific routes - Leaderboard CRUD operations
    app.get("/api/leaderboard/:guild", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const leaderboard = storage.getLeaderboard(guildId);
            res.json(leaderboard);
        } catch (err) {
            res.status(500).json({ message: "Error fetching leaderboard" });
        }
    });

    // Add a new user to the leaderboard
    app.post("/api/leaderboard/:guild/:user", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const userId = req.params.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const newUser = storage.addLeaderboardUser(
                `${guildId}:${userId}`,
                req.body.data || {}
            );
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({
                message: "Error adding user to leaderboard",
            });
        }
    });

    // Update a user in the leaderboard
    app.patch("/api/leaderboard/:guild/:user", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const userId = req.params.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const id = `${guildId}:${userId}`;

            const data = { ...req.body, id };
            delete data.id;

            const updatedUser = storage.updateLeaderboardUser(id, data);
            res.json(updatedUser);
        } catch (err) {
            if (
                (err as Error).message &&
                (err as Error).message.includes("not found")
            ) {
                return res
                    .status(404)
                    .json({ message: (err as Error).message });
            }

            res.status(500).json({
                message: "Error updating user on leaderboard",
            });
        }
    });

    // Delete a user from the leaderboard by ID
    app.delete("/api/leaderboard/:guild/:user", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const userId = req.params.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const id = `${guildId}:${userId}`;

            const success = storage.deleteLeaderboardUser(id);
            if (!success) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(204).send();
        } catch (err) {
            res.status(500).json({
                message: "Error deleting user from leaderboard",
            });
        }
    });

    // Reset the leaderboard
    app.delete("/api/leaderboard/:guild", async (req, res) => {
        try {
            const guildId = req.params.guild;

            storage.resetLeaderboard(guildId);
            res.status(204).send();
        } catch (err) {
            res.status(500).json({
                message: "Error resetting leaderboard",
            });
        }
    });

    // Add a new user to the boosters
    app.post("/api/boosters/:guild/:user", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const userId = req.params.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const newUser = storage.addBooster({
                id: `${guildId}:${userId}`,
                username: req.body.username,
                since: Date.now(),
                ...req.body.data,
            });
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({
                message: "Error adding user to boosters",
            });
        }
    });

    // Delete a user from the boosters by ID
    app.delete("/api/boosters/:guild/:user", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const userId = req.params.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const id = `${guildId}:${userId}`;

            const success = storage.deleteBooster(id);
            if (!success) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(204).send();
        } catch (err) {
            res.status(500).json({
                message: "Error deleting user from boosters",
            });
        }
    });

    // Add a new user to the AFK list
    app.post("/api/afk/:user", async (req, res) => {
        try {
            const userId = req.params.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const newUser = storage.addAFK({
                id: userId,
                username: req.body.username,
                since: Date.now(),
                reason: req.body.reason,
            });
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({
                message: "Error adding user to AFK list",
            });
        }
    });

    // Update a user in the AFK list by ID
    app.patch("/api/afk/:user", async (req, res) => {
        try {
            const userId = req.params.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const updatedUser = storage.updateAFK(userId, req.body.reason);
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json({
                message: "Error updating user in AFK list",
            });
        }
    });

    // Delete a user from the AFK list by ID
    app.delete("/api/afk/:user", async (req, res) => {
        try {
            const userId = req.params.user;
            if (!userId) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const success = storage.deleteAFK(userId);
            if (!success) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(204).send();
        } catch (err) {
            res.status(500).json({
                message: "Error deleting user from AFK list",
            });
        }
    });

    // Get all the used commands
    app.get("/api/commands", async (req, res) => {
        try {
            res.status(200).json(storage.getBotCommandsUsed());
        } catch (err) {
            res.status(500).json({
                message: "Error getting commands",
            });
        }
    });

    // Get all the used commands by category
    app.get("/api/commands/:category", async (req, res) => {
        try {
            const category = req.params.category;
            const commands = storage.getCommandsByCategory(category);
            
            res.status(200).json(commands);
        } catch (err) {
            res.status(500).json({
                message: "Error getting commands by category",
            });
        }
    });

    // Add a new command to the used commands
    app.post("/api/commands", async (req, res) => {
        try {
            const command = storage.addBotCommandUsed(req.body);
            res.status(201).json(command);
        } catch (err) {
            res.status(500).json({
                message: "Error adding command",
            });
        }
    });

    // Update a command by ID
    app.patch("/api/commands/:command", async (req, res) => {
        try {
            const id = req.params.command;
            const command = storage.updateBotCommandUsed(id, req.body);

            res.status(200).json(command);
        } catch (err) {
            res.status(500).json({
                message: "Error updating command",
            });
        }
    });

    // Get settings
    app.get("/api/settings/:guild", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const settings = storage.getSettings(guildId);
            if (!settings) {
                return res.status(404).json({ message: "Settings not found" });
            }

            res.status(200).json(settings);
        } catch (err) {
            res.status(500).json({
                message: "Error getting settings",
            });
        }
    });

    // Update settings
    app.patch("/api/settings/:guild", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            const settings = storage.updateSettings(guildId, req.body);
            if (!settings) {
                return res.status(404).json({ message: "Settings not found" });
            }

            res.status(200).json(settings);
        } catch (err) {
            res.status(500).json({
                message: "Error updating settings",
            });
        }
    });

    const httpServer = createServer(app);

    return httpServer;
}
