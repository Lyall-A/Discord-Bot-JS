const path = require("path");

const { utils } = globals;

module.exports = () => {
    const eventFiles = utils.getFiles("./events", i => path.extname(i) == ".js");
    eventFiles.forEach(i => new (require(path.resolve(i))));
}