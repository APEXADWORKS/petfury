import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI securely server-side with User-Agent for telemetry
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // Secure server-side API endpoint for the AI Pet Coach
  app.post("/api/pet-coach", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const systemInstruction = 
        `You are Dr. Amelia, a compassionate and expert AI Pet Coach & Veterinary Consultant. ` +
        `Your signature traits are warmth, deep diagnostic intuition (with standard safety disclaimers), and precise step-by-step training guidance. ` +
        `Answer the pet parent's questions comprehensively under these guidelines: ` +
        `1. Structure your advice clearly using headers, bullet points, and helpful bold text. ` +
        `2. For health inquiries: give clear possibilities, explain what symptoms to check for, and provide immediate home-comfort actions. Always append a concise, professional notification reminding them that this advice is educational and a Vet Clinic visit is paramount if symptoms deteriorate. ` +
        `3. For training inquiries: give structured commands, positive reinforcement schedules, and practical corrections. ` +
        `4. Remain constructive, encouraging, and highly knowledgeable.`;

      // Build chat prompt sequence from history
      let contents = [];
      if (history && Array.isArray(history)) {
        contents = history.map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        }));
      }
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({ text: response.text || "I was unable to formulate a response. Please rephrase your query." });
    } catch (error: any) {
      console.error("Gemini API Error Server-Side:", error);
      return res.status(500).json({ 
        error: error?.message || "My diagnostic circuits encountered a temporal glitch. Please verify your internet connection." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
