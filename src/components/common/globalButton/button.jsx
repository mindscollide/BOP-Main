import React, { useState } from "react";
import { Button } from "antd";
const CustomButton = ({
  icon,
  type = "primary",
  shape,
  iconPosition,
  value,
  className,
  onClick,
  rootClassName,
  classNames,
  size,
  prefixCls,
}) => {
  return (
    <>
      <Button
        type={type}
        icon={icon}
        shape={shape}
        rootClassName={rootClassName}
        className={className}
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
