import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import socketManager from './sockets/socketManager';

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello world from Chat App</h1>');
});

socketManager(io);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
