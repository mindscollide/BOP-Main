import React from "react";
import { Switch } from "antd";
import "./SwitchBtn.css"
const RadioButton = ({
  checked,
  onChange,
  size,
  onClick,
  disabled,
  className,
  rootClassName,
  checkedChildren,
  unCheckedChildren,
  value,
}) => (
  <Switch
    size={size}
    className={"switchBtn"}
    rootClassName={rootClassName}
    onClick={onClick}
    disabled={disabled}
    checked={checked}
    value={value}
    onChange={onChange}
    checkedChildren={checkedChildren}
    unCheckedChildren={unCheckedChildren}
  />
);
export default RadioButton;
