import type { Express } from "express";
import { createServer, type Server } from "http";

// Simple content management for the Discord bot documentation.
const documentationSections = import("./data");

export async function registerRoutes(app: Express): Promise<Server> {
    // API endpoint to get commands
    app.get("/api/commands", async (_req, res) => {
        res.json((await documentationSections).commands);
    });

    // API endpoint to get features
    app.get("/api/features", async (_req, res) => {
        res.json((await documentationSections).features);
    });

    // API endpoint to update feature status
    app.put("/api/features/:name/toggle", async (req, res) => {
        const { name } = req.params;
        const feature = (await documentationSections).features.find(
            (f) => f.id.toLowerCase().replace(/\s+/g, "-") === name
        );

        if (feature) {
            res.json({ success: true, feature });
        } else {
            res.status(404).json({
                success: false,
                message: "Feature not found",
            });
        }
    });

    const httpServer = createServer(app);

    return httpServer;
}
