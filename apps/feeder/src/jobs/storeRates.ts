import { MongoClient } from 'mongodb'

export const run = async (processData: Function) => {
  if (!process.env.MONGO_DB_URI) {
    throw new Error("Please provide a valid MongoDB URI to connect to the database");
  }
  if (!process.env.MONGO_DB_NAME) {
    throw new Error("Please provide a valid database name");
  }
  const ratesData = await processData()  
  const client = new MongoClient(process.env.MONGO_DB_URI);

  try {
    console.log("🔌 Connecting to db...");
    await client.connect();
    console.log("🤝 Connected to db");
  
    const db = client.db(process.env.MONGO_DB_NAME);
    const collection = db.collection('rates');
  
    console.log('Record saving:', JSON.stringify(ratesData))
    await collection.insertOne(ratesData)
    console.log('Record saved:', JSON.stringify(ratesData))
  
  } finally { 
    await client.close();
  }
}
