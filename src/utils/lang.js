// const { utils, lang } = globals;
const formatString = require("./formatString");

module.exports = (key, obj) => {
    if (!lang[key]) throw new Error(`Lang for '${key}' in not found`);
    return formatString(lang[key], obj);
}