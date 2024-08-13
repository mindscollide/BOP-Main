<<<<<<< Updated upstream
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/global/dashboard.css";
import "./assets/global/height.css";
import "./index.css"
import AppRoutes from "./Routes/routes";
import { useContext, useEffect } from "react";
import { BOPContext } from "./Context";

function App() {
  const { RoleValueFun } = useContext(BOPContext);
  useEffect(() => {
    let promptContent = `Please write a value according to the defined options and the value should be an integer:
    1: Corporate
    2: Branch
    3: Dealer
    4: Treasury
    `;
    const promptData = prompt(promptContent, "");

    // Convert promptData to an integer
    const parsedData = parseInt(promptData, 10);

    // Check if parsedData is a valid option
    if ([1, 2, 3, 4].includes(parsedData)) {
      RoleValueFun(parsedData);
    } else {
      console.error("Invalid input. Please enter a number between 1 and 4.");
    }
  }, []);
  return (
    <>
      <AppRoutes />
    </>
=======
import React, { useState, useEffect, useContext, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputField from "./components/common/inputField/InputField";
import Button from "./components/common/globalButton/button";
import { PlusCircleFilled } from "@ant-design/icons";
import RadioButton from "./components/common/radioButton/RadioBtn";
import SelectDropdown from "./components/common/selectDropdown/SelectDropdown";
import GlobalTable from "./components/common/table/GlobalTable";
import styles from "./App.module.css";
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
      <SelectDropdown />
      <GlobalTable />
      <RadioButton />
      <InputField
        className={styles["DealerBitInput"]}
        value={value}
        onChange={onChangeInputField}
        type='number'
      />
      <Button
        icon={<PlusCircleFilled size={50} />}
        iconPosition={"start"}
        className={styles["PlusButton"]}
        onClick={() => setState1(!state1)}
        value={"Add"}
        // type='primary'
      />
      <MemoizedComponent state1={state1} />
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
>>>>>>> Stashed changes
  );
}

export default App;
