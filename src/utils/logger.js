// TODO: append to files if enabled
const util = require("util");
const { config } = globals;
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
    });
    return function(...msg) {
        // options.stream.write(`${options.prefix}${options.format ? msg.map(i => util.format(i)).join(options.join) : msg.join(options.join)}${options.suffix}${options.newLine ? "\n" : ""}`); // {prefix?}{message}{suffix?}{new line?}
        // Write to stream
        options.stream.write(
            options.prefix,
            options.format ?
                msg.map(i => util.format(i)).join(options.join) :
                msg.join(options.join),
            options.suffix,
            options.newLine ? "\n" : "",
        );

        // Append to log file (TODO)
    }
}

const logger = create();

Object.entries(config.logger).forEach(([name, options]) => logger[name] = create(options));

module.exports = logger;