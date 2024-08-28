import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from './routes/index.js'
import dependencies from './config/dependencies.js'
import cookieParser from 'cookie-parser'
import { createServer } from 'http';
import { Server } from 'socket.io';
import setupSocketHandlers from './socket.js';
import config from './config/config.js'

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: config.BASE_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


  
app.use(cors({
    origin: config.BASE_URL,
    credentials: true
}))

app.use('/quickwork',routes(dependencies))
setupSocketHandlers(io);

export { app ,server }

