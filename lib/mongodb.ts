import { MongoClient, Db } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://malekchb0621:XshkxZfJVSLxqTnJ@agency.z9ebeyi.mongodb.net/?appName=agency';
const DB_NAME = 'mox-voyage';

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    const db = client.db(DB_NAME);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}

// For NextAuth MongoDB adapter
const globalForMongo = global as unknown as { mongo: Promise<MongoClient> };

export async function clientPromise(): Promise<MongoClient> {
  if (globalForMongo.mongo) {
    return globalForMongo.mongo;
  }

  const client = new MongoClient(MONGO_URI);
  globalForMongo.mongo = client.connect().then(() => client);
  return globalForMongo.mongo;
}

export default clientPromise;
