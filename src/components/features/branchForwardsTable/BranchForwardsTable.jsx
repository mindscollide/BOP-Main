import React, { useEffect, useState } from "react";
import GlobalTable from "../../common/table/GlobalTable";
import { createColumns, generateData } from "../../utils/generateData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomButton from "@/components/common/globalButton/button";
import { Col, Row } from "react-bootstrap";
import CorporateBookaForwardModal from "./CorporateBookaForwardModal/CorporateBookaForwardModal";
import {
  buildDiscountingTable,
  buildForwardsTable,
} from "@/components/utils/generateColumnsData";
import { IndexCell } from "@/components/common/inputField/IndexCell";

const BranchForwardsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //local states
  const [instrumentForwards, setInstrumentForwards] = useState([]);
  const [tenorsData, setTenorsData] = useState([]);
  const [forwardRatesData, setForwardRatesData] = useState([]);
  const [discountRatesData, setDiscountRatesData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [columnsData, setColumnsData] = useState([]);
  //Book a Forward Modal State
  const [bookaForwardModalCall, setBookaForwardModalCall] = useState(false);

  //Global State for Extracting Forward and discount rate data
  const GetAllFowardsAndDiscountsRatesAPIData = useSelector(
    (state) => state.WatchListReducer.GetAllFowardsAndDiscountsRatesData
  );

  useEffect(() => {
    if (GetAllFowardsAndDiscountsRatesAPIData !== null) {
      try {
        const { tenors, forwardRates, instruments } =
          GetAllFowardsAndDiscountsRatesAPIData;
        let getAllTenorsData = { tenors };
        let getAllInstrument = { instruments };
        const { rowData, columnsData } = buildForwardsTable(
          2,
          forwardRates,
          getAllTenorsData,
          getAllInstrument,
          IndexCell
        );
        console.log(rowData, columnsData, "columnsDatacolumnsData");
        if (rowData.length > 0) {
          setDataSource(rowData);
          setColumnsData(columnsData);
        }
      } catch (error) {
        console.log(error, "Error while building discounting table");
      }
    }
  }, [GetAllFowardsAndDiscountsRatesAPIData]);

  const handleBookaForwardCorporate = () => {
    setBookaForwardModalCall(true);
  };

  return (
    <>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <GlobalTable
            columns={columnsData}
            dataSource={dataSource}
            prefixCls={"branch_forwardsTable"}
            pagination={false}
            bordered
            scroll={{ x: "max-content" }}
            rowClassName={(record, index) =>
              index % 2 === 0
                ? "branch_forwardsTable-odd"
                : "branch_forwardsTable-even"
            }
          />
        </Col>
      </Row>
      <Row className='my-2'>
        <Col
          lg={12}
          md={12}
          sm={12}
          className='d-flex justify-content-center align-items-center'>
          <CustomButton
            value='Book a Forward'
            applyClass={"FowwardBranchBookaForwardBtn"}
            onClick={handleBookaForwardCorporate}
          />
        </Col>
      </Row>
      {bookaForwardModalCall && (
        <CorporateBookaForwardModal
          bookaForwardModalCall={bookaForwardModalCall}
          setBookaForwardModalCall={setBookaForwardModalCall}
        />
      )}
    </>
  );
};

export default BranchForwardsTable;
