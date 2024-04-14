const { constants } = globals;

module.exports = (date = new Date()) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const milliseconds = date.getMilliseconds();

    return {
        day,
        dayPad: day.toString().padStart(2, "0"),
        month: month + 1,
        monthPad: (month + 1).toString().padStart(2, "0"),
        monthString: constants.months[month],
        year,
        yearShort: year.toString().substring(2),
        hours,
        hoursPad: hours.toString().padStart(2, "0"),
        hours12: hours % 12,
        hours12Pad: (hours % 12).toString().padStart(2, "0"),
        pm: hours <= 12 ? false : true,
        amPm: hours <= 12 ? "AM" : "PM",
        minutes,
        minutesPad: minutes.toString().padStart(2, "0"),
        seconds,
        secondsPad: seconds.toString().padStart(2, "0"),
        milliseconds
    }
}