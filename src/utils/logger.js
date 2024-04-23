// TODO: delete logs
const util = require("util");
const fs = require("fs");
const path = require("path");

// const { config, utils, startDate } = globals;
const objectDefaults = require("./objectDefaults");
const timestamp = require("./timestamp");
const formatString = require("./formatString");

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
    return function (...msg) {
        // Write to stream

        const log =
            (options.timestamp ? timestamp(undefined, {
                format: formatString(options.timestampFormat, {
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

        if (options.logFiles) fs.appendFile(path.join(config.logPath, timestamp(startDate, {
            format: config.logFileName
        })), log.replace(/\x1b\[.*?m/g, ""), () => { });
    }
}

const logger = create();

Object.entries(config.logger).forEach(([name, options]) => logger[name] = create(options));

module.exports = logger;