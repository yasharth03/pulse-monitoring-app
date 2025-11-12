import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import Url from './models/Url';
import Ping from './models/Ping';

const app: Express = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// --- HEALTH CHECK ---
app.get('/api/health', (req: Request, res: Response) => {
  res.send({ status: 'UP', message: 'API is healthy! 🚀' });
});

// --- ADD A URL ---
app.post('/api/urls', async (req: Request, res: Response) => {
  try {
    const { url, name } = req.body;
    if (!url || !name) return res.status(400).json({ error: 'URL and Name are required' });
    const newUrl = new Url({ url, name });
    await newUrl.save();
    res.status(201).json(newUrl);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add URL' });
  }
});

// --- GET ALL URLs ---
app.get('/api/urls', async (req: Request, res: Response) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch URLs' });
  }
});

// --- GET PING HISTORY ---
app.get('/api/pings/:urlId', async (req: Request, res: Response) => {
  try {
    const { urlId } = req.params;
    const pings = await Ping.find({ urlId }).sort({ timestamp: -1 }).limit(100);
    res.json(pings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pings' });
  }
});

// --- START SERVER ---
const startServer = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) process.exit(1);
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Successfully connected to MongoDB! 💾');
    app.listen(PORT, () => {
      console.log(`API Server is listening on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
};
startServer();