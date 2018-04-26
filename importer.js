import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import csvjson from 'csvjson';
import DirWatcher from './dirwatcher';
import config from './config/config.json';

const dirwatcher = new DirWatcher()

class Importer extends EventEmitter {
  import = (dir) => {  

    const read = (filePath) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'UTF-8', (err, content) => {
          if (err) reject(err);
          const data = csvjson.toObject(content, config.csv_options);
          resolve(data)
        })
      })
    }
    
    return new Promise((resolve, reject) => {
      dirwatcher.watch(dir, 3000)
      dirwatcher.on('changed', (err) => {
        if (err) reject(err);
        
        return fs.readdir(dir, (err, files) => {
          if (err) reject(err);
         
          Promise.all(files.map(fileName => {
            const filePath = path.join(__dirname, dir, fileName)
            return read(filePath)
          }))
            .then(data => resolve(data))      
        })

      })
    })
  } 

  importSync = (dir) => {
    dirwatcher.watch(dir, 3000);
    dirwatcher.on('changed', (err) => {
      if (err) throw err;

      const files = fs.readdirSync(dir)
      const content = files.map(file => {
        const filePath = path.join(__dirname, dir, file)
        return fs.readFileSync(filePath, 'UTF-8')
      })
      console.log(content)
      return content
    }) 
  }
}

export default Importer;