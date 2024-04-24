const consoleColors = require("./src/utils/consoleColors");

const config = {
    debug: true, // TODO: does nothing lol
    eventsPath: "Events",
    commandsPath: "Commands",
    guildCommandsPath: "Guild Commands",
    langPath: "Language",
    logPath: "Logs",
    secretPath: ".secret",
    lang: "en",
    shard: 0,
    discord: {
        gatewayUrl: null/*"wss://gateway.discord.gg"*/, // Set this to null to grab the gateway URL on startup
        // shards: 1, // Set this to null to use the recommended number of shards (this will ignore gatewayUrl)
        gatewayVersion: 10,
        apiUrl: "https://discord.com/api",
        apiVersion: 10,
        properties: {
            // browser: "https://github.com/Lyall-A/Discord-Bot-JS"
        },
        presence: {
            activities: [{
                name: "🔥",
                type: 5
            }]
        },
        intents: [
            "GUILDS"
        ]
    },
    timestampFormat: "%{DD}/%{MM}/%{YYYY} %{hh12}:%{mm} %{amPM}",
    logTimestampFormat: `${consoleColors.string(`[%{timestamp}] `, "green")}`,
    logTimestamp: true,
    logFiles: false,
    logFileName: "%{DD}-%{MM}-%{YY} %{hh}-%{mm}-%{ss} %{ms}.log",
    logFilesDelete: 24 * 60 * 60 * 1000, // Delete logs after x milliseconds. 24 (hours), 60 (minutes), 60 (seconds), 1000 (milliseconds)
    logFilesCheck: 1 * 60 * 60 * 1000, // Check for outdated logs every x milliseconds. 1 (hours), 60 (minutes), 60 (seconds), 1000 (milliseconds)
    logger: {
        info: {
            prefix: consoleColors.string("[INFO] ", "cyan")
        },
        warn: {
            prefix: consoleColors.string("[WARN] ", "yellow")
        },
        error: {
            stream: process.stderr,
            prefix: `${consoleColors.string("[ERROR] ", "red")}${consoleColors.bgRed}`,
            suffix: `${consoleColors.reset}`,
            join: "\n"
        },
        debug: {
            prefix: consoleColors.string("[DEBUG] ", "gray")
        },
        closing: {
            prefix: `${consoleColors.string("[CLOSING] ", "magenta")}`,
            logFiles: false,
        }
    },
    owners: [
        "492729974026141697"
    ],
    channels: {
        status: "1097157431609532528"
    }
}

module.exports = config;