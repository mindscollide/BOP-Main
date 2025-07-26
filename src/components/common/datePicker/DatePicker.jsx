import React from "react";
import DatePicker from "react-multi-date-picker";
import InputField from "../inputField/InputField";

const DatePickerCom = ({
  placeholder,
  value,
  onChange,
  applyClass,
  zIndex,
  minDate,
  maxDate,
  className,
  format = "DD-MM-YYYY",
}) => {
  return (
    <DatePicker
      containerClassName='d-block'
      value={value}
      onChange={onChange}
      format={format}
      portal={true}
      minDate={minDate}
      className={className}
      maxDate={maxDate}
      zIndex={zIndex}
      render={<InputField placeholder={placeholder} applyClass={applyClass} />}
    />
  );
};

export default DatePickerCom;
