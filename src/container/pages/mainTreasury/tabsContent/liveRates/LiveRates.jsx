import React, { Suspense, lazy } from "react";
import { Row, Col } from "react-bootstrap";
import MIS from "./mis/Mis";
import SectionLoader from "@/components/common/loader/SectionLoader";

const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const shouldIsDealer = import.meta.env.VITE_APP_INCLUDE_DEALER === "true";

const Blotter = lazy(() => import("@/components/features/blotter/Blotter"));

const BankSpot = lazy(() => import("./bankSpot/BankSpot"));
const MISComponent = lazy(() => import("./mis/Mis"));
// if (import.meta.env.VITE_APP_INCLUDE_BRANCH === "true") {
//     const Branch = (await import("./container/pages/mainBranch/MainBranch"))
//       .default;

const LiveRates = () => {
  return (
    <>
      <Row className='m-0'>
        <Col md={6} className='p-0 bg-white position-relative'>
          {BankSpot && (
            <Suspense
              fallback={
                <>
                  <SectionLoader />
                </>
              }>
              <BankSpot />
            </Suspense>
          )}
        </Col>
        <Col md={6} className='px-1'>
          <MISComponent />
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
