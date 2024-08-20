import React from "react";
import Select from "react-select";
import "./SelectDropdown.css"
const SelectDropdown = ({
  options,
  className,
  classNamePrefix,
  components,
  closeMenuOnSelect,
  closeMenuOnScroll,
  maxMenuHeight,
  isDisabled,
  placeholder,
  value,
  isSearchable,
  menuPlacement,
  filterOptions,
  menuIsOpen,
}) => {
  return (
    <Select
      menuIsOpen={menuIsOpen}
      options={options}
      className={className}
      classNamePrefix={classNamePrefix}
      components={components}
      closeMenuOnSelect={closeMenuOnSelect}
      closeMenuOnScroll={closeMenuOnScroll}
      maxMenuHeight={maxMenuHeight}
      isDisabled={isDisabled}
      isSearchable={isSearchable || false}
      menuPlacement={menuPlacement || "bottom"}
      placeholder={placeholder}
      value={value}
      pageSize={0}
      filterOption={filterOptions}
    />
  );
};

export default SelectDropdown;
