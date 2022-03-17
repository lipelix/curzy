import express from 'express'
import { MongoClient } from 'mongodb'

export const initializeDbConnection = async (app: express.Application) => {
  let client;
  try{
      const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@${process.env.MONGO_DB_HOST}?retryWrites=true&w=majority`;
      const dbName = 'curzy-production-cluster';

      console.log('Connection to db');
      client = await MongoClient.connect(url);
      console.log('Connected to db:', process.env.MONGO_DB_HOST);

      app.locals.db = client.db(dbName);
  }
  catch(err){
    console.error(err);
    if (client) client.close();
  }
}