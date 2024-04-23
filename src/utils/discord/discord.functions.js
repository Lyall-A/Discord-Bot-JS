// const { utils, config, secret } = globals;

const classes = require("./discord.classes");
const constants = require("./discord.constants");

const http = require("../http");
const objectDefaults = require("../objectDefaults");

const { Event, Command, CommandOption, Application } = classes;
const { intents, gatewayOpcodes, gatewayCloseEventCodes, applicationCommandTypes, voiceOpcodes, voiceCloseEventCodes, applicationCommandOptionTypes } = constants;

module.exports = {
    parseIntents: (array) => {
        // Object > Number
        return array.map(i => intents[i.toUpperCase()]).filter(i => i).reduce((prev, curr) => prev + curr);
    },
    parseIntentsInt: (int) => {
        // Number > Object
        const parsed = [];
        Object.entries(intents).reverse().forEach(([name, value]) => {
            if (int >= value) {
                int -= value;
                parsed.push(name);
            };
        });
        return parsed.reverse();
    },
    api: (path, options) => {
        return http(`${config.discord.apiUrl}/v${config.discord.apiVersion}${path}`, objectDefaults(options, { headers: { "Authorization": `Bot ${secret.discord.token}` } }));
    }
}