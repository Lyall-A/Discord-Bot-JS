const { utils, lang } = globals;

module.exports = (key, obj) => {
    if (!lang[key]) throw new Error(`Lang for '${key}' in not found`);
    return utils.formatString(lang[key], obj);
}