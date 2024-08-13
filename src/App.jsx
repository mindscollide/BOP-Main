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
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import InputField from "./components/common/inputField/InputField";
import Button from "./components/common/globalButton/button";
import { PlusCircleFilled } from "@ant-design/icons";
import RadioButton from "./components/common/radioButton/RadioBtn";
import SelectDropdown from "./components/common/selectDropdown/SelectDropdown";
import GlobalTable from "./components/common/table/GlobalTable";
import GlobalModal from "./components/common/globalModal/Modal";
import styles from "./App.module.css";
import CardDragger from "./components/common/cardDragger/cardDragger";
import "./App.css";
// import { CreateDemoContext } from "./Context";

const MemoizedComponent = React.memo(({ state1 }) => {
  console.log("MemoizedComponent rendered");
  return <div>{state1}</div>;
});
function App() {
  const [value, setValue] = useState("");
  const [state1, setState1] = useState(null);
  // const [routes, setRoutes] = useState([]);
  // const {setButtonClicked,isButtonClicked} = useContext(CreateDemoContext)
  // useEffect(() => {
  //   const loadRoutes = async () => {
  //     const tempRoutes = [];

  //     if (import.meta.env.VITE_APP_INCLUDE_SYSTEM === "true") {
  //       const SystemPage1 = (await import("./components/system/SystemPage1"))
  //         .default;
  //       const SystemPage2 = (await import("./components/system/SystemPage2"))
  //         .default;
  //       tempRoutes.push(
  //         {
  //           path: "/system/page1",
  //           name: "System Page 1",
  //           component: SystemPage1,
  //         },
  //         {
  //           path: "/system/page2",
  //           name: "System Page 2",
  //           component: SystemPage2,
  //         }
  //       );
  //     }

  //     if (import.meta.env.VITE_APP_INCLUDE_SECURITY_ADMIN === "true") {
  //       const SecurityAdminPage1 = (
  //         await import("./components/securityAdmin/SecurityAdminPage1")
  //       ).default;
  //       const SecurityAdminPage2 = (
  //         await import("./components/securityAdmin/SecurityAdminPage2")
  //       ).default;
  //       tempRoutes.push(
  //         {
  //           path: "/security/page1",
  //           name: "Security Page 1",
  //           component: SecurityAdminPage1,
  //         },
  //         {
  //           path: "/security/page2",
  //           name: "Security Page 2",
  //           component: SecurityAdminPage2,
  //         }
  //       );
  //     }

  //     setRoutes(tempRoutes);
  //   };

  //   loadRoutes();
  // }, []);
  const onChangeInputField = useCallback((event) => {
    setValue(event.target.value);
  }, []);

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
      <GlobalTable />
      <RadioButton />
      <InputField
        value={value}
        onChange={onChangeInputField}
        type="number"
        applyClass="DealerBitInput"
      />
      <Button
        applyClass={"publishDiscounting"}
        onClick={() => setState1(!state1)}
        value={"Clear Rates"}
      />
      <GlobalModal />
      <MemoizedComponent state1={state1} />
      <Row className="m-0">
        <Col className="px-1" lg={4} md={4} sm={6}>
          <CardDragger />
        </Col>
        <Col className="px-1" lg={4} md={4} sm={6}>
          <CardDragger />
        </Col>
        <Col className="px-1" lg={4} md={4} sm={6}>
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
