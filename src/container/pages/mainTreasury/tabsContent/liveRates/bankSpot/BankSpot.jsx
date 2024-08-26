import React from 'react'
import GlobalTable from '../../../../../../components/common/table/GlobalTable';
import BidAmountBox from '../../../../../../components/common/bidAmountBox/BidAmountBox';

const BankSpot = () => {

    const tableData = [
        {
            key: '1',
            currencyPair: 'USDPKR',
            bid: '288',
            offer: '289',
            currency: 'USD',
            previousBid: '288',
            previousOffer: '289',
            time: '11:15:00',
        },
        {
            key: '2',
            currencyPair: 'EURPKR',
            bid: '308.60',
            offer: '308.85',
            currency: 'EUR',
            previousBid: '308.60',
            previousOffer: '308.85',
            time: '11:15:00',
        },
        {
            key: '3',
            currencyPair: 'GBPPKR',
            bid: '355.18',
            offer: '355.44',
            currency: 'GBP',
            previousBid: '355.18',
            previousOffer: '355.44',
            time: '11:15:00',
        },
        {
            key: '4',
            currencyPair: 'CNYPKR',
            bid: '40.76',
            offer: '40.80',
            currency: 'CNY',
            previousBid: '40.76',
            previousOffer: '40.80',
            time: '11:15:00',
        },
        {
            key: '5',
            currencyPair: 'JPYPKR',
            bid: '2.0727',
            offer: '2.0742',
            currency: 'JPY',
            previousBid: '2.0727',
            previousOffer: '2.0742',
            time: '11:15:00',
        },
        {
            key: '6',
            currencyPair: 'AUDPKR',
            bid: '188.45',
            offer: '188.60',
            currency: 'AUD',
            previousBid: '188.45',
            previousOffer: '188.60',
            time: '11:15:00',
        },
        {
            key: '7',
            currencyPair: 'USDPKR',
            bid: '288',
            offer: '289',
            currency: 'USD',
            previousBid: '288',
            previousOffer: '289',
            time: '11:15:00',
        },
        {
            key: '8',
            currencyPair: 'EURPKR',
            bid: '308.60',
            offer: '308.85',
            currency: 'EUR',
            previousBid: '308.60',
            previousOffer: '308.85',
            time: '11:15:00',
        },
        {
            key: '9',
            currencyPair: 'GBPPKR',
            bid: '355.18',
            offer: '355.44',
            currency: 'GBP',
            previousBid: '355.18',
            previousOffer: '355.44',
            time: '11:15:00',
        },
        {
            key: '10',
            currencyPair: 'CNYPKR',
            bid: '40.76',
            offer: '40.80',
            currency: 'CNY',
            previousBid: '40.76',
            previousOffer: '40.80',
            time: '11:15:00',
        },
        {
            key: '11',
            currencyPair: 'JPYPKR',
            bid: '2.0727',
            offer: '2.0742',
            currency: 'JPY',
            previousBid: '2.0727',
            previousOffer: '2.0742',
            time: '11:15:00',
        },
        {
            key: '12',
            currencyPair: 'AUDPKR',
            bid: '188.45',
            offer: '188.60',
            currency: 'AUD',
            previousBid: '188.45',
            previousOffer: '188.60',
            time: '11:15:00',
        },
    ];

    const columns = [
        {
            key: '1',
            title: 'Instrument',
            dataIndex: 'instrument',
            className: 'color-hd fw-bold title-col text-nowrap roboto-13',
            render: (text, record) => (
                <span>{text}</span>
            ),
        },
        {
            title: 'Bid',
            dataIndex: 'bid',
            key: 'bid',
            render: (text, record) => (
                <BidAmountBox applyClass={"BidCardBox"} spot={false} BidAmountValue={text} />
            ),
        },
        {
            title: 'Offer',
            dataIndex: 'offer',
            key: 'offer',
            render: (text, record) => (
                <BidAmountBox applyClass={"OfferCardBox"} spot={false} BidAmountValue={text} />
            ),
        },
        {
            title: '',
            dataIndex: 'currency',
            key: 'currency',
        },
        {
            title: 'Bid',
            dataIndex: 'previousBid',
            key: 'previousBid',
        },
        {
            title: 'Offer',
            dataIndex: 'previousOffer',
            key: 'previousOffer',
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
    ]

    return (
        <div className="card-box">

            <div className="box-header bg-primary-orange px-3">
                <div className="text-start color-white fw-bold fs-6">Bank Spot</div>
            </div>

            <div className="box-content-wrapper px-2">
                <GlobalTable
                    columns={columns}
                    dataSource={tableData}
                    prefixCls={"BankSpot_Table"}
                    // bordered
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default BankSpot