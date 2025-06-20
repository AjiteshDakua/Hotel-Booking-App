import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhooks from "./controllers/clerkWebhooks.js";

connectDB();

const app = express();
app.use(cors());

// middleware
app.use(express.json());
app.use(clerkMiddleware());

// Api to listen for Clerk webhooks
app.use("/api/clerk", clerkwebhooks)

app.get("/", (req, res) => res.send("API is Working!"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
