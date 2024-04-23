import mongoose, { Document , Model, Schema } from 'mongoose';

interface IMessage extends Document {
  room: string;
  username: string;
  message: string;
  time: Date;
}

const messageSchema: Schema<IMessage> = new Schema({
  room: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

const Message: Model<IMessage> = mongoose.model('Message', messageSchema);

export default Message;
