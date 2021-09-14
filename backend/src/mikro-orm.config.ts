import { Options } from '@mikro-orm/core';
import { Appointment } from './entities/Appointment';
import { User } from './entities/User';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import path from 'path';
import { Reminder } from './entities/Reminder';
import { Token } from './entities/Token';
import { Company } from './entities/Company';
import { SubAddress } from './entities/SubAddress';
import { Image } from './entities/Image';

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const options: Options = {
  entities: [User, Appointment, Reminder, Token, Company, SubAddress, Image],
  type: 'mongo',
  dbName: process.env.DB_NAME,
  clientUrl: process.env.DB_URI!,
  debug: process.env.NODE_ENV !== 'production',
  highlighter:
    process.env.NODE_ENV !== 'production' ? new MongoHighlighter() : undefined,
};

export default options;
