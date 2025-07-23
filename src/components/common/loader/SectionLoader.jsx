import React from "react";
import SectionLoader from "@/assets/Bop-Loader.svg";

const SectionLoader = () => {
  return (
    <div className='Treasury_Spot_Spinner'>
      <div className='d-flex justify-content-center'>
        <img src={SectionLoader} />
      </div>
    </div>
  );
};

export default SectionLoader;
