import React from 'react'
import GlobalTable from "../../../../../components/common/table/GlobalTable"
import InputField from "../../../../../components/common/inputField/InputField"


const data = [
  {
    key: '1',
    tenor: 'Bank Spot',
    days: '-',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.71',
    eurAsk: '313.98',
    gbpBid: '367.74',
    gbpAsk: '367.99',
    jpyBid: '2.0244',
    jpyAsk: '2.0257',
  },
  {
    key: '2',
    tenor: '1 WEEK',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '313.98',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '3',
    tenor: '1 WEEK (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '313.98',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '4',
    tenor: '1 MONTH',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '5',
    tenor: '1 MONTH (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '6',
    tenor: '2 MONTH',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '7',
    tenor: '2 MONTH (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '8',
    tenor: '3 MONTH',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '9',
    tenor: '3 MONTH (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '10',
    tenor: '4 MONTH',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '11',
    tenor: '4 MONTH (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '12',
    tenor: '5 MONTH',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '13',
    tenor: '5 MONTH (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '14',
    tenor: '6 MONTH',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '15',
    tenor: '6 MONTH (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '16',
    tenor: '9 MONTH',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '17',
    tenor: '9 MONTH (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '18',
    tenor: '1 YEAR',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
  },
  {
    key: '19',
    tenor: '1 YEAR (P)',
    days: '7',
    usdBid: '287.12',
    usdAsk: '287.29',
    eurBid: '313.81',
    eurAsk: '314.09',
    gbpBid: '367.76',
    gbpAsk: '368.01',
    jpyBid: '2.0264',
    jpyAsk: '2.0278',
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
        dataIndex: 'tenor',
        key: 'tenor',
      },
    ]
  },
  {
    title: '',
    dataIndex: 'days',
    key: 'days',
    children: [
      {
        title: 'Days',
        dataIndex: 'days',
        key: 'days',
      },
    ]
  },
  {
    title: 'USD',
    children: [
      {
        title: 'Bid',
        dataIndex: 'usdBid',
        key: 'usdBid',
      },
      {
        title: 'Ask',
        dataIndex: 'usdAsk',
        key: 'usdAsk',
      }
    ]
  },
  {
    title: 'EUR',
    children: [
      {
        title: 'Bid',
        dataIndex: 'eurBid',
        key: 'eurBid',
      },
      {
        title: 'Ask',
        dataIndex: 'eurAsk',
        key: 'eurAsk',
      }
    ]
  },
  {
    title: 'GBP',
    children: [
      {
        title: 'Bid',
        dataIndex: 'gbpBid',
        key: 'gbpBid',
      },
      {
        title: 'Ask',
        dataIndex: 'gbpAsk',
        key: 'gbpAsk',
      }
    ]
  },
  {
    title: 'JPY',
    children: [
      {
        title: 'Bid',
        dataIndex: 'jpyBid',
        key: 'jpyBid',
      },
      {
        title: 'Ask',
        dataIndex: 'jpyAsk',
        key: 'jpyAsk',
      }
    ]
  },
];
const Forwards = () => {

  return (
    <>
      <div class="flex-fill mt-3 fs-4 fw-bold color-black mb-1 ff-roboto">Bank Forwards</div>

      <GlobalTable
        columns={columns}
        dataSource={data}
        prefixCls={"Tresuary_Forwards"}
        // bordered
        pagination={false}
      />
    </>
  )
}

export default Forwards