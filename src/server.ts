import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { authRouter } from "./routes";
import adminRouter from "./routes/admin.route";
import agentRouter from "./routes/agent.route";
import countryRouter from "./routes/country.route";
import notFound from "./middlewares/notFound";
import errorMiddleware from "./middlewares/errorMiddleware";
import morgan from "morgan";
import { mongoConnect } from "./config/db.config";
import cookieParser from "cookie-parser";

(async () => {
  await mongoConnect();
  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  console.log(env.ORIGIN);
  app.use(
    cors({
      origin: [env.ORIGIN],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
      credentials: true,
    }),
  );

  app.use(morgan("dev"));

  app.use("/api/v1/country", countryRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/agent", agentRouter);

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

  app.listen(env.PORT, async () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
})();
