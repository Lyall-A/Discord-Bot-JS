// TODO: everything
const fs = require("fs");
const path = require("path");

config = require("../config"); // Config
secret = JSON.parse(fs.readFileSync(config.secretPath, "utf-8")); // Secret
// Load all utils
utils = { };
fs.readdirSync("./src/utils")
.filter(i => path.extname(i) == ".js")
.forEach(filename => {
    const name = path.basename(filename, path.extname(filename));
    utils[name] = require(`./utils/${filename}`);
});

const { logger } = utils;

(async () => {
    if (config.debug) {
        // Run all tests
        const testsDir = fs.readdirSync("./src/tests").filter(i => path.extname(i) == ".js");
        await (async function test(index) {
            if (!testsDir[index]) return;
            const filename = testsDir[index];
            const name = path.basename(filename, path.extname(filename));
            logger.debug(`Running test: ${name}`);
            await require(`./tests/${filename}`);
            return test(index+1);
        })(0);
    }

    // Connect to Discord
    const client = new utils.discord.Client(secret.discord.token, config.discord.intents);
    client.on("ready",
        data =>
            console.log("Logged in:", data.user.username));

    // TODO: make good
    process.on("SIGINT", async () => {
        client.close();
        process.exit();
    });
})();