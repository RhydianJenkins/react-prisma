import express, { Request, Response } from 'express'
import next from 'next'
import { connect, testDB } from './db'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

;(async () => {
  try {
    await app.prepare()
    const server = express()

    server.get('/api/hello', async (_, res: Response) => {
      await connect() // TODO do we want to connect every time the API is called?
      const dataFromDb = await testDB().catch((err) => console.error(err))
      return res
        .status(!dataFromDb?.success ? 500 : 200)
        .json({ ...dataFromDb })
    })

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(port, (err?: unknown) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
