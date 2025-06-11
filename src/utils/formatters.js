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

export const formatPercentageInput = (value) => {
  const num = parseFloat(value);

  if (!isNaN(num) && num >= 1 && num <= 100) {
    return num.toString();
  }

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
