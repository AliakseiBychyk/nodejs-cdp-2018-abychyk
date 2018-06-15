const http = require('http');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

let json;

readFile('./http-servers/public/product.json', 'UTF-8')
  .then(data => { json = data; })
  .catch(err => console.error(err));

// fs.readFile('./http-servers/public/product.json', 'UTF-8', (err, data) => {
//   if (err) console.error(err);
//   json = data;
// });

const server = http.createServer((req, res) => {

  res.writeHead(200, { 'Content-Type': 'text/json' });

  res.end(json);
});

server.listen(3025, () => {
  console.log('Server listening on port 3025');
});
