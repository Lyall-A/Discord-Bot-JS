const path = require("path");

const { utils, events } = globals;

module.exports = () => {
    const eventFiles = utils.getFiles("./events", i => path.extname(i) == ".js");
    eventFiles.forEach(i => {
        const eventPath = path.resolve(i);
        const Event = require(eventPath);
        const event = new Event();
        events[event.eventName] = event;
    });
}