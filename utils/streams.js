const program = require('commander');

const reverse = str => {
  console.log('do reverse')
};

const transform = str => {
  console.log(`do transform ${str}`)
};

const outputFile = filePath => {
  console.log(`do outputFile ${filePath}`)
};

const convertFromFile = filePath => {
  console.log(`do convertFromFile ${filePath}`)
};

const convertToFile = filePath => {
  console.log(`do convertToFile ${filePath}`)
};

program
  .version('2.15.1')
  .option('-a, --action [type]', 'choose an action [type]', '')
  .option('-f, --file [type]', 'choose a file [type]', '')
  .parse(process.argv)

console.log(program.args[0])

console.log('action', program.action)
console.log('file', program.file)

if (program.action === 'transform') {
  eval(`${program.action}(program.args[0])`)
  return
}

eval(`${program.action}(program.file)`)
