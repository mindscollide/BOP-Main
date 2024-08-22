import "@fontsource/montserrat";
import "@fontsource/montserrat/100.css";
import "@fontsource/montserrat/200.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/poppins";
import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "@fontsource/poppins/900.css";
import "@fontsource/roboto";
import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import "./App.css";
import { Row, Col } from "react-bootstrap";
import InputField from "./components/common/inputField/InputField";
import Button from "./components/common/globalButton/button";
import RadioButton from "./components/common/radioButton/SwitchBtn";
import SelectDropdown from "./components/common/selectDropdown/SelectDropdown";
import GlobalTable from "./components/common/table/GlobalTable";
import GlobalModal from "./components/common/globalModal/Modal";
import styles from "./App.module.css";
import CardDragger from "./components/common/cardDragger/cardDragger";
import "./App.css";
import BitAmountBox from "./components/common/bitAmountBox/bitAmountBox";
import DatePicker from "./components/common/datePicker/DatePicker";
import IconElement from "./components/common/IconElement/IconElement";
import ProfileDropdown from "./components/common/profileDropdown/ProfileDropdown";
import Header from "./components/layout/header/header";
import { Route, Router, Routes } from "react-router-dom";
import GlobalTabs from "./components/common/tabs/Tabs";

const MemoizedComponent = React.memo(({ state1 }) => {
  console.log("MemoizedComponent rendered");
  return <div>{state1}</div>;
});
function App() {
  const [value, setValue] = useState("");
  const [state1, setState1] = useState(null);

  const onChangeInputField = useCallback((event) => {
    setValue(event.target.value);
  }, []);

  const columns = [
    {
      title: "",
      dataIndex: "",
      key: "",
      fixed: "left",
      width: "200px",
      align: "center",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenor",
          key: "tenor",
          width: "200px",
          align: "center",
        },
      ],
    },
    {
      title: "USD",
      children: [
        {
          title: "Bid",
          dataIndex: "usdBid",
          key: "usdBid",
          align: "center",
        },
        {
          title: "Ask",
          dataIndex: "usdAsk",
          key: "usdAsk",
          align: "center",
        },
      ],
    },
    {
      title: "EUR",
      children: [
        {
          title: "Bid",
          dataIndex: "eurBid",
          key: "eurBid",
          align: "center",
        },
        {
          title: "Ask",
          dataIndex: "eurAsk",
          key: "eurAsk",
          align: "center",
        },
      ],
    },
    {
      title: "GBP",
      children: [
        {
          title: "Bid",
          dataIndex: "gbpBid",
          key: "gbpBid",
          align: "center",
        },
        {
          title: "Ask",
          dataIndex: "gbpAsk",
          key: "gbpAsk",
          align: "center",
        },
      ],
    },
    {
      title: "JPY",
      children: [
        {
          title: "Bid",
          dataIndex: "jpyBid",
          key: "jpyBid",
          align: "center",
        },
        {
          title: "Ask",
          dataIndex: "jpyAsk",
          key: "jpyAsk",
          align: "center",
        },
      ],
    },
    {
      title: "CNY",
      children: [
        {
          title: "Bid",
          dataIndex: "cnyBid",
          key: "cnyBid",
          align: "center",
        },
        {
          title: "Ask",
          dataIndex: "cnyAsk",
          key: "cnyAsk",
          align: "center",
        },
      ],
    },
    {
      title: "CHF",
      children: [
        {
          title: "Bid",
          dataIndex: "chfBid",
          key: "chfBid",
          align: "center",
        },
        {
          title: "Ask",
          dataIndex: "chfAsk",
          key: "chfAsk",
          align: "center",
        },
      ],
    },
    {
      title: "CAD",
      children: [
        {
          title: "Bid",
          dataIndex: "cadBid",
          key: "cadBid",
          align: "center",
        },
        {
          title: "Ask",
          dataIndex: "cadAsk",
          key: "cadAsk",
          align: "center",
        },
      ],
    },
    {
      title: "CNH",
      children: [
        {
          title: "Bid",
          dataIndex: "cnhBid",
          key: "cnhBid",
          align: "center",
        },
        {
          title: "Ask",
          dataIndex: "cnhAsk",
          key: "cnhAsk",
          align: "center",
        },
      ],
    },
  ];

  const data = [
    {
      key: "1",
      tenor: "ON",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "2",
      tenor: "1 WEEK",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "3",
      tenor: "3 WEEK",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "4",
      tenor: "1 MONTH",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "5",
      tenor: "3 MONTH",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
    {
      key: "6",
      tenor: "6 MONTH",
      usdBid: "287.12",
      usdAsk: "313.73",
      eurBid: "367.98",
      eurAsk: "2.0251",
      gbpBid: "40.2823",
      gbpAsk: "2.0251",
      jpyBid: "40.2823",
      jpyAsk: "2.0251",
      cnyBid: "40.2823",
      cnyAsk: "2.0251",
      chfBid: "40.2823",
      chfAsk: "2.0251",
      cadBid: "40.2823",
      cadAsk: "2.0251",
      cnhBid: "40.2823",
      cnhAsk: "2.0251",
    },
  ];

  const tabsData = [
    { title: 'Live Rates', content: <div>Tab content for Home</div> },
    { title: 'Forwards', content: <div>Tab content for Profile</div> },
    { title: 'Discounting', content: <div>Tab content for Contact</div> }
  ];

  return (
    <>
      <Header />
      <SelectDropdown
        isSearchable={true}
        options={[
          { label: "Test", value: 1 },
          { label: "Test", value: 2 },
        ]}
        classNamePrefix={"DealerDropDown"}
      />
      <br />
      <div>
        <GlobalTable
          columns={columns}
          dataSource={data}
          rowClassName={(record, index) =>
            index % 2 === 0
              ? "CategoryForwards-even-row"
              : "CategoryForwards-odd-row"
          }
          bordered
          pagination={false}
          prefixCls={"CategoryForwards"}
          scroll={{
            y: 240, // Set the vertical scroll height to fix the header
            x: "100vw", // Optional: Set horizontal scroll if needed
          }}
        />
      </div>
      <RadioButton />
      <InputField
        applyClass={"DealerDiscountingCurrentRateInput"}
        value={value}
        onChange={onChangeInputField}
        type='number'
      />
      <Button
        applyClass={"publishDiscounting"}
        onClick={() => setState1(!state1)}
        value={"Clear Rates"}
        icon={<IconElement iconClass={"icon-add-circle-fill "} />}
      />
      <div>
        <BitAmountBox
          applyClass={"BitCardBox"}
          spot={false}
          BitAmountValue={289}
        />
      </div>
      <div>
        <BitAmountBox
          applyClass={"OfferCardBox"}
          spot={false}
          BitAmountValue={289}
        />
      </div>
      <DatePicker placeholder={"Select Date"} applyClass={"DatePickerField"} />
      <GlobalModal />
      <ProfileDropdown userName='Owais Wajid' />

      <Row className='m-0'>
        <Col className='px-1' lg={4} md={4} sm={6}>
          <CardDragger />
        </Col>
        <Col className='px-1' lg={4} md={4} sm={6}>
          <CardDragger />
        </Col>
        <Col className='px-1' lg={4} md={4} sm={6}>
          <CardDragger />
        </Col>
      </Row>

      <GlobalTabs tabs={tabsData} defaultActiveKey="0" />
    </>
  );
}

export default App;
