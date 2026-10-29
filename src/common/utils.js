// utils/secureFormData.js
import CryptoJS from "crypto-js";

// Function to set custom headers
// Function to set custom headers
export const setCustomHeaders = (isDoc, ext) => {
  const token = localStorage.getItem("token");

  const extensionToContentType = {
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    txt: "text/plain",
  };

  try {
    const headers = {};

    if (isDoc && ext && extensionToContentType[ext]) {
      headers["Content-Type"] = extensionToContentType[ext];
      headers["Content-Disposition"] = `attachment; filename=template.${ext}`;
    } else {
      headers["Content-Type"] = "multipart/form-data";
    }

    return headers;
  } catch (error) {
    console.error("Error setting headers:", error);
    return {};
  }
};

export const emailValidation = (text) => {
  // Correct regex pattern for email validation
  let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test if the input text matches the regex pattern
  const isValid = emailRegex.test(text);

  return isValid; // Return true if valid, false otherwise
};

export const bopEmailValidation = (text) => {
  // Email must be a valid address with the domain fixed to bop.com.pk
  // let bopEmailRegex = /^[a-zA-Z0-9._%+-]+@bop\.com\.pk$/i;
  const bopEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return bopEmailRegex.test(text);
};

export const roleBasedNavigation = (navigate, roleID) => {
  // 1	Bank
  // 2	Corporate
  // 3	Broker
  // 6	Auditor
  // 7	Dealer
  // 8	Treasury
  // 9	Branch
  if (roleID === 1) {
  } else if (roleID === 2) {
    navigate("/BOP/corporate");
  } else if (roleID === 3) {
  } else if (roleID === 6) {
  } else if (roleID === 7) {
    navigate("/BOP/dealer");
  } else if (roleID === 8) {
    navigate("/BOP/treasury");
  } else if (roleID === 9) {
    navigate("/BOP/branch");
  }
};

export const getCookieValue = (cookieName) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === cookieName) {
      return value;
    }
  }
  return null; // Return null if the cookie is not found
};

// Utility to format date as "Wed, May 31, 2023"
export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// utils/crypto.js
export const xorEncryptDecrypt = (input, key) => {
  let out = "";
  for (let i = 0; i < input.length; i++) {
    out += String.fromCharCode(
      input.charCodeAt(i) ^ key.charCodeAt(i % key.length),
    );
  }
  return out;
};
export const encrypt = (data, key) => {
  try {
    const encrypted = xorEncryptDecrypt(data, key);
    return btoa(encrypted); // base64 encode
  } catch (e) {
    console.log("Encrypt Error:", e);
    return null;
  }
};

export const decrypt = (data, key) => {
  try {
    const decoded = atob(data); // base64 decode
    return xorEncryptDecrypt(decoded, key);
  } catch (e) {
    console.log("Decrypt Error:", e);
    return null;
  }
};

/**
 * Converts FormData to a plain object
 */
const formDataToObject = (formData) => {
  const obj = {};
  for (const [key, value] of formData.entries()) {
    obj[key] = value;
  }
  return obj;
};

/**
 * Converts plain object back to FormData
 */
const objectToFormData = (obj) => {
  const form = new FormData();
  for (const key in obj) {
    form.append(key, obj[key]);
  }
  return form;
};

/**
 * Encrypt FormData using AES
 */
export const encryptFormData = (formData, key) => {
  const plainObj = formDataToObject(formData);
  const jsonString = JSON.stringify(plainObj);
  const encrypted = CryptoJS.AES.encrypt(jsonString, key).toString();
  return encrypted;
};

/**
 * Decrypt AES-encrypted FormData
 */
export const decryptFormData = (encrypted, key) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  const parsed = JSON.parse(decryptedText);
  return objectToFormData(parsed);
};

// utils/dateUtils.js (or inside same file if small)
export const calculateDates = (tenorDays, optionDays) => {
  const today = new Date();
  let tenorDt = new Date(today);
  let optionDt = new Date(today);

  const tenorNum = parseInt(tenorDays || "0", 10);
  const optionNum = parseInt(optionDays || "0", 10);

  if (!tenorNum && !optionNum) {
    // Case 1: both empty
    tenorDt = today;
    optionDt = today;
  } else if (tenorNum && !optionNum) {
    // Case 2: only tenor filled
    tenorDt.setDate(today.getDate() + tenorNum);
    optionDt = new Date(tenorDt);
  } else if (!tenorNum && optionNum) {
    // Case 3: only option filled
    tenorDt = today;
    optionDt.setDate(today.getDate() + optionNum);
  } else {
    // Case 4: both filled
    tenorDt.setDate(today.getDate() + tenorNum);
    optionDt = new Date(tenorDt);
    optionDt.setDate(optionDt.getDate() + optionNum);
  }

  return { tenorDt, optionDt };
};

export const isWeekend = (date) => {
  const day = date.getDay(); // 0 = Sunday, 6 = Saturday
  return day === 0 || day === 6;
};

export const isHolidayForInstrument = (
  selectedDate,
  selectedInstrumentId,
  holidays = [],
) => {
  if (!selectedDate || !selectedInstrumentId || holidays.length === 0)
    return false;

  const selected = new Date(selectedDate).toDateString();

  return holidays.some((holiday) => {
    const holidayDate = new Date(holiday.holidayDate).toDateString();

    return (
      holidayDate === selected &&
      holiday.currencyIds.includes(selectedInstrumentId)
    );
  });
};

// Utility function (from previous step)
export const isHolidayTwoDatesForInstrument = (
  selectedDatesObj,
  selectedInstrumentId,
  holidays = [],
) => {
  if (!selectedDatesObj || !selectedInstrumentId || holidays.length === 0)
    return false;

  const datesArray = Object.values(selectedDatesObj).filter(Boolean);
  const normalizedSelectedDates = datesArray.map((date) =>
    new Date(date).toDateString(),
  );

  return holidays.some((holiday) => {
    const holidayDate = new Date(holiday.holidayDate).toDateString();
    return (
      normalizedSelectedDates.includes(holidayDate) &&
      holiday.currencyIds.includes(selectedInstrumentId)
    );
  });
};

export const encryptField = async (clearText) => {
  const encryptionKey = import.meta.env.VITE_BOP_KEY;

  // Same salt as C#
  const salt = new Uint8Array([
    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65,
    0x76,
  ]);

  // Same as Encoding.Unicode.GetBytes(clearText)
  const encoder = new TextEncoder();

  // TextEncoder gives UTF-8, but C# Encoding.Unicode is UTF-16LE.
  const utf16Bytes = new Uint8Array(clearText.length * 2);

  for (let i = 0; i < clearText.length; i++) {
    const code = clearText.charCodeAt(i);

    utf16Bytes[i * 2] = code & 0xff;
    utf16Bytes[i * 2 + 1] = code >> 8;
  }

  // Import password for PBKDF2
  const passwordKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(encryptionKey),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  /*
   * IMPORTANT:
   * The iteration count must match your .NET version.
   *
   * For older .NET Framework implementations, the default was
   * commonly 1000 iterations.
   */
  const iterations = 1000;

  // C#:
  //
  // pdb.GetBytes(32)
  // pdb.GetBytes(16)
  //
  // means we need 48 bytes from PBKDF2.
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-1",
    },
    passwordKey,
    48 * 8,
  );

  const derivedBytes = new Uint8Array(derivedBits);

  // First 32 bytes = AES key
  const aesKeyBytes = derivedBytes.slice(0, 32);

  // Next 16 bytes = IV
  const iv = derivedBytes.slice(32, 48);

  const aesKey = await crypto.subtle.importKey(
    "raw",
    aesKeyBytes,
    {
      name: "AES-CBC",
    },
    false,
    ["encrypt"],
  );

  // AES-CBC automatically applies PKCS#7-style padding
  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv,
    },
    aesKey,
    utf16Bytes,
  );

  // Convert ArrayBuffer -> Base64
  const encryptedBytes = new Uint8Array(encrypted);

  let binary = "";

  encryptedBytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

// =========================
// DECRYPT
// =========================

export const decryptField = async (encryptedText) => {
  const encryptionKey = import.meta.env.VITE_BOP_KEY;

  // Same salt as C#
  const salt = new Uint8Array([
    0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65,
    0x76,
  ]);

  const iterations = 1000;

  const binaryString = atob(encryptedText);

  const encryptedBytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    encryptedBytes[i] = binaryString.charCodeAt(i);
  }

  const passwordKey = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(encryptionKey),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-1",
    },
    passwordKey,
    48 * 8,
  );

  const derivedBytes = new Uint8Array(derivedBits);

  const keyBytes = derivedBytes.slice(0, 32);
  const iv = derivedBytes.slice(32, 48);

  const aesKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    {
      name: "AES-CBC",
    },
    false,
    ["decrypt"],
  );

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    aesKey,
    encryptedBytes,
  );

  const decryptedBytes = new Uint8Array(decrypted);

  let result = "";

  for (let i = 0; i < decryptedBytes.length; i += 2) {
    const charCode = decryptedBytes[i] | (decryptedBytes[i + 1] << 8);

    result += String.fromCharCode(charCode);
  }

  return result;
};
