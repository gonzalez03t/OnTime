// @ts-ignore: I know I am not using it, its for declarative merging
import { Session } from 'express-session';

declare module 'express-session' {
  interface Session {
    userId: string;
    status: string;
  }
}
