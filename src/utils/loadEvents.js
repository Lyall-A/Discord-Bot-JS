const path = require("path");

// const { utils, events } = globals;
const getFiles = require("./getFiles");

module.exports = () => {
    const eventFiles = getFiles(config.eventsPath, i => path.extname(i) == ".js");
    eventFiles.forEach(i => {
        const eventPath = path.resolve(i);
        const Event = require(eventPath);
        const event = new Event();
        events[event.name] = event;
    });
}