const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')

const authRoutes = require('./routes/auth.routes')
const logsRoutes = require('./routes/logs.routes')
const usersRoutes = require('./routes/users.routes')

const authMiddleware = require('./middleware/passport')
const { sequelize } = require('./sequelize/models')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended: true }))
app.use(morgan('dev'))
app.use(cors())
app.use(passport.initialize())

authMiddleware(passport)


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/logs', logsRoutes)
app.use('/api/users', usersRoutes)

const connectDb = async () => {
  console.log('Checking database connection...')

  try {
      await sequelize.authenticate();
      console.log('Database connection established.')

     
  } catch(e) {
      console.log('Database connection failed', e)
      process.exit(1)
  }
}

(async () => {
  await connectDb()

  console.log(`Attempting to run server on port ${PORT}`)

  app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
  })
})()