import express from "express";
import { initializeDbConnection } from "./db/init";
import rates from "./api/rates";
import fees from "./api/fees";
import allJobsRouter from "./jobs/all";

const app = express();
const PORT = process.env.PORT;

(async (app: express.Application) => {
  await initializeDbConnection(app);
})(app);

app.use("/api/rates", rates);
app.use("/api/fees", fees);
app.use("/jobs/all", allJobsRouter);

app.get("/", async (req, res) => {
  res.send("Welcome on Curzy!");
});

app.listen(PORT, () => {
  console.log(`🚀 Curzy app listening on PORT ${PORT}`);
  console.log(
    `🚀 Deployment metadata: ${JSON.stringify({
      GAE_APPLICATION: process.env.GAE_APPLICATION,
      GAE_DEPLOYMENT_ID: process.env.GAE_DEPLOYMENT_ID,
      GAE_ENV: process.env.GAE_ENV,
      GAE_INSTANCE: process.env.GAE_INSTANCE,
      GAE_MEMORY_MB: process.env.GAE_MEMORY_MB,
      GAE_RUNTIME: process.env.GAE_RUNTIME,
      GAE_SERVICE: process.env.GAE_SERVICE,
      GAE_VERSION: process.env.GAE_VERSION,
      GOOGLE_CLOUD_PROJECT: process.env.GOOGLE_CLOUD_PROJECT,
      NODE_ENV: process.env.NODE_ENV,
    })}`
  );
});
