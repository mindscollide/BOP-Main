import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UpdateVoltMeterStatusApi } from "@/container/pages/mainDealer/dealerActions";
import { useDispatch } from "react-redux";
import { setUpdateVolMeterRealtime } from "@/store/dealerReducer/dealerSlicer";

/**
 * Voltmeter Component
 *
 * A control panel for managing voltmeter status with interactive buttons.
 * Displays current voltmeter status and allows changing between channels or turning off.
 * Integrates with Redux for state management and API communication.
 */
const Voltmeter = () => {
  // Initialize Redux dispatch hook
  const dispatch = useDispatch();

  // Get current voltmeter status from Redux store
  const GetVoltMeterStatus = useSelector(
    (state) => state.dealerReducer.GetVoltMeterStatus
  );

  // Get realtime voltmeter updates from Redux store
  const GetVoltMeterStatusRealtime = useSelector(
    (state) => state.dealerReducer.GetVoltMeterStatusRealtime
  );

  // Button configuration for the voltmeter control
  const buttons = [
    { value: 1, label: "01" }, // Channel 1
    { value: 2, label: "02" }, // Channel 2
    { value: 3, label: "03" }, // Channel 3
    { value: 0, label: "off" }, // Off state
  ];

  // Local state to track the currently active voltmeter value
  const [activeValue, setActiveValue] = useState(null);

  console.log(activeValue, "activeValueactiveValue");

  /**
   * Handles button clicks on voltmeter controls
   * @param {number} value - The selected voltmeter value (0-3)
   */
  const handleButtonClick = (value) => {
    // Update local state immediately for responsive UI
    setActiveValue(value);

    // Prepare payload for API call
    const Data = {
      VoltMeterID: value, // Send the selected voltmeter ID
    };

    // Dispatch API action to update voltmeter status on server
    dispatch(UpdateVoltMeterStatusApi({ Data }));
  };

  /**
   * Effect hook to handle realtime voltmeter status updates
   * Runs whenever GetVoltMeterStatusRealtime changes
   */
  useEffect(() => {
    if (GetVoltMeterStatusRealtime !== null) {
      console.log(GetVoltMeterStatusRealtime, "GetVoltMeterStatusRealtime");
      try {
        // Find the currently active voltmeter in realtime data
        const active = GetVoltMeterStatusRealtime.statuses.find(
          (item) => item.isVolMeterActive === true
        );

        // If active voltmeter found, update local state
        if (active !== undefined) {
          setActiveValue(active.voltMeterID);
        } else {
          setActiveValue(0);
        }
        // Reset realtime update flag in Redux store
        dispatch(setUpdateVolMeterRealtime(null));
      } catch (error) {
        console.error("Error processing realtime voltmeter update:", error);
      }
    }
  }, [GetVoltMeterStatusRealtime]);

  /**
   * Effect hook to handle initial voltmeter status
   * Runs when GetVoltMeterStatus changes (initial load)
   */
  useEffect(() => {
    if (GetVoltMeterStatus !== null) {
      try {
        // Find the currently active voltmeter in initial status data
        const active = GetVoltMeterStatus.voltMeterStatuses.find(
          (item) => item.isVolMeterActive === true
        );
        // If active voltmeter found, update local state
        if (active !== undefined) {
          setActiveValue(active?.voltMeterID);
        } else {
          setActiveValue(0);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [GetVoltMeterStatus]);

  return (
    <div className="vol-meter-container">
      <div className="d-flex align-items-center vol-meter-inner-wrapper">
        {/* Voltmeter title/heading */}
        <div className="heading-vol-meter fs-6 fw-semibold ff-poppins">
          Vol Meter
        </div>

        {/* Render voltmeter control buttons */}
        {buttons.map((button) => (
          <button
            className={`btn btn-default vol-meter ms-1 ${
              activeValue === button.value ? "active-vol" : ""
            } ${button.value === 0 ? "vol-meter-off" : ""}`} // Special class for 'off' button
            onClick={() => handleButtonClick(button.value)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Voltmeter;
