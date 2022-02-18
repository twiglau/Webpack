module.exports = class MyPlugin {
    constructor(options) {
        this.options = options;
    }
    apply (compiler) {
        console.log('My plugin is executed');
        console.log('my plugin options',this.options);
    }
}