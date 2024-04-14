const consoleColors = require("./src/utils/consoleColors");

const config = {
    debug: true,
    secretPath: ".secret",
    lang: "en",
    langPath: "lang",
    shard: 0,
    discord: {
        gatewayUrl: "wss://gateway.discord.gg", // Set this to null to grab the gateway URL on startup
        // shards: 1, // Set this to null to use the recommended number of shards (this will ignore gatewayUrl)
        gatewayVersion: 10,
        apiUrl: "https://discord.com/api",
        apiVersion: 10,
        properties: {
            browser: "https://github.com/Lyall-A/Discord-Bot-JS"
        },
        presence: {
            activities: [{
                name: "🔥",
                type: 5
            }]
        },
        intents: [
            "GUILDS",
            "GUILD_MODERATION",
            "GUILD_EMOJIS_AND_STICKERS",
            "GUILD_INTEGRATIONS",
            "GUILD_WEBHOOKS",
            "GUILD_INVITES",
            "GUILD_VOICE_STATES",
            "GUILD_MESSAGES",
            "GUILD_MESSAGE_REACTIONS",
            "GUILD_MESSAGE_TYPING",
            "DIRECT_MESSAGES",
            "DIRECT_MESSAGE_REACTIONS",
            "DIRECT_MESSAGE_TYPING",
            "GUILD_SCHEDULED_EVENTS"
        ]
    },
    timestampFormat: "%{DD}/%{MM}/%{YYYY} %{hh12}:%{mm} %{amPM}",
    logTimestampFormat: `${consoleColors.string(`[%{timestamp}] `, "green")}`,
    logTimestamp: true,
    logFiles: true,
    logFileName: "%{DD}-%{MM}-%{YY} %{hh}-%{mm}-%{ss} %{ms}.log",
    logFilesDelete: 7 * 24 * 60 * 60 * 1000, // 1 week, 7 (days), 24 (hours), 60 (minutes), 60 (seconds), 1000 (milliseconds)
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