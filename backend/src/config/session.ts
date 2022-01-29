import { SessionOptions } from 'express-session';

const sessionConfig: SessionOptions = {
  name: process.env.EXPRESS_SESSION_NAME!,
  secret: process.env.EXPRESS_SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge:
      process.env.NODE_ENV === 'production'
        ? 1000 * 60 * 60 * 24 // 1 day for production
        : 1000 * 60 * 60 * 2, // 2h for development
    secure: process.env.NODE_ENV === 'production',
  },
};

export default sessionConfig;
