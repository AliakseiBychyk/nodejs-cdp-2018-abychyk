import EventEmitter from 'events';
import fs from 'fs';

class DirWatcher extends EventEmitter { 
  watch = (path, delay) => {
    let dirContent = [];

    setInterval(() => {
      fs.readdir(path, (err, data) => {
        if (err) throw err;

        if (dirContent.length === 0) dirContent = data
        
        if (JSON.stringify(data) !== JSON.stringify(dirContent)) {
          console.log('changed')
          dirContent = data
          this.emit('changed')
        }
      })
    }, delay)
  }
}

export default DirWatcher;
