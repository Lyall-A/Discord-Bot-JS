const { utils, lang } = globals;

module.exports = (key, obj) => {
    if (!lang[key]) throw new Error(`Lang for '${key}' in not found`);
    return utils.parseString(lang[key], obj);
}