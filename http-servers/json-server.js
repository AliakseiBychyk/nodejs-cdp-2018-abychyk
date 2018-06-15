const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

  fs.readFile('./http-servers/public/product.json', 'UTF-8', (err, json) => {
    if (err) console.error(err);

    res.writeHead(200, { 'Content-Type': 'text/json' });

    res.end(json);
  });
});

server.listen(3025, () => {
  console.log('Server listening on port 3025');
});
