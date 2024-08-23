import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";
import "./CalculatorFxDiscounting.css";

const CalculatorFxDiscounting = () => {
  return (
    <>
      <div className="col-4 px-1 mb-2">
        <div className="card-box h-auto">
          <div className="box-header Header-calculator px-2 color-white">
            <div className="d-flex align-items-center">
              <div className="fs-6 fw-bold">FX Discounting</div>
              <div className="clc-btn-wrapper ms-auto">
                <button
                  type="button"
                  className="btn btn-default clc-btn-fx-discounting"
                >
                  Calculate Rate
                </button>
              </div>
            </div>
          </div>
          <div className="box-content-wrapper h-auto">
            <div className="d-flex align-items-center">
              <div className="flex-fill px-2">
                {/* <FormGroup label="Currency">
                <select
                  className="select-option select2-hidden-accessible"
                  data-select2-id={1}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  {[
                    "USDPKR",
                    "EURPKR",
                    "GBPPKR",
                    "CNYPKR",
                    "JPYPKR",
                    "AUDPKR",
                  ].map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </FormGroup> */}
                <SelectDropdown />

                <FormGroup label="Ready">
                  <input
                    type="number"
                    name="price"
                    defaultValue="285.2635"
                    className="form-control form-control-sm"
                  />
                </FormGroup>

                <FormGroup label="Tenor">
                  <div className="input-group">
                    <input
                      type="number"
                      name="Tenor"
                      className="form-control form-control-sm"
                      defaultValue={0}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text text-nowrap">
                        Wed, May 31, 2023
                      </span>
                    </div>
                  </div>
                </FormGroup>

                <FormGroup label="Libor">
                  <div className="input-group">
                    <input
                      type="number"
                      name="Libor"
                      defaultValue={0}
                      className="form-control form-control-sm"
                    />
                    <div className="input-group-append">
                      <span className="input-group-text" id="basic-addon2">
                        %
                      </span>
                    </div>
                  </div>
                </FormGroup>
              </div>
              <div className="px-2 text-center">
                <div className="clc-amount fs-4 fw-bold px-4 py-3 bg-black color-white">
                  285.26
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FormGroup = ({ label, children }) => (
  <div className="form-group">
    <div className="fw-semibold">{label}</div>
    <div>{children}</div>
  </div>
);

export default CalculatorFxDiscounting;
