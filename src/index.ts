import express, { Request, Response } from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

// socket io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {
  console.log(`user is connected ${socket.id}`);

  socket.on('join room', ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);
    socket.to(room).emit('chat message', `${username} has joined the room.`);
  });

  socket.on('chat message', ({ room, message, username }) => {
    io.to(room).emit('chat message', `${username}: ${message}`);
  });



  socket.on("disconnect", () => {
    console.log("user disconnected");
  })
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
