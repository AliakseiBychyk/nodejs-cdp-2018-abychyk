import config from './config/config.json';
import User from './models/User';
import Product from './models/Product';
import DirWatcher from './dirwatcher';
import Importer from './importer';

const user = new User('John Doe');
const product = new Product('Jumbo Jet');

console.log(config.name);

const watcher = new DirWatcher();
const importer = new Importer(watcher);

watcher.watch('./data', 3000);

importer.subscribeListenerForImport('./data')  

// importer.importSync('./data', watcher)
// watcher.unwatch(15000);