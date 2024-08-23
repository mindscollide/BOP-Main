import React from "react";
import styles from "./InputFieldWithTag.module.css";

const InputFieldWithTag = ({
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
  applyClassTag, //applyclass for tag
  width, // width for the entire container
  inputWidth, // width for the input field
  className,
  tagText, // text for the span
  tagWidth, // width for the span
  tagClassName, // className for the span
}) => (
  <div className={styles.container} style={{ width: width }}>
    <input
      value={value}
      type={type}
      onChange={onChange}
      pattern={pattern}
      placeholder={placeholder}
      className={`${styles[applyClass]} ${className}`}
      checked={checked}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
      required={required}
      onFocus={onFocus}
      style={{ width: inputWidth }}
    />
    <span
      className={`${styles[applyClassTag]} ${tagClassName}`}
      style={{ width: tagWidth }}
    >
      {tagText}
    </span>
  </div>
);

export default InputFieldWithTag;
