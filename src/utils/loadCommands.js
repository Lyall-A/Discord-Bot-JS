const path = require("path");

const { utils } = globals;

module.exports = () => {
    const commandFiles = utils.getFiles("./commands", i => path.extname(i) == ".js");
    commandFiles.forEach(i => new (require(path.resolve(i))));
}