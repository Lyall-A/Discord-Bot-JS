// TODO: fix error when no query is in URL
module.exports = string => Object.fromEntries(string.split("?")[1].split("&").map(i => i.split("=")));