// TODO: finish
const objectDefaults = require("./objectDefaults");

function create(options) {
    options = objectDefaults(options, {
        stream: process.stdout,
        prefix: "",
        suffix: "",
        newLine: true,
    });
    return function(msg) {
        return options.stream.write(`${options.prefix}${msg}${options.suffix}${options.newLine ? "\n" : ""}`); // {prefix?}{message}{suffix?}{new line?}
    }
}

const logger = create();

Object.entries(config.logger).forEach(([name, options]) => logger[name] = create(options));

module.exports = logger;