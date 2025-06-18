import React, { Suspense, lazy } from "react";
import { Row, Col } from "react-bootstrap";
import BankSpot from "./bankSpot/BankSpot";
import MIS from "./mis/Mis";

const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const shouldIsDealer = import.meta.env.VITE_APP_INCLUDE_DEALER === "true";

const Blotter = lazy(() => import("./blotter/Blotter"));

// if (import.meta.env.VITE_APP_INCLUDE_BRANCH === "true") {
//     const Branch = (await import("./container/pages/mainBranch/MainBranch"))
//       .default;

const LiveRates = () => {
  return (
    <>
      <Row className='m-0'>
        <Col md={6} className='px-1'>
          <BankSpot />
        </Col>
        <Col md={6} className='px-1'>
          <MIS />
        </Col>
      </Row>
      {Blotter && !shouldIsDealer ? (
        <Suspense fallback={<>Loading Blotter...</>}>
          <Blotter />
        </Suspense>
      ) : null}
    </>
  );
};

export default LiveRates;
