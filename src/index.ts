import express,{Request,Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
const app = express();
const server = createServer(app);
app.use(cors());
app.get('/', (req:Request, res:Response) => {
    res.send('<h1>Hello world</h1>');
  });
  
  server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
  });