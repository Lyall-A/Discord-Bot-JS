// %{variable}
const { utils } = globals;
module.exports = (string, obj) => {
    Object.entries(obj).forEach(([key, value]) => {
        string = string.replace(new RegExp(`%\{${utils.escapeRegex(key)}\}`, "g"), value);
    });
    return string;
}