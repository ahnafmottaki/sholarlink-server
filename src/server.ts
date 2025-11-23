import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
//routers
import agentRouter from "./router/agent.route";
import notFound from "./middlewares/notFound";
import errorMiddleware from "./middlewares/errorMiddleware";
import { run } from "./config/db.config";

const app = express();
const port = process.env.PORT! || 3000;

app.use(
  cors({
    origin: process.env.ORIGIN!,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", agentRouter);

app.get("/", (req, res, next) => {
  res.json({
    success: true,
    message: "health-check success",
  });
});

//not found middleware
app.use(notFound);
// errorMiddleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  run();
});
