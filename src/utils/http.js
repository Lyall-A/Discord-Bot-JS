// TODO: finish
const http = require("http");
const https = require("https");

const objectDefaults = require("./objectDefaults");
const parseUrl = require("./parseUrl");

module.exports = (url, options) => {
    options = objectDefaults(options);

    return new Promise((resolve, reject) => {
        const parsedUrl = objectDefaults(parseUrl(url), {
            protocol: "http"
        });
        
        if (parsedUrl.protocol != "http" && parsedUrl.protocol != "https") throw new Error("Unsupported protocol");
        if (!parsedUrl.host) throw new Error("No host");

        const httpOptions = {
            method: options.method,
            host: parsedUrl.host,
            port: parsedUrl.port,
            path: parsedUrl.path,
            ...options.httpOptions
        };

        (parsedUrl.protocol == "https" ? https : http).request(httpOptions);
    });
}