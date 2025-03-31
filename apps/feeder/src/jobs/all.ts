import { processData as processDataCsob } from "../feeders/csobFeeder";
import { processData as processDataRevolut } from "../feeders/revolutFeeder";
import { processData as processDataAirbankCard } from "../feeders/airbankCardFeeder";
import { processData as processDataAirbankSepa } from "../feeders/airbankSepaFeeder";
import { run } from "./storeRates";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("🚀 Starting feeder jobs...");
    await run(processDataCsob);
    await run(processDataRevolut);
    await run(processDataAirbankCard);
    await run(processDataAirbankSepa);
    console.log("✅ All jobs done");
    res.status(200).send("All jobs done");
  } catch (err) {
    console.error("❌ Error in jobs:", err);
    if (err instanceof Error) {
      res.status(400).send(err.message);
    } else {
      res.status(400).send("Unknown error");
    }
  }
});

export default router;
