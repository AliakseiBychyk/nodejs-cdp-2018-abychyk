const fs = require('fs');
const path = require('path');
const https = require('https');
const program = require('commander');
const through = require('through2');
const csvjson = require('csvjson');
const config = require('../config/config.json');
const { google } = require('googleapis');
const credentials = require('./google/credentials.json');
const { googleDriveRequest, getFile } = require('./google/googleDriveAPI');

/** 
 * 
 * node utils/streams.js --action reverse 
 * 
 * */
const reverse = () => {
  process.stdin.on('data', (data) => {
    process.stdout.write(data.toString().split('').reverse().join(''));
  })
};


/** 
 * 
 * node utils/streams.js --action=transform 
 * 
 * */
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

/** 
 * 
 * node utils/streams.js --action=outputFile --file=textFile.txt 
 * 
 * */
const outputFile = file => {
  const filePath = path.join(__dirname, file)
  const reader = fs.createReadStream(filePath);
  
  reader.on('data', chunk => {
    process.stdout.write(chunk.toString())
  })
};

/** 
 * 
 * node utils/streams.js --action=convertFromFile --file=csvFile.csv
 * 
 *  */
const convertFromFile = file => {
  const filePath = path.join(__dirname, file)
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

/** 
 * 
 * node utils/streams.js --action=convertToFile --file=csvFile.csv 
 * 
 * */
const convertToFile = file => {
  const filePath = path.join(__dirname, file)
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

/** 
 * 
 * node utils/streams.js -a cssBundler -p ./styles 
 * 
 * */
const cssBundler = folder => {
  const writer = fs.createWriteStream(path.join(__dirname, 'bundle.css'))
  const folderPath = path.join(__dirname, folder)
  
  const fileId = '1tCm9Xb4mok4Egy2WjGqdYYkrGia0eh7X';
  const createBundle = () => {
    fs.readdir(folderPath, (err, files) => {
      if (err) throw err;
      files.forEach(fileName => {
        const file = path.join(__dirname, 'styles', fileName)
        if (fileName.match(/.css/)) {
          fs.readFile(file, 'UTF-8', (err, content) => {
            if (err) throw err;
            console.log(content)
            writer.write(content + '\n')
          })
        }
      })
    })
  }
  
  googleDriveRequest(getFile, [fileId, createBundle])
}

const functions = {
  reverse,
  transform,
  outputFile,
  convertFromFile,
  convertToFile,
  cssBundler
};

program
  .version('2.15.1')
  .option('-a, --action [type]', 'choose an action [type]', '')
  .option('-f, --file [type]', 'choose a file [type]', '')
  .option('-p --path [path]', 'chose path to the folder with css files [path]', '')
  .parse(process.argv)

if (!program.action
  || ((program.action !== 'transform' && program.action !== 'reverse' && program.action !== 'cssBundler') && !program.file)
  || (program.action === 'cssBundler' && !program.path)) {
    console.log('Wrong input! Please input correct data.');
    return;
  }

if (program.action === 'transform' || program.action === 'reverse') {
  functions[program.action] && functions[program.action](...program.args);
  return;
}
const argument = program.file || program.path;
functions[program.action] && functions[program.action](argument);
