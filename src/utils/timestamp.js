// const { utils, config } = globals;
const objectDefaults = require("./objectDefaults");
const parseDate = require("./parseDate");
const formatString = require("./formatString");

module.exports = (date = new Date(), options) => {
    options = objectDefaults(options, {
        use12Hour: config.use12Hour,
        format: config.timestampFormat
    });

    const parsedDate = parseDate(date);
    return formatString(options.format, {
        DD: parsedDate.dayPad,
        D: parsedDate.day,
        MM: parsedDate.monthPad,
        M: parsedDate.month,
        YYYY: parsedDate.year,
        YY: parsedDate.yearShort,
        hh: parsedDate.hoursPad,
        hh12: parsedDate.hours12Pad,
        h: parsedDate.hours,
        h12: parsedDate.hours12,
        amPM: parsedDate.amPm,
        mm: parsedDate.minutesPad,
        m: parsedDate.minutes,
        s: parsedDate.seconds,
        ss: parsedDate.secondsPad,
        ms: parsedDate.milliseconds
    });
}