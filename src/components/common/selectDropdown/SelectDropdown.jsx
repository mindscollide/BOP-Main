import React from "react";
import Select from "react-select";
import "./SelectDropdown.css";
let DummyOptions = [
  { label: "Test1", value: 1 },
  { label: "Test2", value: 2 },
];
const SelectDropdown = ({
  options = DummyOptions,
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
  menuPosition = "fixed",
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
      menuPosition={menuPosition}
      filterOption={filterOptions}
    />
  );
};

export default SelectDropdown;
