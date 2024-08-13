import React, { useState } from "react";
import ArrayUpdater from "../common/ArrayUpdater";

const SystemPage2 = () => {
  console.log("check page 2");
  const [array, setArray] = useState(["Item 1", "Item 2", "Item 3"]);
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState("");
  return (
    <>
      <div>System Page 2</div>

      <ArrayUpdater
        array={array}
        setArray={setArray}
        index={index}
        setIndex={setIndex}
        value={value}
        setValue={setValue}
      />
    </>
  );
};

export default SystemPage2;
