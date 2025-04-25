import React, { useEffect, useState } from "react";
import GlobalTable from "../../../../../../../components/common/table/GlobalTable";
import IconElement from "../../../../../../../components/common/IconElement/IconElement";
import { useDispatch } from "react-redux";
import { CorporateBlotterDataAPI } from "./CorporateBlotterActions";
import { useSelector } from "react-redux";
import { Checkbox, Popover } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CustomButton from "@/components/common/globalButton/button";
import CommentModal from "../commentModal/CommentModal";
const TXNSummary = () => {
  const dispatch = useDispatch();

  //HardCoded Filter Values start
  const TXN_ID_OPTIONS = [
    "09-09-2024/0568",
    "09-09-2024/4798",
    "09-09-2024/bd2e",
    "09-09-2024/d1f2",
  ];

  const CustomerName_OPTIONS = ["Gul Ahmed"];
  const TYPE_OPTIONS = ["Buy", "Sell"];
  const Nature_OPTIONS = ["1", "6"];
  const CCY1_OPTIONS = ["USD"];
  const Amount_OPTIONS = ["098,098", "234,234"];
  const Rate_OPTIONS = ["288.00", "289.00"];
  const CCY2_OPTIONS = ["PKR"];
  const Amount2_OPTIONS = ["NaN"];
  const Time_OPTIONS = ["16:33 pm", "16:47 pm", "16:48 pm", "16:50 pm"];
  const LCno_OPTIONS = ["098098", "234234"];
  const Accno_OPTIONS = ["234234234234234234234234"];
  const Status_OPTIONS = ["Pending"];

  const [statusOptions, setStatusOptions] = useState([]);
  console.log(statusOptions, "statusOptionsstatusOptions");
  //HardCoded Filter Values Ended

  //Global State For Blotter Data
  const GlobalStateGetBlotterData = useSelector(
    (state) => state.CorporateBlotterReducer.getBlotterApiData
  );

  //local states
  const [blotterdata, setBlotterdata] = useState([]);
  //TXNID Filter State
  const [open, setOpen] = useState(false);
  const [selectedItemsTXNID, setSelectedItemsTXNID] = useState([]);
  // Show and Hide Comment Modal and commentState
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comment, setComment] = useState("");
  //Customer Name Filter State
  const [openCustomername, setOpenCustomername] = useState(false);
  const [selectedItemsCustomerName, setSelectedItemsCustomerName] = useState(
    []
  );
  //Type Filter State
  const [openType, setOpenType] = useState(false);
  const [selectedItemsType, setSelectedItemsType] = useState([]);
  //Nature Filter State
  const [openNature, setOpenNature] = useState(false);
  const [selectedItemsNature, setSelectedItemsNature] = useState([]);
  //CCY1 Filter State
  const [openCCY1, setOpenCCY1] = useState(false);
  const [selectedItemsCCY1, setSelectedItemsCCY1] = useState([]);
  //Amount1 Filter State
  const [openAmount1, setOpenAmount1] = useState(false);
  const [selectedItemsAmount1, setSelectedItemsAmount1] = useState([]);
  //Rate Filter State
  const [openRate, setOpenRate] = useState(false);
  const [selectedItemsRate, setSelectedItemsRate] = useState([]);
  //CCY2 Filter State
  const [openCCY2, setOpenCCY2] = useState(false);
  const [selectedItemsCCY2, setSelectedItemsCCY2] = useState([]);
  //Amount2 Filter State
  const [openAmount2, setOpenAmount2] = useState(false);
  const [selectedItemsAmount2, setSelectedItemsAmount2] = useState([]);
  //Time Filter State
  const [openTime, setOpenTime] = useState(false);
  const [selectedItemsTime, setSelectedItemsTime] = useState([]);
  //LCno Filter State
  const [openLCno, setOpenLCno] = useState(false);
  const [selectedItemsLCno, setSelectedItemsLCno] = useState([]);
  //AccNO Filter State
  const [openAccNO, setOpenAccNO] = useState(false);
  const [selectedItemsAccNO, setSelectedItemsAccNO] = useState([]);
  //Status Filter State
  const [openStatus, setOpenStatus] = useState(false);
  const [selectedItemsStatus, setSelectedItemsStatus] = useState([]);

  //Calling Corporate Blotter Data API
  useEffect(() => {
    try {
      dispatch(CorporateBlotterDataAPI({}));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  //Extracting Out the Blotter Data API
  useEffect(() => {
    try {
      if (GlobalStateGetBlotterData && GlobalStateGetBlotterData !== null) {
        console.log(GlobalStateGetBlotterData, "GlobalStateGetBlotterData");
        // Now will be requiring some Clarification on it
        setBlotterdata([GlobalStateGetBlotterData.tnxSummary]);
        setStatusOptions(GlobalStateGetBlotterData.statuses);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [GlobalStateGetBlotterData]);

  //TXN ID PopOver Functions Starts
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleSelectAll = () => {
    setSelectedItemsTXNID(TXN_ID_OPTIONS);
  };

  const handleDeselectAll = () => {
    setSelectedItemsTXNID([]);
  };

  const handleCheckboxChange = (checkedValues) => {
    setSelectedItemsTXNID(checkedValues);
  };

  const popoverContentTXN = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAll}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAll}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsTXNID}
        onChange={handleCheckboxChange}
      >
        {TXN_ID_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //TXN ID PopOver Functions Ends

  //Customer Name PopOver Functions Starts
  const handleOpenChangeCustomerName = (newOpen) => {
    setOpenCustomername(newOpen);
  };

  const handleSelectAllCustomerName = () => {
    setSelectedItemsCustomerName(CustomerName_OPTIONS);
  };

  const handleDeselectAllCustomerName = () => {
    setSelectedItemsCustomerName([]);
  };

  const handleCheckboxChangeCustomerName = (checkedValues) => {
    setSelectedItemsCustomerName(checkedValues);
  };

  const popoverContentCustomerName = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllCustomerName}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllCustomerName}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsCustomerName}
        onChange={handleCheckboxChangeCustomerName}
      >
        {CustomerName_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Customer Name PopOver Functions Ends

  //Type PopOver Functions Starts
  const handleOpenChangeType = (newOpen) => {
    setOpenType(newOpen);
  };

  const handleSelectAllType = () => {
    setSelectedItemsType(TYPE_OPTIONS);
  };

  const handleDeselectAllType = () => {
    setSelectedItemsType([]);
  };

  const handleCheckboxChangeType = (checkedValues) => {
    setSelectedItemsType(checkedValues);
  };

  const popoverContentType = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllType}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllType}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsType}
        onChange={handleCheckboxChangeType}
      >
        {TYPE_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Type PopOver Functions Ends

  //Nature PopOver Functions Starts
  const handleOpenChangeNature = (newOpen) => {
    setOpenNature(newOpen);
  };

  const handleSelectAllNature = () => {
    setSelectedItemsNature(Nature_OPTIONS);
  };

  const handleDeselectAllNature = () => {
    setSelectedItemsNature([]);
  };

  const handleCheckboxChangeNature = (checkedValues) => {
    setSelectedItemsNature(checkedValues);
  };

  const popoverContentNature = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllNature}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllNature}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsNature}
        onChange={handleCheckboxChangeNature}
      >
        {Nature_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Nature PopOver Functions Ends

  //CCY1 PopOver Functions Starts
  const handleOpenChangeCCY1 = (newOpen) => {
    setOpenCCY1(newOpen);
  };

  const handleSelectAllCCY1 = () => {
    setSelectedItemsCCY1(CCY1_OPTIONS);
  };

  const handleDeselectAllCCY1 = () => {
    setSelectedItemsCCY1([]);
  };

  const handleCheckboxChangeCCY1 = (checkedValues) => {
    setSelectedItemsCCY1(checkedValues);
  };

  const popoverContentCCY1 = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllCCY1}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllCCY1}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsCCY1}
        onChange={handleCheckboxChangeCCY1}
      >
        {CCY1_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //CCY1 PopOver Functions Ends

  //Amount1 PopOver Functions Starts
  const handleOpenChangeAmount1 = (newOpen) => {
    setOpenAmount1(newOpen);
  };

  const handleSelectAllAmount1 = () => {
    setSelectedItemsAmount1(Amount_OPTIONS);
  };

  const handleDeselectAllAmount1 = () => {
    setSelectedItemsAmount1([]);
  };

  const handleCheckboxChangeAmount1 = (checkedValues) => {
    setSelectedItemsAmount1(checkedValues);
  };

  const popoverContentAmount1 = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllAmount1}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllAmount1}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsAmount1}
        onChange={handleCheckboxChangeAmount1}
      >
        {Amount_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //CCY1 PopOver Functions Ends

  //Rate PopOver Functions Starts
  const handleOpenChangeRate = (newOpen) => {
    setOpenRate(newOpen);
  };

  const handleSelectAllRate = () => {
    setSelectedItemsRate(Rate_OPTIONS);
  };

  const handleDeselectAllRate = () => {
    setSelectedItemsRate([]);
  };

  const handleCheckboxChangeRate = (checkedValues) => {
    setSelectedItemsRate(checkedValues);
  };

  const popoverContentRate = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllRate}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllRate}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsRate}
        onChange={handleCheckboxChangeRate}
      >
        {Rate_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Rate PopOver Functions Ends

  //CCY2 PopOver Functions Starts
  const handleOpenChangeCCY2 = (newOpen) => {
    setOpenCCY2(newOpen);
  };

  const handleSelectAllCCY2 = () => {
    setSelectedItemsCCY2(CCY2_OPTIONS);
  };

  const handleDeselectAllCCY2 = () => {
    setSelectedItemsCCY2([]);
  };

  const handleCheckboxChangeCCY2 = (checkedValues) => {
    setSelectedItemsCCY2(checkedValues);
  };

  const popoverContentCCY2 = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllCCY2}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllCCY2}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsCCY2}
        onChange={handleCheckboxChangeCCY2}
      >
        {CCY2_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //CCY2 PopOver Functions Ends

  //Amount2 PopOver Functions Starts
  const handleOpenChangeAmount2 = (newOpen) => {
    setOpenAmount2(newOpen);
  };

  const handleSelectAllAmount2 = () => {
    setSelectedItemsAmount2(Amount2_OPTIONS);
  };

  const handleDeselectAllAmount2 = () => {
    setSelectedItemsAmount2([]);
  };

  const handleCheckboxChangeAmount2 = (checkedValues) => {
    setSelectedItemsAmount2(checkedValues);
  };

  const popoverContentAmount2 = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllAmount2}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllAmount2}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsAmount2}
        onChange={handleCheckboxChangeAmount2}
      >
        {Amount2_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Amount2 PopOver Functions Ends

  //Time PopOver Functions Starts
  const handleOpenChangeTime = (newOpen) => {
    setOpenTime(newOpen);
  };

  const handleSelectAllTime = () => {
    setSelectedItemsTime(Time_OPTIONS);
  };

  const handleDeselectAllTime = () => {
    setSelectedItemsTime([]);
  };

  const handleCheckboxChangeTime = (checkedValues) => {
    setSelectedItemsTime(checkedValues);
  };

  const popoverContentTime = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllTime}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllTime}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsTime}
        onChange={handleCheckboxChangeTime}
      >
        {Time_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //Time PopOver Functions Ends

  //LCno PopOver Functions Starts
  const handleOpenChangeLCno = (newOpen) => {
    setOpenLCno(newOpen);
  };

  const handleSelectAllLCno = () => {
    setSelectedItemsLCno(LCno_OPTIONS);
  };

  const handleDeselectAllLCno = () => {
    setSelectedItemsLCno([]);
  };

  const handleCheckboxChangeLCno = (checkedValues) => {
    setSelectedItemsLCno(checkedValues);
  };

  const popoverContentLCno = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllLCno}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllLCno}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsLCno}
        onChange={handleCheckboxChangeLCno}
      >
        {LCno_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //LCno PopOver Functions Ends

  //ACCno PopOver Functions Starts
  const handleOpenChangeAccNO = (newOpen) => {
    setOpenAccNO(newOpen);
  };

  const handleSelectAllAccNO = () => {
    setSelectedItemsAccNO(Accno_OPTIONS);
  };

  const handleDeselectAllAccNO = () => {
    setSelectedItemsAccNO([]);
  };

  const handleCheckboxChangeAccNO = (checkedValues) => {
    setSelectedItemsAccNO(checkedValues);
  };

  const popoverContentAccNO = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllAccNO}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllAccNO}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsAccNO}
        onChange={handleCheckboxChangeAccNO}
      >
        {Accno_OPTIONS.map((item) => (
          <Checkbox key={item} value={item}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //ACCno PopOver Functions Ends

  //status PopOver Functions Starts
  const handleOpenChangeStatus = (newOpen) => {
    setOpenStatus(newOpen);
  };

  const handleSelectAllStatus = () => {
    setSelectedItemsStatus(statusOptions);
  };

  const handleDeselectAllStatus = () => {
    setSelectedItemsStatus([]);
  };

  const handleCheckboxChangeStatus = (checkedValues) => {
    setSelectedItemsStatus(checkedValues);
  };

  const popoverContentStatus = (
    <div style={{ width: 220 }}>
      <div className="d-flex justify-content-between mb-2">
        <CustomButton
          applyClass="SelectAllButton"
          value={"Select All"}
          onClick={handleSelectAllStatus}
        />
        <CustomButton
          applyClass="SelectAllButton"
          value={"Desselect All"}
          onClick={handleDeselectAllStatus}
        />
      </div>
      <Checkbox.Group
        style={{ display: "flex", flexDirection: "column" }}
        value={selectedItemsStatus}
        onChange={handleCheckboxChangeStatus}
      >
        {statusOptions.map((item) => (
          <Checkbox key={item} value={item}>
            {item.status}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  );
  //status PopOver Functions Ends
  // Show and Hide Comment Modal and Update Comment Value
  const handleShowCommentModal = (text) => {
    setShowCommentModal(true);
    setComment(text);
  };

  const columns = [
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">TXN ID</span>
          <Popover
            content={popoverContentTXN}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "txnid",
      dataIndex: "txnid",
      align: "center",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Name</span>
          <Popover
            content={popoverContentCustomerName}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openCustomername}
            onOpenChange={handleOpenChangeCustomerName}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "counterPartyName",
      dataIndex: "counterPartyName",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Type</span>
          <Popover
            content={popoverContentType}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openType}
            onOpenChange={handleOpenChangeType}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "side",
      dataIndex: "side",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Nature</span>
          <Popover
            content={popoverContentNature}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openNature}
            onOpenChange={handleOpenChangeNature}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "nature",
      dataIndex: "nature",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">CCY1</span>
          <Popover
            content={popoverContentCCY1}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openCCY1}
            onOpenChange={handleOpenChangeCCY1}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "ccY1",
      dataIndex: "ccY1",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Amount</span>
          <Popover
            content={popoverContentAmount1}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openAmount1}
            onOpenChange={handleOpenChangeAmount1}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "amount1",
      dataIndex: "amount1",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Rate</span>
          <Popover
            content={popoverContentRate}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openRate}
            onOpenChange={handleOpenChangeRate}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "rate1",
      dataIndex: "rate1",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">CCY2</span>
          <Popover
            content={popoverContentCCY2}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openCCY2}
            onOpenChange={handleOpenChangeCCY2}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "ccY2",
      dataIndex: "ccY2",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Amount</span>
          <Popover
            content={popoverContentAmount2}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openAmount2}
            onOpenChange={handleOpenChangeAmount2}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "amount2",
      dataIndex: "amount2",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Time</span>
          <Popover
            content={popoverContentTime}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openTime}
            onOpenChange={handleOpenChangeTime}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "time",
      dataIndex: "time",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">LC NO.</span>
          <Popover
            content={popoverContentLCno}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openLCno}
            onOpenChange={handleOpenChangeLCno}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "lC_No",
      dataIndex: "lC_No",
      className: "ff-poppins fw-bold",
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Acc NO.</span>
          <Popover
            content={popoverContentAccNO}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openAccNO}
            onOpenChange={handleOpenChangeAccNO}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "accountNumber",
      dataIndex: "accountNumber",
      className: "ff-poppins fw-bold",
    },
    {
      title: "Comment",
      key: "comment",
      dataIndex: "comment",
      className: "comment-class text-center ",
      render: (text, record) => (
        <>
          {text !== "" ? (
            <span className="d-inline-block cursor-pointer">
              <IconElement
                iconClass="icon-view-comment fs-5 color-blue"
                onClick={() => handleShowCommentModal(text)}
              />
            </span>
          ) : null}
        </>
      ),
    },
    {
      title: (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <span className="ff-poppins fw-bold">Status</span>
          <Popover
            content={popoverContentStatus}
            trigger="click"
            arrow={false}
            placement="bottom"
            open={openStatus}
            onOpenChange={handleOpenChangeStatus}
          >
            <span
              style={{
                cursor: "pointer",
                color: "white",
                background: "#f56600",
                borderRadius: "4px",
              }}
            >
              ▼
            </span>
          </Popover>
        </div>
      ),
      key: "14",
      dataIndex: "status",
      className: "ff-poppins fw-bold",
      render: (text, record) => (
        <>
          <span className={text === "Accepted" ? "color-green" : "color-red"}>
            {text}
          </span>
        </>
      ),
    },
    {
      key: "15",
      title: "Chat",
      dataIndex: "chat",
      className: "comment-class ",
    },
  ];

  return (
    <>
      <div className="box-content-wrapper">
        <GlobalTable
          pagination={false}
          dataSource={blotterdata}
          bordered={false}
          prefixCls="TXNSummary_Table"
          columns={columns}
          scroll={{ x: "max-content" }}
        />
        <CommentModal
          comment={comment}
          setShowCommentModal={setShowCommentModal}
          showCommentModal={showCommentModal}
        />
      </div>
    </>
  );
};

export default TXNSummary;
