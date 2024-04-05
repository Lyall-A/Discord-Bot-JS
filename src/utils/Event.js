// TODO: everything
module.exports = class {
    constructor(eventName) {
        this.eventName = eventName;
        console.log("Adding event:", this.eventName);
        this.run();
    }
}