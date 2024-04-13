// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
// https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
module.exports = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    // Foreground
    fgBlack: "\x1b[30m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgYellow: "\x1b[33m",
    fgBlue: "\x1b[34m",
    fgMagenta: "\x1b[35m",
    fgCyan: "\x1b[36m",
    fgWhite: "\x1b[37m",
    fgGray: "\x1b[90m",
    fgBrightBlack: "\x1b[90m", // Same as Gray
    fgBrightRed: "\x1b[91m",
    fgBrightGreen: "\x1b[92m",
    fgBrightYellow: "\x1b[93m",
    fgBrightBlue: "\x1b[94m",
    fgBrightMagenta: "\x1b[95m",
    fgBrightCyan: "\x1b[96m",
    fgBrightWhite: "\x1b[97m",

    // Background
    bgBlack: "\x1b[40m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m",
    bgBlue: "\x1b[44m",
    bgMagenta: "\x1b[45m",
    bgCyan: "\x1b[46m",
    bgWhite: "\x1b[47m",
    bgGray: "\x1b[100m",
    bgBrightBlack: "\x1b[100m", // Same as Gray
    bgBrightRed: "\x1b[101m",
    bgBrightGreen: "\x1b[102m",
    bgBrightYellow: "\x1b[103m",
    bgBrightBlue: "\x1b[104m",
    bgBrightMagenta: "\x1b[105m",
    bgBrightCyan: "\x1b[106m",
    bgBrightWhite: "\x1b[107m",

    string(string, fg, bg) {
        const fgColor = this[`fg${fg?.charAt(0)?.toUpperCase()}${fg?.substring(1)?.toLowerCase()}`] || "";
        const bgColor = this[`bg${bg?.charAt(0)?.toUpperCase()}${bg?.substring(1)?.toLowerCase()}`] || "";
        return `${fgColor}${bgColor}${string}${this.reset}`;
    }
}