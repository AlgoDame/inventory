import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import router from './routes/index';
import mongoose from 'mongoose';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

mongoose.connect('mongodb://localhost:27017/sampledb');
mongoose.connection.once('open', () => {
  console.log('::: Connected to MongoDB :::');
});

app.listen(port, () => {
  console.log(`::: Server is listening at http://localhost:${port} :::`);
});
