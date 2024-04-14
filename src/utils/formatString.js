// %{variable}
const { utils } = globals;
module.exports = (string, obj) => {
    if (typeof obj == "object") Object.entries(obj).forEach(([key, value]) => {
        string = string.replace(new RegExp(`%\{${utils.escapeRegex(key)}\}`, "g"), value);
    });
    return string;
}