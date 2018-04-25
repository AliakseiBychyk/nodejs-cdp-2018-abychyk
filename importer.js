import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import DirWatcher from './dirwatcher';

const dirwatcher = new DirWatcher()

class Importer extends EventEmitter {
  import = (dir) => {  
    
    dirwatcher.watch(dir, 3000)
    dirwatcher.on('changed', (err) => {
      if (err) throw err;
      fs.readdir(dir, (err, files) => {
        files.forEach(fileName => {
          const file = path.join(__dirname, dir, fileName)
          fs.readFile(file, 'UTF-8', (err, contents) => {
            if (err) throw err
            console.log(contents)
          })
        })
      })
    })  
  } 
}

export default Importer;