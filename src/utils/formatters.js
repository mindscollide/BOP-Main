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
  