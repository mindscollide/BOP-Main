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
  );
}

export default App;
