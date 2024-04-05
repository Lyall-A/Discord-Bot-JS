// TODO: everything
const http = require("http");
const https = require("https");

module.exports = (url, options) => {
    return new Promise((resolve, reject) => {
        const parsedUrl = parseUrl(url);
        console.log(parsedUrl)
    });
}