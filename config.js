const colors = require("./src/utils/colors");

const config = {
    debug: true,
    secretPath: ".secret",
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
            prefix: `${colors.fgCyan}[INFO]${colors.reset} `
        },
        warn: {
            prefix: `${colors.fgYellow}[WARN]${colors.reset} `
        },
        error: {
            stream: process.stderr,
            prefix: `${colors.fgRed}[ERROR]${colors.reset} ${colors.bgRed}`,
            suffix: `${colors.reset}`
        },
        debug: {
            prefix: `${colors.fgGray}[DEBUG]${colors.reset} `
        },
        closing: {
            prefix: `\n${colors.fgMagenta}[CLOSING]${colors.reset} `
        }
    }
}

module.exports = config;