module.exports = (obj, def) => {
    if (typeof obj != "object") return def;
    
    return (function checkEntries(object = obj, defaultObj = def) {
        Object.entries(defaultObj).forEach(([key, value]) => {
            if (!object[key]) object[key] = value;
            else if (typeof value == "object") checkEntries(object[key], defaultObj[key]);
        });
        return object;
    })();
}