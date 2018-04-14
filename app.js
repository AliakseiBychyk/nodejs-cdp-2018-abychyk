import config from './config/config.json';
import User from './models/User';
import Product from './models/Product';

const user = new User('John Doe');
const product = new Product('Jumbo Jet');

console.log(config.name);
