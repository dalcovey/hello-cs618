import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { eventRoutes } from './routes/events.js'

const app = express()
app.use(bodyParser.json())

app.use(cors())

/* TRY FOR CLOUD HOSTING CORS ISSUES
app.use(
  cors({
    origin: 'https://blog-frontend-335463930887.us-west3.run.app',
    credentials: true,
  }),
)

// ensure preflight requests are handled
app.options(
  '*',
  cors({
    origin: 'https://blog-frontend-335463930887.us-west3.run.app',
    credentials: true,
  }),
)
*/

postsRoutes(app)
userRoutes(app)
eventRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

app.get('/posts', (req, res) => {
  res.send('These are your posts!')
})

export { app }
