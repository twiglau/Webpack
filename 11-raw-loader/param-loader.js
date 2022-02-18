const { runLoaders } = require('loader-runner');
const fs = require('fs');
const path = require('path');

runLoaders({
    resource: path.join(__dirname, './src/demo.txt'),
    loaders: [
        {
            loader:path.join(__dirname, './src/param-loader.js'),
            options: {
                name: 'test'
            }
        }
    ],
    context: {
        minimize: true
    },
    readResource: fs.readFile.bind(fs)
}, (err, result) => {
    err ? console.error(err) : console.log(result);
});