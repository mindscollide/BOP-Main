import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import CalculatorFxDiscounting from "../../../components/features/calculatorFxDiscounting/CalculatorFxDiscounting";
import CalculatorNonFxDiscounting from "../../../components/features/calculatorNonFxDiscounting/CalculatorNonFxDiscounting";
import FwdCalculator from "../../../components/features/fwdCalculator/FwdCalculator";
import GlobalNavbar from "../../../components/layout/nav/Navbar";

const MainCalculator = () => {
  return (
    <>
      <Container fluid className="page-gutter">
        <Row>
          <Col className="ps-2 pe-2 mb-2">
            <Row className="m-0">
              <Col className="px-1 mb-2">
                <CalculatorFxDiscounting />
              </Col>
              <Col className="px-1 mb-2">
                <CalculatorNonFxDiscounting />
              </Col>
              <Col className="px-1 mb-2">
                <FwdCalculator />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      {/* <div className="p-2 pe-2"> */}

      {/* </div> */}
    </>
  );
};

export default MainCalculator;
