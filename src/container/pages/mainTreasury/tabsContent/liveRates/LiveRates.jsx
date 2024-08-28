import React, { Suspense, lazy } from 'react'
import { Row, Col } from 'react-bootstrap'
import BankSpot from './bankSpot/BankSpot'
import MIS from './mis/Mis'

const shouldIncludeComponents = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const Blotter = shouldIncludeComponents
    ? lazy(() => import("./blotter/Blotter"))
    : null;

// if (import.meta.env.VITE_APP_INCLUDE_BRANCH === "true") {
//     const Branch = (await import("./container/pages/mainBranch/MainBranch"))
//       .default;

const LiveRates = () => {
    return (
        <>
            <Row className='m-0'>
                <Col md={6} className="px-1">
                    <BankSpot />
                </Col>
                <Col md={6} className="px-1">
                    <MIS />
                </Col>
            </Row>
            {Blotter && <Suspense fallback={<>Loading Blotter...</>}>
                <Blotter />

            </Suspense>}
        </>
    )
}

export default LiveRates