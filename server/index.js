import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
/*
sample .env file:

NODE_ENV="dev"
PORT=5000
MONGO_URI="mongodb+srv://USERNAME:PASSWORD@cluster0.example.mongodb.net/DATABASE?retryWrites=true&w=majority&appName=Cluster0"
*/

const app = express();
const server = http.createServer(app);

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'prod') {
  app.use(express.static(path.resolve(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
  });
}

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to database');
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log('Server listening on port', PORT));
})
.catch((error) => {
  console.log(error);
});