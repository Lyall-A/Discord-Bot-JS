module.exports = class {
    constructor(name) {
        this.name = name;
        globals.client.on(name, data => this.run(globals.client, data));
    }
}