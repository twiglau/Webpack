const Spritesmith = require('spritesmith');
const fs = require('fs');
const path = require('path');

const sprites = ['./loaders/images/1.png','./loaders/images/2.png'];

Spritesmith.run({src: sprites}, (err, result) => {
    console.log(result.image);
    console.log(result.coordinates);
    console.log(result.properties);
    fs.writeFileSync(path.join(__dirname, 'dist/sprite.jpg'),result.image);
})