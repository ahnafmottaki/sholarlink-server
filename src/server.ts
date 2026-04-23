import express from "express";
import path from "path";

const app = express();
const port = Number(process.env.PORT ?? 5000);
const publicDir = path.resolve(__dirname, "../public");

app.use(express.static(publicDir));

app.get("*", (_req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`MCQ exam app is running on port ${port}`);
});
