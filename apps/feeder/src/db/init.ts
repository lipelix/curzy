import express from "express";
import { MongoClient } from "mongodb";

export const initializeDbConnection = async (app: express.Application) => {
  let client;
  try {
    if (!process.env.MONGO_DB_URI) {
      throw new Error("Please provide a valid MongoDB URI");
    }
    const dbName = "curzy-production-cluster";

    console.log("🔌 Connecting to db...");
    client = await MongoClient.connect(process.env.MONGO_DB_URI);
    console.log("🤝 Connected to db");

    app.locals.db = client.db(dbName);
    const collection = app.locals.db.collection("rates");
    collection.createIndex({ institution: 1, paymentType: 1, _id: -1 });
  } catch (err) {
    console.error(err);
    if (client) client.close();
  }
};
