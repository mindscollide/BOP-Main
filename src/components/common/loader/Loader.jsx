import React from "react";
import { useSelector } from "react-redux";
import LoaderImage from "@/assets/logo-hd.png";
import styles from "./Loader.module.css";

const Loader = () => {
  const bankSpotReducerLoader = useSelector(
    (state) => state.bankSpotReducer.Loader
  );
  const misReducerLoader = useSelector((state) => state.misReducer.Loader);
  const WatchListReducerLoader = useSelector(
    (state) => state.WatchListReducer.Loader
  );
  const AuthLoader = useSelector((state) => state.authReducer.Loader);
  const RFQReducerLoader = useSelector((state) => state.RFQReducer.Loader);
  const CorporateBlotterReducerLoader = useSelector(
    (state) => state.CorporateBlotterReducer.Loader
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

  const isLoading =
    bankSpotReducerLoader ||
    misReducerLoader ||
    WatchListReducerLoader ||
    AuthLoader ||
    RFQReducerLoader ||
    CorporateBlotterReducerLoader ||
    categoryReducerLoader ||
    ReportReducerLoader ||
    CalculatorReducerLoader ||
    settingSlicerLoader ||
    chatSlicerLoader ||
    dealerSliceLoader;

  console.log(isLoading, "Loader isLoading value");
  return (
    isLoading && (
      <div className={styles["MainLoader"]}>
        <div className='d-flex align-items-center flex-column justify-content-center h-clc-100'>
          <img
            className='img-fluid'
            src={LoaderImage}
            alt='Section-Loader'
            width={200}
          />
          <div className={styles["progress-bar"]}>
            <div className={styles["progress-bar-value"]}></div>
          </div>
        </div>
      </div>
    )
  );
};

export default Loader;
