import { Server } from "socket.io";
import Message from '../models/message';

const socketManager = (io: Server): void => {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join room', async ({ username, room }: { username: string; room: string }) => {
      socket.join(room);
      const messages = await Message.find({ room }).sort({ time: -1 }).limit(50);
      console.log("messgaes",messages)
      socket.emit('previous messages', messages);
      socket.to(room).emit('chat message', `${username} has joined the room.`);
    });

    socket.on('chat message', async ({ room, message, username }: { room: string; message: string; username: string }) => {
      const msgToStore = new Message({ room, username, message });
      await msgToStore.save();
      io.to(room).emit('chat message', `${username}: ${message}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default socketManager;
