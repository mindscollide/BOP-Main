import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoaderImage from "@/assets/logo-hd.png";
import "./Loader.css";
import { useLocation } from "react-router-dom";

const Loader = () => {
  const [isLoader, setIsLoading] = useState(false);
  const bankSpotReducerLoader = useSelector(
    (state) => state.bankSpotReducer.Loader
  );
  const blotterReducerLoader = useSelector((state) => state.BlotterSlicer.Loader) 
  const misReducerLoader = useSelector((state) => state.misReducer.Loader);
  const WatchListReducerLoader = useSelector(
    (state) => state.WatchListReducer.Loader
  );
  const AuthLoader = useSelector((state) => state.authReducer.Loader);
  const RFQReducerLoader = useSelector((state) => state.RFQReducer.Loader);
  const CorporateBlotterReducerLoader = useSelector(
    (state) => state.BlotterSlicer.Loader
  );
  const categoryReducerLoader = useSelector(
    (state) => state.categoryReducer.Loader
  );
  const ReportReducerLoader = useSelector(
    (state) => state.ReportReducer.Loader
  );

  const CalculatorReducerLoader = useSelector(
    (state) => state.CalculatorReducer.Loader
  );
  const settingSlicerLoader = useSelector(
    (state) => state.settingSlicer.Loader
  );
  const dealerSliceLoader = useSelector((state) => state.dealerReducer.Loader);

  const chatSlicerLoader = useSelector((state) => state.chatSlicer.Loader);
  const isLoading = [
    bankSpotReducerLoader,
    misReducerLoader,
    WatchListReducerLoader,
    AuthLoader,
    RFQReducerLoader,
    CorporateBlotterReducerLoader,
    categoryReducerLoader,
    ReportReducerLoader,
    CalculatorReducerLoader,
    settingSlicerLoader,
    chatSlicerLoader,
    dealerSliceLoader,
    blotterReducerLoader
  ].some((loading) => loading);

  useEffect(() => {
    let timeout;

    if (isLoading) {
      setIsLoading(true); // Show loader
    } else {
      // Hide loader after a short delay when loading completes
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    isLoader && !window.location.pathname.includes("BOP")  && (
      <div className='body-loader overflow-hidden'>
        <div className='body-loader-inner'>
          <div className='logo-loader-wrapper'>
            <img
              className='img-fluid'
              src={LoaderImage}
              alt='Section-Loader'
              width={200}
            />
            <div className='loader-line-highlight' />
          </div>
        </div>
      </div>
    )
  );
};

export default Loader;
