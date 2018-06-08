const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

/** *********************************************** */
/**  File is read with fs.readFile method           */
/** *********************************************** */
  // fs.readFile('./http-servers/public/index.html', 'UTF-8', (err, html) => {
  //   if (err) console.error(err);

  //   const template = html.replace('{message}', 'HTML server lives!');

  //   res.writeHead(200, { 'Content-Type': 'text/html' });

  //   res.end(template);

  // });


/** *********************************************** */
/**  File is read with readable stream              */
/** *********************************************** */
  const reader = fs.createReadStream('./http-servers/public/index.html');

  let html = '';

  reader.on('data', chunk => {
    html += chunk;
  });

  reader.on('end', (err) => {
    if (err) console.error(err);

    const template = html.replace('{message}', 'HTML server lives forever!');

    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.end(template);
  });

});

server.listen(3020);

console.log('Server listening on port 3020');
