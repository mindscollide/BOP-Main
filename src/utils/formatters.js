import moment from "moment";

export const formatCurrencyInput = (value) => {
  if (!value) return ""; // Return empty string if no value

  // Remove non-numeric characters
  let cleanVal = value.replace(/[^0-9]/g, "");

  // Automatically add decimal if length is greater than 3
  if (cleanVal.length > 3) {
    let integerPart = cleanVal.slice(0, 3); // First 3 digits
    let decimalPart = cleanVal.slice(3, 5) || "00"; // Next 2 digits or default "00"
    return `${integerPart}.${decimalPart}`;
  }

  return cleanVal;
};

export const formatCurrencyInputForNegativeValAlso = (value) => {
  if (!value) return "";

  // Allow negative sign and digits only
  let cleanVal = value.replace(/[^0-9-]/g, "");

  // Automatically add decimal if length is greater than 3 (ignoring minus)
  const isNegative = cleanVal.startsWith("-");
  let digitsOnly = cleanVal.replace(/-/g, ""); // Remove minus for slicing

  if (digitsOnly.length > 3) {
    let integerPart = digitsOnly.slice(0, 3);
    let decimalPart = digitsOnly.slice(3, 5) || "00";
    return `${isNegative ? "-" : ""}${integerPart}.${decimalPart}`;
  }

  return cleanVal;
};

export const formatPercentageInput = (value) => {
  if (value === "") return ""; // Allow user to clear input

  // Remove all characters except digits and dot
  const cleanVal = value.replace(/[^0-9.]/g, "");

  // Prevent multiple decimal points
  const parts = cleanVal.split(".");
  if (parts.length > 2) return "0.1";

  const numValue = parseFloat(cleanVal);

  if (isNaN(numValue)) return "0.1";

  // Allow user to type any value from 0 to 100, but only accept 1-100 as valid
  if (numValue >= 0 && numValue <= 100) {
    return cleanVal; // Let the user keep entering up to 100
  }

  // If value is outside allowed range, return default
  return "0.1";
};

export const formatPercentageInput2 = (value) => {
  if (!value) return "";

  // Remove non-numeric and non-dot characters
  let cleanVal = value.replace(/[^\d]/g, "");

  // Insert decimal point after 3 digits, if more digits exist
  if (cleanVal.length > 3) {
    cleanVal = cleanVal.slice(0, 3) + "." + cleanVal.slice(3, 5); // Only 2 digits after decimal
  }

  // Trim to 3 before + 2 after decimal
  const match = cleanVal.match(/^(\d{1,3})(?:\.(\d{0,2}))?/);

  if (!match) return "";

  const beforeDecimal = match[1] || "0";
  const afterDecimal = match[2] || "";

  return afterDecimal ? `${beforeDecimal}.${afterDecimal}` : beforeDecimal;
};

export const formatDateToUTC = (date) => {
  return (
    date.getUTCFullYear().toString() +
    String(date.getUTCMonth() + 1).padStart(2, "0") +
    String(date.getUTCDate()).padStart(2, "0") +
    String(date.getUTCHours()).padStart(2, "0") +
    String(date.getUTCMinutes()).padStart(2, "0") +
    String(date.getUTCSeconds()).padStart(2, "0")
  );
};

export const convertDateTimeIntoGMT = (date) => {
  let dateString =
    date.slice(0, 4) +
    "-" +
    date.slice(4, 6) +
    "-" +
    date.slice(6, 8) +
    " " +
    date.slice(8, 10) +
    ":" +
    date.slice(10, 12) +
    ":" +
    date.slice(12, 14);
  console.log(
    moment(date, "YYYY-m-DD HH:MM:ss").toLocaleString(),
    "dateStringdateStringdateString"
  );
  return new Date(dateString);
};

export const ConvertDateTimrStringIntoGTM = (date, pattern) => {
  let ConvertIntoISO = moment(date, pattern).toISOString();
  console.log(ConvertIntoISO, "ConvertIntoISOConvertIntoISO");
  return new Date(ConvertIntoISO);
};

export const secureRandomString = (length = 16) => {
  return [...crypto.getRandomValues(new Uint8Array(length))]
    .map((b) => b.toString(36))
    .join("")
    .slice(0, length);
};

export function isValidNumberUnderMax(value, previousValue = "", max = 100) {
  if (/\s/.test(value)) return false; // Block spaces
  if (value === "" || value === null) return true;
  if (value === ".") return true;

  // Replace "05" style with "5"
  if (previousValue === "0" && /^[1-9]$/.test(value)) {
    return value;
  }

  // Allow numbers with up to 2 decimal places
  const regex = /^\d{1,3}(\.\d{0,2})?$/;
  if (!regex.test(value)) return false;

  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= max;
}

// allow 4 number after point
export function isValidMaxFourNumberAfterPoint(
  value,
  previousValue = "",
  max = 100
) {
  if (/\s/.test(value)) return false; // Block spaces
  if (value === "" || value === null) return true;
  if (value === ".") return true;

  // Replace "05" style with "5"
  if (previousValue === "0" && /^[1-9]$/.test(value)) {
    return value;
  }

  // Allow numbers with up to 4 decimal places
  const regex = /^\d{1,3}(\.\d{0,4})?$/;
  if (!regex.test(value)) return false;

  const num = parseFloat(value);
  return !isNaN(num) && num >= 0 && num <= max;
}

export const convertDateTimeIntoLocal = (utcDateString) => {
  const year = parseInt(utcDateString.slice(0, 4));
  const month = parseInt(utcDateString.slice(4, 6)) - 1; // JS months are 0-based
  const day = parseInt(utcDateString.slice(6, 8));
  const hour = parseInt(utcDateString.slice(8, 10));
  const minute = parseInt(utcDateString.slice(10, 12));
  const second = parseInt(utcDateString.slice(12, 14));

  // Create date in UTC
  const utcDate = new Date(Date.UTC(year, month, day, hour, minute, second));

  // Convert to local time string
  const localDateString = utcDate.toString(); // Uses system/browser local time

  console.log("Local Time:", localDateString);

  return utcDate;
};
