
const assert = require('assert');

describe('webpack.base.js test case', () => {

    const baseConfig = require('../../lib/webpack.base')

    console.log(baseConfig);
    it('entry', () => {
        assert.equal(baseConfig.entry.index, '/Users/twiglau/Desktop/Learning/Webpack/07-build-webpack/builder-webpack/test/smoke/template/src/index/index.js');
        assert.equal(baseConfig.entry.search, '/Users/twiglau/Desktop/Learning/Webpack/07-build-webpack/builder-webpack/test/smoke/template/src/search/index.js');
    })
});