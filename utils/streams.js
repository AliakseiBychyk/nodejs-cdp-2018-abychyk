const fs = require('fs');
const program = require('commander');
const through = require('through2');
const csvjson = require('csvjson');
const config = require('../config/config.json');

/** node utils/streams.js --action reverse */
const reverse = () => {
  process.stdin.on('data', (data) => {
    process.stdout.write(data.toString().split('').reverse().join(''));
  })
};


/** node utils/streams.js --action=transform */
const transform = (str) => {
  const transformStream = through(write, end);

  function write(chunk, enc, next) {
    const transformedChunk = chunk.toString().toUpperCase();
    this.push(transformedChunk);
    next();
  }

  function end (done) {
    done();
  }

  process.stdin.pipe(transformStream).pipe(process.stdout);
};

/** node utils/streams.js --action=outputFile --file=./utils/textFile.txt */
const outputFile = filePath => {
  const reader = fs.createReadStream(filePath);
  
  reader.on('data', chunk => {
    process.stdout.write(chunk.toString())
  })
};

/** node utils/streams.js --action=convertFromFile --file=./utils/csvFile.csv */
const convertFromFile = filePath => {
  const reader = fs.createReadStream(filePath);
  let data = '';
  
  reader.on('data', chunk => {
    data += chunk;
  })
  
  reader.on('end', () => {
    const jsonData = csvjson.toObject(data, config.csv_option);
    process.stdout.write(JSON.stringify(jsonData));
  })
};

/** node utils/streams.js --action=convertToFile --file=./utils/csvFile.csv */
const convertToFile = filePath => {
  const reader = fs.createReadStream(filePath);
  const newFilePath = filePath.replace('.csv', '.json');
  const writer = fs.createWriteStream(newFilePath);
  
  let data = '';

  reader.on('data', chunk => {
    data += chunk;
  });
  
  reader.on('end', () => {
    jsonData = csvjson.toObject(data, config.csv_option);
    writer.write(JSON.stringify(jsonData));
  });
};

const functions = {
  reverse,
  transform,
  outputFile,
  convertFromFile,
  convertToFile 
};

program
  .version('2.15.1')
  .option('-a, --action [type]', 'choose an action [type]', '')
  .option('-f, --file [type]', 'choose a file [type]', '')
  .parse(process.argv)

if (!program.action || ((program.action !== 'transform' && program.action !== 'reverse') && !program.file)) {
  console.log('Wrong input! Please input correct data.');
  return;
}

if (program.action === 'transform' || program.action === 'reverse') {
  functions[program.action] && functions[program.action](...program.args);
  return;
}

functions[program.action] && functions[program.action](program.file);
