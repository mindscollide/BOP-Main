import React, { useState } from "react";
import styles from "./button.module.css";
import { Button } from "antd";
const CustomButton = ({
  icon,
  type = "primary",
  shape,
  iconPosition,
  value,
  onClick,
  rootClassName,
  classNames,
  size,
  prefixCls,
  applyClass,
  className,
}) => {
  return (
    <>
      <Button
        type={type}
        icon={icon}
        shape={shape}
        rootClassName={rootClassName}
        className={`${styles[applyClass]} ${className}`}
        classNames={classNames}
        prefixCls={prefixCls}
        size={size}
        onClick={onClick}
        iconPosition={iconPosition}>
        {value}
      </Button>
    </>
  );
};
export default CustomButton;
