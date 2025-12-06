import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeStartupIdea } from "./openai";
import { insertValidationSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/validate", async (req, res) => {
    try {
      const parsed = insertValidationSchema.safeParse(req.body);
      
      if (!parsed.success) {
        return res.status(400).json({ 
          error: "Invalid request", 
          details: parsed.error.errors 
        });
      }

      const { idea } = parsed.data;
      
      const report = await analyzeStartupIdea(idea);
      
      await storage.createReport(report);
      
      res.json(report);
    } catch (error: any) {
      console.error("Validation error:", error);
      
      if (error.message?.includes("API key")) {
        return res.status(503).json({ 
          error: "OpenAI API key is not configured. Please add your OPENAI_API_KEY to use this feature." 
        });
      }
      
      res.status(500).json({ 
        error: "Failed to analyze idea. Please try again." 
      });
    }
  });

  app.get("/api/reports", async (req, res) => {
    try {
      const reports = await storage.getAllReports();
      res.json(reports);
    } catch (error) {
      console.error("Error fetching reports:", error);
      res.status(500).json({ error: "Failed to fetch reports" });
    }
  });

  app.get("/api/reports/:id", async (req, res) => {
    try {
      const report = await storage.getReport(req.params.id);
      if (!report) {
        return res.status(404).json({ error: "Report not found" });
      }
      res.json(report);
    } catch (error) {
      console.error("Error fetching report:", error);
      res.status(500).json({ error: "Failed to fetch report" });
    }
  });

  return httpServer;
}
