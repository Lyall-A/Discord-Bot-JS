const consoleColors = require("./src/utils/consoleColors");

const config = {
    debug: true,
    secretPath: ".secret",
    lang: "en",
    langPath: "lang",
    discord: {
        gatewayUrl: "wss://gateway.discord.gg",
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
            suffix: `${consoleColors.reset}`
        },
        debug: {
            prefix: consoleColors.string("[DEBUG] ", "gray")
        },
        closing: {
            prefix: `\n${consoleColors.string("[CLOSING] ", "magenta")}`
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