export function getFormattedDateTime(utcTimeString, format) {
    const date = new Date(utcTimeString);

    const map = {
        "D": date.getUTCDate(),
        "DD": String(date.getUTCDate()).padStart(2, '0'),
        "M": date.getUTCMonth() + 1,
        "MM": String(date.getUTCMonth() + 1).padStart(2, '0'),
        "YYYY": date.getUTCFullYear(),
        "YY": String(date.getUTCFullYear()).slice(-2),
        "HH": String(date.getUTCHours()).padStart(2, '0'),
        "mm": String(date.getUTCMinutes()).padStart(2, '0'),
        "ss": String(date.getUTCSeconds()).padStart(2, '0')
    };

    return format.replace(/D{1,2}|M{1,2}|YYYY|YY|HH|mm|ss/g, matched => map[matched]);
}



export function parseDate(dateStr) {
    if (!dateStr) return null;

    // Try ISO first
    let date = new Date(dateStr);
    if (!isNaN(date)) return date;

    // Fallback for "D.M.YYYY HH:mm:ss"
    const [datePart, timePart = "00:00:00"] = dateStr.split(' ');
    const [day, month, year] = datePart.split('.').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);

    date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    return isNaN(date) ? null : date;
}
