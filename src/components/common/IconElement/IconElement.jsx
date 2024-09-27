import React from "react";

const IconElement = ({ iconClass, applyClass, onClick }) => {
  return <i className={`${iconClass} ${applyClass}`} onClick={onClick}></i>;
};

export default IconElement;
