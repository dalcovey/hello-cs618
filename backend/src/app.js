import express from 'express'
import { postsRoutes } from './routes/posts.js'
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express()
app.use(bodyParser.json())

//app.use(cors()) THIS IS THE OLD CODE, THE OTHER COMMENT SECTIONS ARE NEW

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

postsRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express Nodemon!')
})

app.get('/posts', (req, res) => {
  res.send('These are your posts!')
})

export { app }
