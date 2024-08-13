import React from "react";
import { Switch } from "antd";

const RadioButton = ({
  checked,
  onChange,
  size,
  onClick,
  disabled,
  prefixCls,
  className,
  rootClassName,
  checkedChildren,
  unCheckedChildren,
  value,
}) => (
  <Switch
    size={size}
    prefixCls={prefixCls}
    className={className}
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
