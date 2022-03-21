import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
  const fees = {
    'BINANCE': {
      'CARD': {
        'type': 'percentage',
        'value': 1.8,
      },
      'SEPA': {
        'type': 'percentage',
        'value': 0,
      }
    }
  }
  res.json(fees)
})

export default router
