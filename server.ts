import express, { Application } from 'express';
import authRouter from './routes/auth.js';
import bookRouter from './routes/book.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT: number | string = process.env.Port || 4000;

const app: Application = express();

app.use(express.json());
app.use(cors())

app.use('/', authRouter);
app.use('/', bookRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});