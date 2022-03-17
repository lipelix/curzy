import express from 'express'
import { getLatestRates } from '../db/rates';

const router = express.Router()

router.get('/', async (req, res) => {
  const rates = await getLatestRates(req.app.locals.db)
  res.json(rates)
})

export default router
