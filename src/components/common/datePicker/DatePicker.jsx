import React from "react";
import DatePicker from "react-multi-date-picker";
import InputField from "../inputField/InputField";

const DatePickerCom = ({
  placeholder,
  value,
  onChange,
  applyClass,
  zIndex,
}) => {
  return (
    <DatePicker
      value={value}
      onChange={onChange}
      portal={true}
      zIndex={zIndex}
      render={<InputField placeholder={placeholder} applyClass={applyClass} />}
    />
  );
};

export default DatePickerCom;
