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
      align: "center",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenor",
          key: "tenor",
          align: "center",
        },
      ],
      // render: (text) => <strong>{text}</strong>,
      // className: "header-cell", // Custom class for Tenor column header
    },
    {
      title: "USD",
      dataIndex: "usd",
      key: "usd",
      children: [
        {
          title: "Value",
          dataIndex: "usdValue",
          key: "usdValue",
          align: "center",
        },
      ],
    },
    {
      title: "EUR",
      dataIndex: "eur",
      key: "eur",
      children: [
        {
          title: "Value",
          dataIndex: "eurValue",
          key: "eurValue",
          align: "center",
        },
      ],
    },
    {
      title: "GBP",
      dataIndex: "gbp",
      key: "gbp",
      children: [
        {
          title: "Value",
          dataIndex: "gbpValue",
          key: "gbpValue",
          align: "center",
        },
      ],
    },
    {
      title: "JPY",
      dataIndex: "jpy",
      key: "jpy",
      children: [
        {
          title: "Value",
          dataIndex: "jpyValue",
          key: "jpyValue",
          align: "center",
        },
      ],
    },
    {
      title: "CNY",
      dataIndex: "cny",
      key: "cny",
      children: [
        {
          title: "Value",
          dataIndex: "cnyValue",
          key: "cnyValue",
          align: "center",
        },
      ],
    },
  ];
  const data = [
    {
      key: "1",
      tenor: "1 MONTH",
      usdValue: "287.12",
      eurValue: "313.73",
      gbpValue: "367.98",
      jpyValue: "2.0251",
      cnyValue: "40.2823",
    },
    {
      key: "2",
      tenor: "2 MONTH",
      usdValue: "287.12",
      eurValue: "313.73",
      gbpValue: "367.98",
      jpyValue: "2.0251",
      cnyValue: "40.2823",
    },
    {
      key: "3",
      tenor: "3 MONTH",
      usdValue: "287.12",
      eurValue: "313.73",
      gbpValue: "367.98",
      jpyValue: "2.0251",
      cnyValue: "40.2823",
    },
    {
      key: "4",
      tenor: "4 MONTH",
      usdValue: "287.12",
      eurValue: "313.73",
      gbpValue: "367.98",
      jpyValue: "2.0251",
      cnyValue: "40.2823",
    },
    {
      key: "5",
      tenor: "5 MONTH",
      usdValue: "287.12",
      eurValue: "313.73",
      gbpValue: "367.98",
      jpyValue: "2.0251",
      cnyValue: "40.2823",
    },
    {
      key: "6",
      tenor: "6 MONTH",
      usdValue: "287.12",
      eurValue: "313.73",
      gbpValue: "367.98",
      jpyValue: "2.0251",
      cnyValue: "40.2823",
    },
  ];
  return (
    <>
      <SelectDropdown
        isSearchable={true}
        options={[
          { label: "Test", value: 1 },
          { label: "Test", value: 2 },
        ]}
        classNamePrefix={"DealerDropDown"}
      />
      <br />
      <div style={{ maxWidth: "600px" }}>
        <GlobalTable
          columns={columns}
          dataSource={data}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "even-row" : "odd-row"
          }
          bordered
          pagination={false}
          prefixCls={"Discounting"}
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
      <IconElement iconClass={"icon-add-circle-fill"} />
      <DatePicker placeholder={"Select Date"} applyClass={"DatePickerField"} />
      <GlobalModal />
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
    </>

    // <Router>
    //   <div className="App">
    //     {/* <SharedComponent /> */}
    //     {/* <Navbar routes={routes} /> */}
    //     {/* <Routes>
    //       {routes.map((route, index) => (
    //         <Route
    //           key={index}
    //           path={route.path}
    //           element={<route.component />}
    //         />
    //       ))}
    //     </Routes> */}
    //     {/* <button onClick={() => setButtonClicked(!isButtonClicked)}>handle Click</button> */}
    //   </div>
    // </Router>
  );
}

export default App;
