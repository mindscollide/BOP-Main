import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { UpdateVoltMeterStatusApi } from "@/container/pages/mainDealer/dealerActions";
import { useDispatch } from "react-redux";

// const Voltmeter = ({ activeValue, onSelect }) => {
const Voltmeter = () => {
  const dispatch = useDispatch();
  const buttons = [
    { value: 1, label: "01" },
    { value: 2, label: "02" },
    { value: 3, label: "03" },
    { value: 0, label: "off" },
  ];
  const [activeValue, setActiveValue] = useState(1);

  const handleButtonClick = (value) => {
    setActiveValue(value);

    // Prepare payload
    const Data = {
      VoltMeterID: value,
    };

    // Dispatch API action
    dispatch(UpdateVoltMeterStatusApi({ Data }));
  };

  const GetVoltMeterStatus = useSelector(
    (state) => state.dealerReducer.GetVoltMeterStatus
  );

  useEffect(() => {
    if (GetVoltMeterStatus !== null) {
      const active = GetVoltMeterStatus.voltMeterStatuses.find(
        (item) => item.isVolMeterActive === true
      );

      if (active?.volMeterID) {
        setActiveValue(active.voltMeterID);
      }
    }
  }, [GetVoltMeterStatus]);

  console.log(GetVoltMeterStatus, "GetVoltMeterStatus");
  return (
    <div className="vol-meter-container ">
      <div className="d-flex align-items-center vol-meter-inner-wrapper">
        <div className="heading-vol-meter fs-6 fw-semibold ff-poppins">
          Vol Meter
        </div>
        {buttons.map((button) => (
          <button
            key={button.value}
            className={`btn btn-default vol-meter ms-1 ${
              activeValue === button.value ? "active-vol" : ""
            } ${button.value === "off" ? "vol-meter-off" : ""}`}
            aria-pressed={activeValue === button.value}
            value={GetVoltMeterStatus?.voltMeterStatuses[0]?.isVolMeterActive}
            onClick={() => handleButtonClick(button.value)}
            tabIndex={0}
          >
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
