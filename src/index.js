// TODO: everything
const fs = require("fs");
const path = require("path");

config = require("../config"); // Config
secret = JSON.parse(fs.readFileSync(config.secretPath, "utf-8")); // Secret

// Globals
globals = {
    utils: { },
    client: { }
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
    utils.logger.info("Getting user");
    if ((await utils.discord.api("/users/@me")).status != 200) return utils.logger.error("Failed to get user, make sure token is correct");

    // Connect to Discord
    globals.client = new utils.discord.Client(secret.discord.token, config.discord.intents);

    utils.loadEvents(); // Load events
    // TODO: load commands, check registered commands through api and create/delete commands if necessary

    // TODO: make good
    process.on("SIGINT", async () => {
        utils.logger.closing("Closing bot");
        globals.client.close();
        process.exit();
    });
})();