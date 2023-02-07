import { MongoClient } from 'mongodb';

// Check .env variables
if (!process.env.DB_URL) {
  throw new Error('Missing DB_URL in .env');
}

if (!process.env.DB_NAME) {
  throw new Error('Missing DB_NAME in .env');
}

// Connect to DB
const client = new MongoClient(process.env.DB_URL);
client.connect();
console.log('Successfully connected to the Database!');
export const db = client.db(process.env.DB_NAME);
