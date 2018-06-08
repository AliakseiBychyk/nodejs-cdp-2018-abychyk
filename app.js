import express from 'express';
import lightCookieParser from './middlewares/light-cookie-parser';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(lightCookieParser());

app.get('/', (req, res) => {

  res.write(JSON.stringify(req.cookies));
  console.log(req.cookies);

});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});
