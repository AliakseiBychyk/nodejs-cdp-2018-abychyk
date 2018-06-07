import EventEmitter from 'events';
import fs from 'fs';

class DirWatcher extends EventEmitter {
  static get changed() {
    return 'dirwatcher:changed';
  }

  watch = (path, delay) => {
    let dirContent = [];

    this.interval = setInterval(() => {
      fs.readdir(path, (err, data) => {
        if (err) throw err;

        if (dirContent.length === 0) dirContent = data;

        if (JSON.stringify(data) !== JSON.stringify(dirContent)) {
          console.log(this.changed);
          dirContent = data;
          this.emit(this.changed);
        }
        console.log(`${delay / 1000} sec`);
      });
    }, delay);
  }

  unwatch = (timeout = 0) => {
    setTimeout(() => {
      clearInterval(this.interval);
      console.log(`Interval cleared in ${timeout / 1000} sec`);
    }, timeout);
  }

}

export default DirWatcher;
