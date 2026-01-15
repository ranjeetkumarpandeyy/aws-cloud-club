const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ================= ROOT ROUTE =================
app.get("/", (req, res) => {
  res.send("AWS Cloud Club Backend is Live 🚀");
});

// ================= CHATGPT API ROUTE =================
// Make sure you installed openai:
// npm install openai

const OpenAI = require("openai");
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ================= SERVER START =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`AWS Cloud Club Backend running on port ${PORT}`);
});
