// ./src/logger.js
const log = msg => {
    console.log('---------- INFO ----------');
    console.log(msg);
    console.log('--------------------------');
  };
  const error = msg => {
    console.error('---------- ERROR ----------');
    console.error(msg);
    console.error('---------------------------');
  };

export { error, log };
