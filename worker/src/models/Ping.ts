import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the interface
export interface IPing extends Document {
  urlId: mongoose.Types.ObjectId; // Links this ping to a specific URL
  status: number;                 // e.g., 200 for OK, 404 for Not Found
  latency: number;                // Response time in milliseconds
  timestamp: Date;                // When the ping happened
}

// 2. Define the Schema
// NOTICE: We are using 'timeseries' options here!
const PingSchema: Schema = new Schema({
  urlId: { type: Schema.Types.ObjectId, ref: 'Url', required: true },
  status: { type: Number, required: true },
  latency: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
}, {
  timeseries: {
    timeField: 'timestamp',
    metaField: 'urlId',
    granularity: 'minutes'
  }
});

// 3. Export the model
export default mongoose.model<IPing>('Ping', PingSchema);