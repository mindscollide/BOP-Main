import React from "react";

const TextArea = ({
  rows,
  cols,
  text,
  placeholder,
  className,
  name,
  onChange,
  maxLength,
  required,
}) => {
  return (
    <textarea
      rows={rows}
      cols={cols}
      className={`${className} ${"form-control"}`}
      name={name}
      onChange={onChange}
      required={required}
      maxLength={maxLength}
      placeholder={placeholder}
    >
      {text}
    </textarea>
  );
};

export default TextArea;
