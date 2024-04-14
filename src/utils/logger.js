// TODO: delete logs
const util = require("util");
const fs = require("fs");

const { config, utils, startDate } = globals;
const objectDefaults = require("./objectDefaults");

function create(options) {
    options = objectDefaults(options, {
        stream: process.stdout,
        prefix: "",
        suffix: "",
        format: true,
        newLine: true,
        logFiles: config.logFiles,
        join: " ",
        timestamp: config.logTimestamp,
        timestampFormat: config.logTimestampFormat
    });
    return function(...msg) {
        // Write to stream

        const log = 
            (options.timestamp ? utils.timestamp(undefined, {
                format: utils.formatString(options.timestampFormat, {
                    timestamp: config.timestampFormat
                })
            }) : "") + // i am so sorry u had to read that
            options.prefix + 
            (options.format ?
                msg.map(i => util.format(i)).join(options.join) :
                msg.join(options.join)) + 
            options.suffix + 
            (options.newLine ? "\n" : "");

        options.stream.write(log);

        // Append to log file (TODO)
        if (options.logFiles) fs.appendFile(`./logs/${utils.timestamp(startDate, {
            format: config.logFileName
        })}`, log.replace(/\x1b\[.*?m/g, ""), () => { });
    }
}

const logger = create();

Object.entries(config.logger).forEach(([name, options]) => logger[name] = create(options));

module.exports = logger;