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
  try {
    const mongooseModule = await import('mongoose');
    const mongoose = mongooseModule.default || mongooseModule;

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (!cached.promise) {
      cached.promise = (async () => {
        try {
          await mongoose.connect(MONGO_URI, { bufferCommands: false });
          return mongoose.connection;
        } catch (err: any) {
          cached.promise = null;
          return null;
        }
      })();
    }

    cached.conn = await cached.promise;
    if (!cached.conn || mongoose.connection.readyState !== 1) {
      cached.promise = null;
      cached.conn = null;
    }
    return cached.conn || (mongoose.connection.readyState === 1 ? mongoose.connection : null);
  } catch (e: any) {
    cached.promise = null;
    cached.conn = null;
    return null;
  }
}
