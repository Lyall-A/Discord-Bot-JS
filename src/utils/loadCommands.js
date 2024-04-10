const path = require("path");

const { utils, commands } = globals;

module.exports = () => {
    const commandFiles = utils.getFiles("./commands", i => path.extname(i) == ".js");
    commandFiles.forEach(i => {
        const commandPath = path.resolve(i);
        const Command = require(commandPath);
        const cmd = new Command();
        commands[cmd.commandName] = cmd;
    }
);
}