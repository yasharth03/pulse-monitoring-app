import mongoose from 'mongoose';
import cron from 'node-cron';
import axios from 'axios';
import Url, { IUrl } from './models/Url';
import Ping from './models/Ping';

const pingUrl = async (urlDoc: IUrl) => {
  const start = Date.now();
  try {
    const response = await axios.get(urlDoc.url, { timeout: 5000 });
    const end = Date.now();
    return {
      urlId: urlDoc._id,
      status: response.status,
      latency: end - start,
      timestamp: new Date()
    };
  } catch (error: any) {
    const end = Date.now();
    let status = 500;
    if (error.response) {
      status = error.response.status;
    } else if (error.code === 'ECONNABORTED') {
      status = 408;
    }
    return {
      urlId: urlDoc._id,
      status: status,
      latency: end - start,
      timestamp: new Date()
    };
  }
};

const startWorker = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  if (!MONGO_URL) process.exit(1);

  try {
    await mongoose.connect(MONGO_URL);
    console.log('WORKER: Successfully connected to MongoDB! 💾');

    cron.schedule('* * * * *', async () => {
      console.log('WORKER: Starting ping job...');
      try {
        const urls = await Url.find();
        if (urls.length === 0) return;
        const pingPromises = urls.map(url => pingUrl(url));
        const results = await Promise.all(pingPromises);
        await Ping.insertMany(results);
        console.log(`WORKER: Saved ${results.length} pings.`);
      } catch (err) {
        console.error('WORKER: Error during ping job:', err);
      }
    });
  } catch (err) {
    console.error('WORKER: Failed to connect to MongoDB', err);
    process.exit(1);
  }
};
startWorker();