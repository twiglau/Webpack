const path = require('path')

/**
 * @type {import('webpack').Configuration}
 *  */
 const config = {
    entry:'./src/main.js',
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'output')
    },
    mode:'none',
    module:{
        rules:[
            {
                test:/.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}

module.exports = config