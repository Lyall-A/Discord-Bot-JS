// const { utils, config, secret } = globals;

const classes = require("./discord.classes");
const constants = require("./discord.constants");

const http = require("../http");
const objectDefaults = require("../objectDefaults");

module.exports = {
    parseIntents: (array) => {
        // Object > Number
        return array.map(i => constants.intents[i.toUpperCase()]).filter(i => i).reduce((prev, curr) => prev + curr);
    },
    parseIntentsInt: (int) => {
        // Number > Object
        const parsed = [];
        Object.entries(constants.intents).reverse().forEach(([name, value]) => {
            if (int >= value) {
                int -= value;
                parsed.push(name);
            };
        });
        return parsed.reverse();
    },
    api: (path, options) => http(`${config.discord.apiUrl}/v${config.discord.apiVersion}${path}`, objectDefaults(options, { headers: { "Authorization": `Bot ${secret.discord.token}` } }))
}