const colors = require("./src/utils/colors");

const config = {
    debug: true,
    secretPath: ".secret",
    discord: {
        gatewayUrl: "wss://gateway.discord.gg",
        gatewayVersion: 10,
        apiUrl: "https://discord.com/api",
        apiVersion: 10
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
        }
    }
}

module.exports = config;