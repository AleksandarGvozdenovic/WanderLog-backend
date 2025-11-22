
import serverless from "serverless-http";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "../../config/db.js";
import authRoutes from "../../routes/authRoutes.js";
import tripRoutes from "../../routes/tripRoutes.js";
import activityRoutes from "../../routes/activityRoutes.js";
import { notFound, errorHandler } from "../../middleware/errorMiddleware.js";

dotenv.config();

const app = express();


app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/activities", activityRoutes);

app.use(notFound);
app.use(errorHandler);

const startServers = async () => {
  try {
    await connectDB();
    console.log("🔒 Database connection established (Netlify)");
  } catch (error) {
    console.error("Database connection error (Netlify)", error);
  }
};

startServers();

export const handler = serverless(app, {
  request: (req, event) => {
    if (typeof event.body === "string") {
      try {
        req.body = JSON.parse(event.body);
      } catch (err) {
        req.body = {};
      }
    }
  },
});
