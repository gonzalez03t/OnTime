import { MongoDBSessionOptions } from 'connect-mongodb-session';

const mongoStoreConfig: MongoDBSessionOptions = {
  uri: process.env.DB_URI!,
  collection: process.env.DB_SESSIONS_COLLECTION_NAME!,
  expires:
    process.env.NODE_ENV === 'production'
      ? 1000 * 60 * 25 // 25 min for production
      : 1000 * 60 * 60, // 1h for development,
  idField: 'sessionId',
};

export default mongoStoreConfig;
