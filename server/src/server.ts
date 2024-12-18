// Ruo Yang Jiang

import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import createHttpError, { isHttpError } from 'http-errors'
import session from 'express-session'
import MongoStore from 'connect-mongo'

// Create express app
const app = express()
app.use(express.json())
app.use(
  cors({
    origin: 'https://mcgill-planit.vercel.app',
    methods: 'GET,POST,PATCH,DELETE',
    credentials: true, // Include cookies if necessary
  })
)

// Connect to mongoose
const clientP = mongoose
  .set('strictQuery', false)
  .connect(process.env.MONGO_URI as string, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 5000,
  })
  .then((m) => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to MongoDB and listening on port ` + process.env.PORT
      )
    })
    return m.connection.getClient()
  })

// Middleware
// Print the request payload to console
app.use((req: Request, res: Response, next: NextFunction) => {
  res.on('finish', () => {
    console.log(req.method, req.path, res.statusCode)
  })

  next()
})

// Handles login session
app.set('trust proxy', 1) // trust first proxy
app.use(
  session({
    name: 'connect.sid',
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: false,
      sameSite: 'none',
      domain: 'mcgill-planit.onrender.com',
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      clientPromise: clientP,
      dbName: 'PlanItDB',
    }),
  })
)

// Import routes from routes folder
import { requireAuth } from './middleware/auth'
import UserRoute from './routes/UserRoute'
import TagRoute from './routes/TagRoute'
import TodoRoute from './routes/TodoRoute'
import EventRoute from './routes/EventRoute'
import ThemeRoute from './routes/ThemeRoute'

// Make app use routes
app.use('/api/user', UserRoute)
app.use('/api/tag', requireAuth, TagRoute)
app.use('/api/event', requireAuth, EventRoute)
app.use('/api/todo', requireAuth, TodoRoute)
app.use('/api/theme', requireAuth, ThemeRoute)

// More Middleware
// Handles wrong endpoint
app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found ( ╹ -╹)?'))
})

// Handles error: used in catch block of every fct that interacts with the db
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error)
  let errorMessage = 'An unknown error occured.'
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.statusCode
    errorMessage = error.message
  }
  res.status(statusCode).json({ error: errorMessage })
})

// </Middleware
