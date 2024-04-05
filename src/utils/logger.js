// TODO: finish
const objectDefaults = require("./objectDefaults");

function logger(msg, options) {
    options = objectDefaults(options, {
        stream: process.stdout,
        prefix: "",
        suffix: "",
        carriageReturn: false,
        newLine: true
    });
    options.stream.write(`${options.prefix}${msg}${options.suffix}${options.carriageReturn ? "\r" : ""}${options.newLine ? "\n" : ""}`); // {prefix?}{message}{suffix?}{carriage return?}{new line?}
}

module.exports = logger;