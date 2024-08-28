import React from "react";
import PropTypes from "prop-types";

const Voltmeter = ({ activeValue, onSelect }) => {
  const buttons = [
    { value: 1, label: "01" },
    { value: 2, label: "02" },
    { value: 3, label: "03" },
    { value: "off", label: "off" },
  ];

  const handleButtonClick = (value) => {
    onSelect(value);
  };

  return (
    <div className='vol-meter-container '>
      <div className='d-flex align-items-center vol-meter-inner-wrapper'>
        <div className='heading-vol-meter fs-6 fw-semibold ff-poppins'>
          Vol Meter
        </div>
        {buttons.map((button) => (
          <button
            key={button.value}
            className={`btn btn-default vol-meter ms-1 ${
              activeValue === button.value ? "active-vol" : ""
            } ${button.value === "off" ? "vol-meter-off" : ""}`}
            aria-pressed={activeValue === button.value}
            value={button.value}
            onClick={() => handleButtonClick(button.value)}
            tabIndex={0}>
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

Voltmeter.propTypes = {
  activeValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Voltmeter;
