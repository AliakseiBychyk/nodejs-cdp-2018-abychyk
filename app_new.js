import express from 'express';
import passport from 'passport';
import session from 'express-session';
import routes from './routes/appRoutes';

const app = express();

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
