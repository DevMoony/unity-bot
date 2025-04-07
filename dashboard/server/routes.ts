import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
    // API Routes - Dashboard stats
    app.get("/api/stats", async (req, res) => {
        try {
            const stats = storage.getStats();
            res.json(stats);
        } catch (err) {
            res.status(500).json({ message: "Error fetching stats" });
        }
    });

    // Discord bot specific routes - Leaderboard CRUD operations
    app.get("/api/leaderboard/:guild", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }
            
            const leaderboard = storage.getLeaderboard();
            res.json(leaderboard);
        } catch (err) {
            res.status(500).json({ message: "Error fetching leaderboard" });
        }
    });

    // ID includes guild ID + user ID
    app.post("/api/leaderboard/:guild", async (req, res) => {
        try {
            const guildId = req.params.guild;
            if (!guildId) {
                return res.status(400).json({ message: "Missing guild-id" });
            }

            if (!req.body.id) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const newUser = storage.addLeaderboardUser(
                req.body.id,
                req.body.data || {}
            );
            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({
                message: "Error adding user to leaderboard",
            });
        }
    });

    app.patch("/api/leaderboard/:id", async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Missing user-id" });
            }

            const data = { ...req.body };
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
    app.delete("/api/leaderboard/:id", async (req, res) => {
        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({ message: "Missing user-id" });
            }

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

    app.delete("/api/leaderboard/:guildid", async (req, res) => {
        try {
            storage.resetLeaderboard();
            res.status(204).send();
        } catch (err) {
            res.status(500).json({
                message: "Error resetting leaderboard",
            });
        }
    });
}
