import React from 'react'
import { Row, Col } from 'react-bootstrap'
import BankSpot from './bankSpot/BankSpot'
import MIS from './mis/Mis'

const LiveRates = () => {
    return (
        <Row className='m-0'>
            <Col md={6} className="px-1">
                <BankSpot />
            </Col>
            <Col md={6} className="px-1">
                <MIS />
            </Col>
        </Row>
    )
}

export default LiveRates