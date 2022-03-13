import { processData as processDataRevolut} from './feeders/revolutFeeder'
import { processData as processDataCsob } from './feeders/csobFeeder'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/revolut', async (req, res) => {
  const respon = await processDataRevolut()
  res.send(respon)
})

app.get('/csob', async (req, res) => {
  const respon = await processDataCsob()
  res.send(respon)
})

app.get('/', async (req, res) => {
  res.send('Welcome on Curzy!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})