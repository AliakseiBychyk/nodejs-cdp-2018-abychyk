import express from 'express';
import passport from 'passport';
import lightCookieParser from './middlewares/light-cookie-parser';
import ligntQueryParser from './middlewares/light-query-parser';
import routes from './routes/appRoutes';
import './config/passport';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
app.use(passport.session());

// app.use(lightCookieParser());
// app.use(ligntQueryParser());

routes(app);

app.get('/', (req, res) => {

  // res.write(JSON.stringify(req.parsedCookies));
  // res.write(JSON.stringify(req.parsedQuery));
  // console.log(req.parsedCookies);
  // console.log(req.parsedQuery);
});

export default app;
