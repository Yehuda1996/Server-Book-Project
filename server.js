import express from 'express';
import authRouter from './routes/auth.js';
const PORT = 4000;
const app = express();
app.use(express.json());
app.use('/', authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
