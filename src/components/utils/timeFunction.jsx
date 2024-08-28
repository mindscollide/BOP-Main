export function formatDateTimeToUTCTime(dateTimeStr) {
    // Extract year, month, day, hour, minute, second from the string
    const year = dateTimeStr.substring(0, 4);
    const month = dateTimeStr.substring(4, 6) - 1; // Months are 0-indexed in JS
    const day = dateTimeStr.substring(6, 8);
    const hour = dateTimeStr.substring(8, 10);
    const minute = dateTimeStr.substring(10, 12);
    const second = dateTimeStr.substring(12, 14);

    // Create a new Date object in UTC
    const date = new Date(Date.UTC(year, month, day, hour, minute, second));

    // Format the time in HH:MM:SS
    const formattedTime = date.toISOString().substring(11, 19); // Extracting the time part from ISO string

    return formattedTime;
}