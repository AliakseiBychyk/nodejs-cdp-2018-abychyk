import express from 'express';
import passport from 'passport';
import lightCookieParser from './middlewares/light-cookie-parser';
import ligntQueryParser from './middlewares/light-query-parser';
import routes from './routes/appRoutes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.get('/', (req, res) => {
  res.send('Hello! Welcome to the club!');
});

export default app;
