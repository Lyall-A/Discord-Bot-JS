module.exports = class {
    constructor(eventName) {
        this.eventName = eventName;
        globals.client.on(eventName, () => this.run(globals.client));
    }
}