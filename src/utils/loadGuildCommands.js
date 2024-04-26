const path = require("path");
const fs = require("fs");

// const { utils, commands } = globals;
const getFiles = require("./getFiles");

module.exports = () => {
    const guildsDir = fs.readdirSync(config.guildCommandsPath).filter(i => Number(i));

    guildsDir.forEach(guildDir => {
        guildCommands[guildDir] = { };
        const commandFiles = getFiles(config.guildCommandsPath, i => path.extname(i) == ".js");

        commandFiles.forEach(i => {
            const commandPath = path.resolve(i);
            const Command = require(commandPath);
            const cmd = new Command();
            guildCommands[guildDir][cmd.name] = cmd;
        });
    });
}