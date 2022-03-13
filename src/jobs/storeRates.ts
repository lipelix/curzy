import { MongoClient } from 'mongodb'

export const run = async (processData: Function, institution: Institutions) => {
  const ratesData = await processData()
  const storeData = {
    ...ratesData,
    'institution': institution
  }

  const url = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@${process.env.MONGO_DB_HOST}?retryWrites=true&w=majority`;
  const dbName = 'curzy-production-cluster';
  const client = new MongoClient(url);

  try {
    await client.connect();
    console.log('Connected successfully to mongodb');
  
    const db = client.db(dbName);
    const collection = db.collection('rates');
  
    console.log('Record saving:', JSON.stringify(storeData))
    await collection.insertOne(storeData)
    console.log('Record saved:', JSON.stringify(storeData))
  
  } finally { 
    await client.close();
  }
}
