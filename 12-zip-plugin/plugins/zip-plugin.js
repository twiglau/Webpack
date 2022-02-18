
const JSZip = require('jszip');
const zip = new JSZip();
const path = require('path');
const RawSource = require('webpack-sources').RawSource;

module.exports = class ZipPlugin {
    constructor(options) {
        this.options = options;
    }
    apply (compiler) {
        compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
            const folder = zip.folder(this.options.filename);

            for (let filename in compilation.assets) {
               const source = compilation.assets[filename].source;
               folder.file(filename, source);
            }

            zip.generateAsync({
                type: 'nodebuffer'
            }).then( (content) => {
                console.log(compilation.options);
                const outputPath = path.join(
                    compilation.options.output.path, 
                    this.options.filename + '.zip'
                );
                const outputRelativePath = path.relative(
                    compilation.options.output.path,
                    outputPath
                )
                compilation.assets[outputRelativePath] = new RawSource(content);

                callback();
            })
        });
    }
}