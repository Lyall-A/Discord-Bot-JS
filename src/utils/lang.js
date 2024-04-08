const { utils, lang } = globals;

module.exports = (key, obj) => utils.parseString(lang[key], obj);