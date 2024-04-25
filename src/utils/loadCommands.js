const path = require("path");

// const { utils, commands } = globals;
const getFiles = require("./getFiles");

module.exports = () => {
    const commandFiles = getFiles(config.commandsPath, i => path.extname(i) == ".js");

    commandFiles.forEach(i => {
        const commandPath = path.resolve(i);
        const Command = require(commandPath);
        const cmd = new Command();
        commands[cmd.name] = cmd;
    });
}