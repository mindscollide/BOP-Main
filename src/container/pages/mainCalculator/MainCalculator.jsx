import React, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import CalculatorFxDiscounting from "../../../components/features/calculatorFxDiscounting/CalculatorFxDiscounting";
import CalculatorNonFxDiscounting from "../../../components/features/calculatorNonFxDiscounting/CalculatorNonFxDiscounting";
import FwdCalculator from "../../../components/features/fwdCalculator/FwdCalculator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllCalculatorData } from "./CalculatorActions";

const MainCalculator = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Calling the api for getting Currency
  useEffect(() => {
    try {
      dispatch(GetAllCalculatorData({ navigate }));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);
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
    </>
  );
};

export default MainCalculator;
