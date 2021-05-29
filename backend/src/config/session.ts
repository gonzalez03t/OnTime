import { SessionOptions } from 'express-session';

const sessionConfig: SessionOptions = {
  name: process.env.EXPRESS_SESSION_NAME!,
  secret: process.env.EXPRESS_SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:
      process.env.NODE_ENV === 'production'
        ? 1000 * 60 * 25 // 25 min for production
        : 1000 * 60 * 60, // 1h for development
    secure: process.env.NODE_ENV === 'production',
  },
};

export default sessionConfig;
