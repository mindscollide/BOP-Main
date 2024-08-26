import React from "react";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../common/globalButton/button";
import InputFIeld from "../../common/inputField/InputField";
import InputFieldWithTag from "../../common/inputFieldWithTag/InputFieldWithTag";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";

const FwdCalculator = () => {
  return (
    <>
      <div className="card-box h-auto">
        <div className="box-header bg-primary-orange px-2 color-white">
          <div className="d-flex align-items-center">
            <div className="fs-6 fw-bold">FWD Calculator</div>
            <div className="clc-btn-wrapper ms-auto">
              <CustomButton
                value="Calculate Rate"
                applyClass="calculatorButton"
              />
            </div>
          </div>
        </div>
        <div className="box-content-wrapper h-auto">
          <div className="d-flex align-items-center">
            <div className="flex-fill px-2 p-2">
              <label className="mt-1">Currency</label>
              <SelectDropdown />

              <label className="mt-1">Ready</label>
              <InputFIeld
                type="number"
                name="price"
                defaultValue="285.2635"
                applyClass={"CalculatorTextfield"}
              />

              <label className="mt-1">Tenor</label>
              <InputFieldWithTag
                type="text"
                value={"0"}
                placeholder="Enter value"
                applyClass="inputField-calculator"
                applyClassTag="tag-for-calculator"
                width="100%" // width of the entire container
                inputWidth="60%" // width of the input field
                tagText="Wed, May 31, 2023"
                tagWidth="40%" // width of the span
                tagClassName="yourTagClass"
              />

              <label className="mt-1">Libor</label>
              <InputFieldWithTag
                type="text"
                value={"0"}
                placeholder="Enter value"
                applyClass="inputField-calculator"
                applyClassTag="tag-for-calculator"
                width="100%" // width of the entire container
                inputWidth="90%" // width of the input field
                tagText="%"
                tagWidth="10%" // width of the span
                tagClassName="yourTagClass"
              />
            </div>
            <div className="px-2 text-center">
              <div className="clc-amount fs-4 fw-bold px-4 py-3 bg-dark-gray color-white">
                285.26
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FwdCalculator;
