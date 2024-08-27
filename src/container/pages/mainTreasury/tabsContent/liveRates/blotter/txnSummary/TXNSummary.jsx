import React from 'react'
import GlobalTable from '../../../../../../../components/common/table/GlobalTable'

const TXNSummary = () => {

    const columns = [
        {
            key: "1",
            title: "TXN ID",
            className: "ff-poppins fw-bold",
            width: "113px"
        },
        {
            key: "2",
            title: "Client",
            className: "ff-poppins fw-bold"
        },
        {
            key: "3",
            title: "Side",
            className: "ff-poppins fw-bold"
        },
        {
            key: "4",
            title: "Nature",
            className: "ff-poppins fw-bold"
        },
        {
            key: "5",
            title: "CCY1",
            className: "ff-poppins fw-bold"
        },
        {
            key: "6",
            title: "Amount",
            className: "ff-poppins fw-bold"
        },
        {
            key: "7",
            title: "Amount",
            className: "ff-poppins fw-bold"
        },
        {
            key: "8",
            title: "Rate",
            className: "ff-poppins fw-bold"
        },
        {
            key: "9",
            title: "CCY2",
            className: "ff-poppins fw-bold"
        },
        {
            key: "10",
            title: "Amount",
            className: "ff-poppins fw-bold"
        },
        {
            key: "11",
            title: "Time",
            className: "ff-poppins fw-bold"
        },
        {
            key: "12",
            title: "LC No.",
            className: "ff-poppins fw-bold"
        },
        {
            key: "13",
            title: "Account No.",
            className: "ff-poppins fw-bold"
        },
        {
            key: "14",
            title: "Comment"
        },
        {
            key: "15",
            title: "Status",
            className: "ff-poppins fw-bold"
        },
    ]

    return (
        <>
            <div className='box-content-wrapper'>
                <GlobalTable bordered={false} prefixCls="TXNSummary_Table" columns={columns} />
            </div>
        </>
    )
}

export default TXNSummary