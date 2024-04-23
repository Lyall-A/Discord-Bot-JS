const fs = require("fs");
const path = require("path");

// const { config } = globals;

module.exports = () => {
    fs.readdirSync(config.logPath).forEach(log => {
        const logPath = path.join(config.logPath, log);
        const stats = fs.lstatSync(logPath);
        if (Date.now() - stats.mtimeMs > config.logFilesDelete) fs.rmSync(logPath);
    });
}