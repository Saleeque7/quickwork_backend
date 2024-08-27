import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { routes } from './routes/index.js'
import dependencies from './config/dependencies.js'
import cookieParser from 'cookie-parser'
import { createServer } from 'http';
import { Server } from 'socket.io';
import setupSocketHandlers from './socket.js';


const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


  
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use('/quickwork',routes(dependencies))
setupSocketHandlers(io);

export { app ,server }

