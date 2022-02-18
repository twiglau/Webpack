

const fs = require('fs');
const path = require('path');
module.exports = function (source) {

    const callback = this.async();
    
    this.cacheable(false); // 关闭 loader 缓存

    fs.readFile(path.join(__dirname, './async.txt'), 'utf-8', (err, data) => {
        if (err) {
            callback(err, null);
        }
        callback(null, data);
    });
    
}