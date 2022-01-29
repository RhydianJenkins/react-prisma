import mongoose from 'mongoose'

let db: mongoose.Connection
const uri = process.env.DB_URI || ''

const connect = async () => {
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
  db.once('open', () => {
    console.log('Connected to database')
  })
  db.on('error', () => {
    console.log('Error connecting to database')
  })
}

const disconnect = async () => {
  return db ? mongoose.disconnect() : Promise.resolve()
}

// TODO
export const get = async () => {
  await connect()
  disconnect()
}
