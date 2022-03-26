import express from 'express'
import cors from 'cors'
import { initializeDbConnection } from './db/init'
import rates from './api/rates'
import fees from './api/fees'

const corsOptions = {
  origin: 'https://curzy.herokuapp.com',
}

const app = express()
const PORT = process.env.PORT || 3001;

(async (app: express.Application) => {
  await initializeDbConnection(app)
})(app)

app.use(cors(corsOptions))
app.use('/api/rates', rates)
app.use('/api/fees', fees)

app.get('/', async (req, res) => {
  res.send('Welcome on Curzy!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})