const program = require('commander');

const reverse = str => {
  console.log(`run reverse ${str}`)
};

const transform = str => {
  console.log(`run transform ${str}`)
};

const outputFile = filePath => {
  console.log(`run outputFile ${filePath}`)
};

const convertFromFile = filePath => {
  console.log(`run convertFromFile ${filePath}`)
};

const convertToFile = filePath => {
  console.log(`run convertToFile ${filePath}`)
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
  console.log('Wrong input! Please input correct data.')
  return
}

if (program.action === 'transform' || program.action === 'reverse') {
  functions[program.action] && functions[program.action](...program.args);
  return
}

functions[program.action] && functions[program.action](...program.args);

