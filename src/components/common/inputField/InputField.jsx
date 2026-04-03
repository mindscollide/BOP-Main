import React, { forwardRef } from "react";
import styles from "./input.module.css";

const InputFIeld = forwardRef((props, ref) => {
  const {
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
    min,
    className,
    defaultValue,
    accept,
    onClick,
    onKeyDown,
    onBlur,
  } = props;

  return (
    <input
      ref={ref} // ✅ important
      value={value}
      type={type}
      onChange={onChange}
      defaultValue={defaultValue}
      pattern={pattern}
      placeholder={placeholder}
      className={`${styles[applyClass]} ${className}`}
      checked={checked}
      disabled={disabled}
      maxLength={maxLength}
      minLength={minLength}
      max={max}
      min={min}
      name={name}
      required={required}
      onFocus={onFocus}
      accept={accept}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  );
});

export default InputFIeld;
