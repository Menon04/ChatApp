import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const databaseURL = process.env.DATABASE_URL;

app.use(cors({
  origin: [process.env.ORIGIN],
  mmethods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const server = app.listen(port, () => {
  console.log(`Server is running on port: http://localhost:${port}`);
});

mongoose.connect(databaseURL).then(() => console.log('Database connected')).catch(err => console.log(err.mesage));
