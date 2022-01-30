import mongoose from 'mongoose'

let db: mongoose.Connection
const uri = process.env.DB_URI || ''

export const connect = async () => {
  if (db) {
    return
  }
  mongoose.connect(uri, {
    dbName: process.env.DB_NAME || 'dev',
    user: process.env.DB_USER || 'dev',
    pass: process.env.DB_PASS || 'dev',
    autoIndex: true,
  })
  db = mongoose.connection
  db.once('open', () => console.log('Connected to database'))
  db.on('error', () => console.log('Error connecting to database'))
}

export const disconnect = async () => {
  return db ? mongoose.disconnect() : Promise.resolve()
}

// TODO
export const get = async () => {
  if (!db) {
    throw new Error('Database not connected')
  }
  console.log('GET DB...')
}
