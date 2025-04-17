export function getFormattedDateTime(utcTimeString, format) {
    const date = new Date(utcTimeString);

    const map = {
        "DD": String(date.getUTCDate()).padStart(2, '0'),
        "MM": String(date.getUTCMonth() + 1).padStart(2, '0'), // Months are zero-based
        "YYYY": date.getUTCFullYear(),
        "YY": String(date.getUTCFullYear()).slice(-2),
        "HH": String(date.getUTCHours()).padStart(2, '0'),
        "mm": String(date.getUTCMinutes()).padStart(2, '0'),
        "ss": String(date.getUTCSeconds()).padStart(2, '0')
    };

    return format.replace(/DD|MM|YYYY|YY|HH|mm|ss/g, matched => map[matched]);
}


export const parseDate = (dateString) => {
    // Спробуємо розпарсити вручну через роздільники
    if (!dateString) return null;

    const [day, month, yearAndTime] = dateString.split('.');
    const [year, time = '00:00:00'] = yearAndTime.split(' ');

    const formattedString = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`;
    const parsedDate = new Date(formattedString);

    return isNaN(parsedDate) ? null : parsedDate;
};