import React from "react";
import { InputNumber } from "antd";

const InputFIeld =  ({ type, value,onChange ,pattern,placeholder,className,checked,disabled,maxLength,minLength,name,required}) => (
  <input
    value={value}
    type={type}
    onChange={onChange}
    pattern={pattern}
    placeholder={placeholder}
    className={className}
    checked={checked}
    disabled={disabled}
    maxLength={maxLength} minLength={minLength}
    name={name}
    required={required}

  />
);
export default InputFIeld;
