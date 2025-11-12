import mongoose, { Schema, Document } from 'mongoose';

// 1. Define the TypeScript interface (for our code to know the types)
export interface IUrl extends Document {
  url: string;
  name: string;
  createdAt: Date;
}

// 2. Define the Mongoose Schema (for the database to know the structure)
const UrlSchema: Schema = new Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// 3. Export the model
export default mongoose.model<IUrl>('Url', UrlSchema);