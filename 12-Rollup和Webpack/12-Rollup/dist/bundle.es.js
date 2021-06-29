// ./src/logger.js
const log = msg => {
    console.log('---------- INFO ----------');
    console.log(msg);
    console.log('--------------------------');
  };

// ./src/messages.js
var messages = {
    hi: 'Hey Guys, I am zce~'
  };

// ./src/index.js
log(messages.hi);
