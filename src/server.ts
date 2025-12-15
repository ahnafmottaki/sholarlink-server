import express from "express";
import cors from "cors";
import { env } from "./config/env";
import { authRouter } from "./routes";
import countryRouter from "./routes/country.route";
import notFound from "./middlewares/notFound";
import errorMiddleware from "./middlewares/errorMiddleware";
import morgan from "morgan";
import { mongoConnect } from "./config/db.config";
(async () => {
  await mongoConnect();
  const app = express();
  app.use(
    cors({
      origin: env.ORIGIN,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    }),
  );
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api/v1/country", countryRouter);
  app.use("/api/v1/auth", authRouter);
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
