import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './src/db.js'

import userRouter from './src/routes/user.route.js'

dotenv.config({
  path: './.env',
})

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
)

app.use(express.json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/v1/users', userRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server listening on port ${process.env.PORT}`)
    })
  })
  .catch((e) => {
    console.log('MongoDB connection failed', e)
  })
