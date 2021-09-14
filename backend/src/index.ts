import express, { Application } from 'express';
import {
  Connection,
  EntityManager,
  IDatabaseDriver,
  MikroORM,
} from '@mikro-orm/core';
import cors from 'cors';
import path from 'path';
import mikroOrmConfig from './mikro-orm.config';
import { ApiController } from './controllers/ApiController';
import session from 'express-session';
import sessionConfig from './config/session';
import mongoStoreConfig from './config/store';
import MongoDBStore from 'connect-mongodb-session';
import scheduler from './util/schedule';

// seed the database : UNCOMMENT WHEN NOT NEEDEED
import seed from './util/seed';

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const PORT = process.env.PORT || 5000;

export let em: EntityManager<IDatabaseDriver<Connection>>;

async function bootstrap() {
  // initialize the express application
  const app: Application = express();

  const corsOptions = {
    origin: [process.env.FRONTEND_URL!],
    credentials: true,
  };

  // this block is a little confusing, but the function call returns a MongoDBStore
  // class which I instantiate with 'new', passing in the session import.
  // this will have our Mongo DB manage sessions!
  const store = new (MongoDBStore(session))({
    ...mongoStoreConfig,
  });

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      ...sessionConfig,
      store,
    })
  );

  // initialize the ORM
  const orm = await MikroORM.init({
    ...mikroOrmConfig,
  });

  // set the global so it can be imported in the other files
  em = orm.em;

  // seed the database : UNCOMMENT WHEN NOT NEEDEED
  seed();

  // this will initialize the cron scheduler, which will look for reminders
  // to send every 1 minute.
  scheduler.start();

  // if production, serve the react files
  // FIXME: if we add mobile AND web variants, we will need
  // more than just 'development' or 'production'.
  if (process.env.NODE_ENV === 'production') {
    app.use(
      '/static',
      express.static(path.join(__dirname, '../../web/build/static'))
    );

    // handle all get routing that isn't prefixed with '/api' using react
    app.get(/^(?!\/api).*/, function (_req, res) {
      res.sendFile('index.html', {
        root: path.join(__dirname, '../../web/build/'),
      });
    });
  }

  // this will assign the endpoints this application uses
  // ApiController is the main, parent router for this REST api
  app.use('/api', ApiController);

  app.listen(PORT, () => {
    console.log(`⚡️ server started at http://localhost:${PORT}`);
  });
}

bootstrap();
