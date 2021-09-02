import { Options } from '@mikro-orm/core';
import { Appointment } from './entities/Appointment';
import { User } from './entities/User';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import path from 'path';
import { Reminder } from './entities/Reminder';
import { Otp } from './entities/Otp';

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const options: Options = {
  entities: [User, Appointment, Reminder, Otp],
  type: 'mongo',
  dbName: process.env.DB_NAME,
  clientUrl: process.env.DB_URI!,
  debug: process.env.NODE_ENV !== 'production',
  highlighter:
    process.env.NODE_ENV !== 'production' ? new MongoHighlighter() : undefined,
};

export default options;