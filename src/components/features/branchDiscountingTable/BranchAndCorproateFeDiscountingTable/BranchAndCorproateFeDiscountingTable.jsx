import React, { useEffect, useState } from "react";
import GlobalTable from "@/components/common/table/GlobalTable";
import { createColumns, generateData } from "@/components/utils/generateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/common/globalButton/button";
import FEDiscountingModal from "../FEDiscountingModal/FEDiscountingModal";

const BranchAndCorporateFeDiscountingTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //local states
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  const [instrumentForwards, setInstrumentForwards] = useState([]);
  const [tenorsData, setTenorsData] = useState([]);
  const [forwardRatesData, setForwardRatesData] = useState([]);
  const [discountRatesData, setDiscountRatesData] = useState([]);
  //FE Dsicounting Modal Modal State
  const [feDiscountingModalCall, setFeDiscountingModalCall] = useState(false);
  //NON-FE Dsicounting Modal Modal State
  const [nonfeDiscountingModalCall, setNonfeDiscountingModalCall] =
    useState(false);
  //Global State for Extracting Forward and discount rate data
  const GetAllFowardsAndDiscountsRatesAPIData = useSelector(
    (state) => state.WatchListReducer.GetAllFowardsAndDiscountsRatesData
  );

  //Extracting forward and Discounting Api Data
  useEffect(() => {
    try {
      if (
        GetAllFowardsAndDiscountsRatesAPIData &&
        GetAllFowardsAndDiscountsRatesAPIData !== null
      ) {
        setTenorsData(GetAllFowardsAndDiscountsRatesAPIData.tenors);
        setForwardRatesData(GetAllFowardsAndDiscountsRatesAPIData.forwardRates);
        setDiscountRatesData(
          GetAllFowardsAndDiscountsRatesAPIData.discountRates
        );
        setInstrumentForwards(
          GetAllFowardsAndDiscountsRatesAPIData.instruments
        );
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [GetAllFowardsAndDiscountsRatesAPIData]);

  useEffect(() => {
    if (
      tenorsData.length > 0 &&
      instrumentForwards.length > 0 &&
      forwardRatesData.length > 0 &&
      discountRatesData.length > 0
    ) {
      const { discountRates } = generateData(
        1,
        tenorsData,
        instrumentForwards,
        forwardRatesData,
        discountRatesData
      );

      if (discountRates.length > 0) {
        setDataSource(discountRates);
        const forwardsColumns = createColumns(discountRates, 1);
        setColumnsData(forwardsColumns);
      }
    }
  }, [tenorsData, instrumentForwards, forwardRatesData, discountRatesData]);

  const handleFEDiscountingModal = () => {
    setFeDiscountingModalCall(true);
  };

  

  return (
    <>
      <Row >
        <Col lg={12} md={12} sm={12} className="heading mb-2" >
            FE Discounting
        </Col>
        <Col lg={12} md={12} sm={12}>
          <GlobalTable
            columns={columnsData}
            dataSource={dataSource}
            prefixCls={"branch_forwardsTable"}
            pagination={false}
            bordered
            rowClassName={(record, index) =>
              index % 2 === 0
                ? "branch_forwardsTable-odd"
                : "branch_forwardsTable-even"
            }
          />
        </Col>
      </Row>

      <Row className="my-2">
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex justify-content-center align-items-center gap-2"
        >
          <CustomButton
            value="FE Discounting"
            applyClass={"FEDiscounting"}
            onClick={handleFEDiscountingModal}
          />
    
        </Col>
      </Row>
      {feDiscountingModalCall && (
        <FEDiscountingModal
          feDiscountingModalCall={feDiscountingModalCall}
          setFeDiscountingModalCall={setFeDiscountingModalCall}
        />
      )}
  
    </>
  );
};

export default BranchAndCorporateFeDiscountingTable;
