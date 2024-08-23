import React from "react";
import { Row, Col } from "react-bootstrap";
import CalculatorFxDiscounting from "../../../components/features/calculatorFxDiscounting/CalculatorFxDiscounting";
import CalculatorNonFxDiscounting from "../../../components/features/calculatorNonFxDiscounting/CalculatorNonFxDiscounting";
import FwdCalculator from "../../../components/features/fwdCalculator/FwdCalculator";
import Header from "../../../components/layout/header/header";
import GlobalNavbar from "../../../components/layout/nav/Navbar";

const MainCalculator = () => {
  return (
    <>
      <GlobalNavbar />
      <div className="d-flex gap-0 mt-2 p-1">
        <CalculatorFxDiscounting />
        <CalculatorNonFxDiscounting />
        <FwdCalculator />
      </div>
    </>
  );
};

export default MainCalculator;
