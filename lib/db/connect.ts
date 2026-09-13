import { createRequire } from 'node:module';

if (typeof (globalThis as any).require === 'undefined') {
  try {
    const reqFunc = createRequire(import.meta.url);
    (globalThis as any).require = reqFunc;
  } catch (e) {
    // fallback
  }
}

const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://geniusattechie:tF2Oe1CBjJVdL9xZ@cluster0.oxahl6y.mongodb.net/bsthospital?retryWrites=true&w=majority&appName=Cluster0';

interface MongooseCache {
  conn: any | null;
  promise: Promise<any> | null;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = globalThis.mongooseCache || { conn: null, promise: null };

if (!globalThis.mongooseCache) {
  globalThis.mongooseCache = cached;
}

export async function connectToDatabase() {

  const mongooseModule = await import('mongoose');
  const mongoose = mongooseModule.default || mongooseModule;

  if (mongoose.connection && mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!cached.promise) {
    cached.promise = (async () => {
      try {
        console.log('Attempting MongoDB connection to Atlas...');
        await mongoose.connect(MONGO_URI, { bufferCommands: false });
        console.log('Successfully connected to MongoDB cluster0 (bsthospital)');
        return mongoose.connection;
      } catch (err: any) {
        console.error('MongoDB connection error in connectToDatabase:', err);
        cached.promise = null;
        return null;
      }
    })();
  }

  try {
    cached.conn = await cached.promise;
    if (!cached.conn || mongoose.connection.readyState !== 1) {
      cached.promise = null;
      cached.conn = null;
    }
  } catch (e) {
    console.error('MongoDB await promise error:', e);
    cached.promise = null;
    cached.conn = null;
    return null;
  }

  return cached.conn || (mongoose.connection.readyState === 1 ? mongoose.connection : null);
}



