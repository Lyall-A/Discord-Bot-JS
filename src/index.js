// TODO: everything
// require("./global");
// http("https://google.com").then(i => console.log("s", i)).catch(err => console.log("e", err))
const fs = require("fs");
const path = require("path");

const config = require("../config.json");
const secret = JSON.parse(fs.readFileSync(config.secretPath, "utf-8"));
console.log(secret);