const http = require("http");
const https = require("https");

const { utils } = globals;

module.exports = (url, options) => {
    if (!url) throw new Error("No URL");
    options = utils.objectDefaults(options, {
        method: "GET"
    });

    return new Promise((resolve, reject) => {
        const parsedUrl = utils.objectDefaults(utils.parseUrl(url), {
            protocol: "http"
        });
        
        if (parsedUrl.protocol != "http" && parsedUrl.protocol != "https") throw new Error("Unsupported protocol");
        if (!parsedUrl.host) throw new Error("No host");

        const httpOptions = {
            method: options.method,
            host: parsedUrl.host,
            port: parsedUrl.port,
            path: parsedUrl.path,
            headers: options.headers,
            ...options.httpOptions
        };

        if (options.json) {
            options.body = JSON.stringify(options.json);
            httpOptions.headers = utils.objectDefaults(httpOptions.headers, { "Content-Type": "application/json" });
        }

        const req = (parsedUrl.protocol == "https" ? https : http).request(httpOptions, res => {
            function buffer() {
                return new Promise((resolve, reject) => {
                    let data = "";
                    res.on("data", i => data += i);
                    res.on("end", () => resolve(Buffer.from(data)));
                    res.on("error", err => reject(err));
                });
            }
            async function text() {
                return (await buffer()).toString();
            }
            async function json() {
                return JSON.parse(await text());
            }

            resolve({
                buffer,
                text,
                json,
                status: res.statusCode,
                statusMessage: res.statusMessage,
                raw: res
            });
        });

        req.end(options.body);

        req.on("error", err => reject(err));
    });
}