import express from 'express'
import mongoose from 'mongoose'
import next from 'next'
import menuRoutes from './routes'

const dev = process.env.NODE_ENV !== 'production'
const server = express()
const app = next({ dev })
const port = process.env.PORT || 3000
const uri =
  process.env.DB_URI ||
  'mongodb://username:password@mongo_db:27017/test_db_name' // TODO can't read env?

if (!uri) {
  throw new Error('No mongoDB URI provided in env file')
}

app.prepare()
mongoose
  .connect(uri)
  .then(() => server.use(menuRoutes))
  .then(() =>
    server.listen(port, () =>
      console.log(`> Ready on http://localhost:${port}`)
    )
  )
