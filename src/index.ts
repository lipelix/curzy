import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', async (req, res) => {
  res.send('Welcome on Curzy!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})