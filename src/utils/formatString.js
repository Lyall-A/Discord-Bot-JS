// %{variable}
// const { utils } = globals;
const escapeRegex = require("./escapeRegex");

module.exports = (string, obj) => {
    if (typeof obj == "object") Object.entries(obj).forEach(([key, value]) => {
        string = string.replace(new RegExp(`%\{${escapeRegex(key)}\}`, "g"), value);
    });
    return string;
}