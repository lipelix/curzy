import { MongoClient } from 'mongodb'

export const run = async (processData: Function) => {
  const ratesData = await processData()

  const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@${process.env.MONGO_DB_HOST}?retryWrites=true&w=majority`;
  const dbName = 'curzy-production-cluster';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to mongodb');
  
    const db = client.db(dbName);
    const collection = db.collection('rates');
  
    console.log('Record saving:', JSON.stringify(ratesData))
    await collection.insertOne(ratesData)
    console.log('Record saved:', JSON.stringify(ratesData))
  
  } finally { 
    await client.close();
  }
}
