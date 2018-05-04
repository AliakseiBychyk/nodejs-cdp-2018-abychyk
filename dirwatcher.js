import EventEmitter from 'events';
import fs from 'fs';

class DirWatcher extends EventEmitter { 
  watch = (path, delay) => {
    let dirContent = [];

    this.interval = setInterval(() => {
      fs.readdir(path, (err, data) => {
        if (err) throw err;

        if (dirContent.length === 0) dirContent = data
        
        if (JSON.stringify(data) !== JSON.stringify(dirContent)) {
          console.log('dirwatcher:changed');
          dirContent = data;
          this.emit('dirwatcher:changed');
        }
        console.log(`${delay / 1000} sec`);
      })
    }, delay)
  }

  unwatch = (timeout) => {
    setTimeout(() => {
      clearInterval(this.interval);
      console.log(`interval cleared in ${timeout / 1000} sec`);
    }, timeout)
  }

}

export default DirWatcher;
