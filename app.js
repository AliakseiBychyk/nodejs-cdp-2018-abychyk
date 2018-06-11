import express from 'express';
import lightCookieParser from './middlewares/light-cookie-parser';
import ligntQueryParser from './middlewares/light-query-parser';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(lightCookieParser());
app.use(ligntQueryParser());

app.get('/', (req, res) => {

  res.write(JSON.stringify(req.parsedCookies));
  res.write(JSON.stringify(req.parsedQuery));
  console.log(req.parsedCookies);
  console.log(req.parsedQuery);
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
