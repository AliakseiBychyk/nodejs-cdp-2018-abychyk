const http = require('http');

const server = http.createServer((req, res) => {

  res.writeHead(200, { 'Content-Type': 'text/plain' });

  res.write('Echo service: ' + req.url + '\n' + JSON.stringify(req.headers) + '\n');

  req.pipe(res);
});

server.listen(3030, () => {
  console.log('Server listening on port 3030');
});
