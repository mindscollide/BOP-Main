import React from 'react'
import GlobalTable from "../../../../../components/common/table/GlobalTable"
import InputField from "../../../../../components/common/inputField/InputField"


const data = [
    {
        key: '1',
        month: '1 MONTH',
        value1: '287.12',
        value2: '313.73',
        value3: '367.98',
        value4: '2.0251',
        value5: '40.2823',
    },
    {
        key: '2',
        month: '2 MONTH',
        value1: '287.12',
        value2: '313.73',
        value3: '367.98',
        value4: '2.0251',
        value5: '40.2823',
    },
    {
        key: '3',
        month: '3 MONTH',
        value1: '287.12',
        value2: '313.73',
        value3: '367.98',
        value4: '2.0251',
        value5: '40.2823',
    },
    {
        key: '4',
        month: '4 MONTH',
        value1: '287.12',
        value2: '313.73',
        value3: '367.98',
        value4: '2.0251',
        value5: '40.2823',
    },
    {
        key: '5',
        month: '5 MONTH',
        value1: '287.12',
        value2: '313.73',
        value3: '367.98',
        value4: '2.0251',
        value5: '40.2823',
    },
    {
        key: '6',
        month: '6 MONTH',
        value1: '287.12',
        value2: '313.73',
        value3: '367.98',
        value4: '2.0251',
        value5: '40.2823',
    },
];
const columns = [
    {
        title: '',
        dataIndex: 'tenor',
        key: 'tenor',
        align: 'center',
        children: [
            {
                title: 'Tenor',
                dataIndex: 'month',
                key: 'month',
            },
        ]
    },
    {
        title: 'USD',
        children: [
            {
                title: 'Value',
                dataIndex: 'value1',
                key: 'value1',
            },
        ]
    },
    {
        title: 'EUR',
        children: [
            {
                title: 'Value',
                dataIndex: 'value2',
                key: 'value2',
            },
        ]
    },
    {
        title: 'GBP',
        children: [
            {
                title: 'Value',
                dataIndex: 'value3',
                key: 'value3',
            },
        ]
    },
    {
        title: 'JPY',
        children: [
            {
                title: 'Value',
                dataIndex: 'value4',
                key: 'value4',
            },
        ]
    },
    {
        title: 'CNY',
        children: [
            {
                title: 'Value',
                dataIndex: 'value5',
                key: 'value5',
            },
        ]
    },
];
const Discounting = () => {

    return (
        <>
            <GlobalTable
                columns={columns}
                dataSource={data}
                prefixCls={"Treasury_Discounting"}
                // bordered
                pagination={false}
                rowClassName={"striped-design"}
                rowHoverBg={"#000"}
            />
        </>
    )
}

export default Discounting