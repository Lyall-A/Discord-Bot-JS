module.exports = class {
    constructor(eventName) {
        this.eventName = eventName;
        globals.client.on(eventName, data => this.run(globals.client, data));
    }
}