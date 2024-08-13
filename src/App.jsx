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
  );
}

export default App;
