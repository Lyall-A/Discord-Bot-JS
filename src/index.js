// TODO: everything
// TODO: move everything to lang?? (effort)
const fs = require("fs");
const path = require("path");

const config = require("../config"); // Config
const secret = JSON.parse(fs.readFileSync(config.secretPath, "utf-8")); // Secret
const constants = require("./constants.json");

// Globals
globals = {
    config,
    secret,
    constants,
    gatewayUrl: config.discord.gatewayUrl,
    shards: config.discord.shards,
    commands: { },
    events: { },
    utils: { },
    startDate: new Date(),
    lang: JSON.parse(fs.readFileSync(path.join(config.langPath, `${config.lang}.json`), "utf-8"))
};

const { utils } = globals;

// Load all utils
require("./utils/getFiles")("./src/utils", i => path.extname(i) == ".js")
    .forEach(filePath => {
        const name = path.basename(filePath, path.extname(filePath));
        globals.utils[name] = require(path.resolve(filePath));
    });

(async () => {
    if (config.debug) {
        // Run all tests
        const testsDir = fs.readdirSync("./src/tests").filter(i => path.extname(i) == ".js");
        await (async function test(index) {
            if (!testsDir[index]) return;
            const filename = testsDir[index];
            const name = path.basename(filename, path.extname(filename));
            utils.logger.debug(`Running test: ${name}`);
            await require(`./tests/${filename}`);
            return test(index+1);
        })(0);
    }

    // Check user
    utils.logger.info("Verifying that token is valid");
    if ((await utils.discord.api("/users/@me")).status != 200) return utils.logger.error("Failed to get user, make sure token is correct");

    if (!globals.shards || !globals.gatewayUrl) {
        // Get gateway URL
        const gatewayInfo = await utils.discord.api("/gateway/bot")
            .then(i => i.json())
            .catch(err => utils.logger.error("Failed to get Gateway information!", err));
        if (!gatewayInfo?.url) return utils.logger.error("Couldn't get Gateway URL from Gateway information", gatewayInfo);

        globals.gatewayUrl = gatewayInfo.url;
        if (!globals.shards) globals.shards = globals.gatewayUrl.shards;
    }

    // Connect to Discord
    utils.logger.info("Connecting to Gateway at", globals.gatewayUrl);
    globals.client = new utils.discord.Client(secret.discord.token, config.discord.intents);

    utils.loadEvents(); // Load events
    utils.loadCommands() // Load commands
    // TODO: load commands, check registered commands through api and create/delete commands if necessary
    // await utils.registerCommands() // Register commands if necessary

    // TODO: make good
    process.on("SIGINT", async () => {
        utils.logger.closing("Closing bot");
        globals.client.close();
        process.exit();
    });
})();