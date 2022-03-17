import mongodb, { Document } from 'mongodb'

const responseMapper = (doc: Document): RatesDb => {
  const {from, to, rate, timestamp, institution} = doc
  return {from, to, rate, timestamp, institution}
}

export const getLatestRates = async (db: mongodb.Db) => {
  const dCollection = await db.collection('rates');

  const lastRateRevolut = await dCollection.find({ institution: "REVOLUT" }).sort({ '_id': -1 }).limit(1).toArray()
  const lastRateCsob = await dCollection.find({ institution: "CSOB" }).sort({ '_id': -1 }).limit(1).toArray()

  return [
    ...lastRateRevolut.map(responseMapper),
    ...lastRateCsob.map(responseMapper)
  ]
}