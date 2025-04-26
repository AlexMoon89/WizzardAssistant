import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoints for user preferences
  app.get("/api/preferences/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const preferences = await storage.getUserPreferences(id);
    if (!preferences) {
      return res.status(404).json({ message: "Preferences not found" });
    }

    res.json(preferences);
  });

  app.post("/api/preferences", async (req, res) => {
    try {
      const newPrefs = await storage.createUserPreferences(req.body);
      res.status(201).json(newPrefs);
    } catch (error) {
      res.status(400).json({ message: "Invalid preferences data" });
    }
  });

  app.patch("/api/preferences/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      const updatedPrefs = await storage.updateUserPreferences(id, req.body);
      if (!updatedPrefs) {
        return res.status(404).json({ message: "Preferences not found" });
      }
      res.json(updatedPrefs);
    } catch (error) {
      res.status(400).json({ message: "Invalid update data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
