import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import { Client } from 'pg';
import session from 'express-session';
import routes from './routes/appRoutes';


import config, {
  mongodb_uri, mongodb_db, postgres_config, postgres_uri,
} from './config/config.json';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(`${mongodb_uri}/${mongodb_db}`)
  .then(() => console.log(`Successfully connected to MongoDB on ${mongodb_uri}`))
  .catch(err => console.log(`There was a db connection error\n ${err}`));

const client = new Client(postgres_config);
client.connect()
  .then(() => console.log(`Successfully connected to PostgreSQL on ${postgres_uri}`))
  .catch(err => console.error('connection error', err.stack));

app.use(session({
  secret: 'moon of alabama',
  resave: false,
  saveUninitialized: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.get('/', (req, res) => {
  res.send('Hello! Welcome to the club!');
});

export default app;
