import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import csvjson from 'csvjson';
import config from './config/config.json';

class Importer extends EventEmitter {
  import = (dir, emitter) => {  

    const read = (filePath) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'UTF-8', (err, content) => {
          if (err) reject(err);
          const data = csvjson.toObject(content, config.csv_options);
          resolve(data)
        })
      })
    };

    return new Promise((resolve, reject) => {
      emitter.on('changed', (err) => {
        if (err) reject(err);
        
        console.log('start async reading...')
        return fs.readdir(dir, (err, files) => {
          if (err) reject(err);
         
          Promise.all(files.map(fileName => {
            const filePath = path.join(__dirname, dir, fileName)
            return read(filePath)
          }))
            .then(data => {
              resolve(data)
            })      
        })
      })
    })
  } 

  importSync = (dir, emitter) => {
    emitter.on('changed', (err) => {
      if (err) throw err;

      console.log('start reading synchronosly...')
      const files = fs.readdirSync(dir)
      const content = files.map(file => {
        const filePath = path.join(__dirname, dir, file)
        const csvData = fs.readFileSync(filePath, 'UTF-8')
        return csvjson.toObject(csvData, config.csv_options);
      })
      console.log(content)
      return content
    }) 
  }
}

export default Importer;
