import React from "react";
import { InputNumber } from "antd";
import styles from "./input.module.css";

const InputFIeld = ({
  type,
  value,
  onChange,
  pattern,
  placeholder,
  applyClass,
  checked,
  disabled,
  maxLength,
  minLength,
  name,
  required,
  onFocus,
  max,
  min
}) => (
  <input
    value={value}
    type={type}
    onChange={onChange}
    pattern={pattern}
    placeholder={placeholder}
    className={styles[applyClass]}
    checked={checked}
    disabled={disabled}
    maxLength={maxLength}
    minLength={minLength}
    max={max}
    min={min}
    name={name}
    required={required}
    onFocus={onFocus}
  />
);
export default InputFIeld;
