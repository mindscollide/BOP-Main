import React, { Suspense, lazy, startTransition } from "react";
import { Row, Col } from "react-bootstrap";
import SectionLoader from "@/components/common/loader/SectionLoader";

const shouldIncludeComponents = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
const shouldIsDealer = import.meta.env.VITE_APP_INCLUDE_DEALER === "true";

const Blotter = lazy(() => import("@/components/features/blotter/Blotter"));
const BankSpot = lazy(() => import("./bankSpot/BankSpot"));
const MISComponent = lazy(() => import("./mis/Mis"));

const LiveRates = () => {
  return (
    <>
      <Row className='m-0'>
        <Col md={6} className='p-0 bg-white position-relative'>
          <Suspense fallback={<SectionLoader />}>
            <BankSpot />
          </Suspense>
        </Col>
        <Col md={6} className='px-1'>
          <Suspense fallback={<SectionLoader />}>
            <MISComponent />
          </Suspense>
        </Col>
      </Row>
      {!shouldIsDealer && (
        <Suspense fallback={<SectionLoader />}>
          <Blotter />
        </Suspense>
      )}
    </>
  );
};

export default LiveRates;