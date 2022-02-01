import mongoose from 'mongoose'

let con: mongoose.Connection

export const connect = async () => {
  if (con) return

  const uri = process.env.DB_URI || ''
  const config = {
    dbName: process.env.DB_NAME || 'dev',
    user: process.env.DB_USER || 'dev',
    pass: process.env.DB_PASS || 'dev',
    autoIndex: true,
    auth: {
      user: 'root',
      password: 'root',
    },
  }

  await mongoose.connect(uri, config)
  mongoose.set('debug', true)

  con = mongoose.connection
  con.once('open', () => console.log('Connected to database'))
  con.on('error', () => console.log('Error connecting to database'))
}

export const disconnect = () => {
  return con ? mongoose.disconnect() : Promise.resolve()
}

export const testDB = async () => {
  if (!con) {
    return Promise.reject({
      success: false,
      msg: 'No connection to the database. Have you called connect()?',
    })
  }

  const Kitten = mongoose.model(
    'Kitten',
    new mongoose.Schema({
      name: String,
    })
  )
  const fluffy = new Kitten({ name: 'fluffy' })
  await fluffy.save()
  fluffy.speak()

  return Promise.resolve({
    success: true,
  })
}
