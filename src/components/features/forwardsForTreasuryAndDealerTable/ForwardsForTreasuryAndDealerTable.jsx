import NotificationSnackBar from "@/components/common/NotificationSnackbar";
import GlobalModal from "@/components/common/globalModal/Modal";
import {
  getTenorWiseForwardsAction,
  PublishTenorWiseForwardsAction,
} from "@/container/pages/mainDealer/dealerActions";
import {
  setForwardsForTreasuryBranch,
  updateForwardItem,
} from "@/store/dealerReducer/dealerSlicer";
import { tenorWiseFowardsRatesPublishedActions } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { formatCurrencyInput } from "@/utils/formatters";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useNotification } from "@/context/NotificationProvider";

// Define condition to include components
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
  import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

// Conditionally import components based on environment variables
const InputFIeld = shouldIncludeComponents
  ? lazy(() => import("../../common/inputField/InputField"))
  : null;

const CustomButton = shouldIncludeComponents
  ? lazy(() => import("../../common/globalButton/button"))
  : null;

const IconElement = shouldIncludeComponents
  ? lazy(() => import("../../common/IconElement/IconElement"))
  : null;

const GlobalTable = shouldIncludeComponents
  ? lazy(() => import("../../common/table/GlobalTable"))
  : null;

/**
 * ForwardsForTreasuryAndBranchTable component is responsible for displaying and managing
 * the forwards for treasury and dealer branch data in a tabular format.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.newTenorRecord - The new tenor record to be added.
 * @param {Function} props.setNewTenorRecord - Function to set the new tenor record.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <ForwardsForTreasuryAndBranchTable
 *   newTenorRecord={newTenorRecord}
 *   setNewTenorRecord={setNewTenorRecord}
 * />
 */
const TenoreWiseCurrentAndLastRates = ({
  newTenorRecord,
  setNewTenorRecord,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMessage } = useNotification();

  const marketStatus = useSelector(
    (state) => state.RealtimeActionsSlice.marketStatus
  );

  const getAllTenorsData = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const forwardsForTreasuryBranch = useSelector(
    (state) => state.dealerReducer.forwardsForTreasuryBranch
  );

  const getDashboardForwards = useSelector(
    (state) => state.dealerReducer.getDealerDashboardData
  );
  const getTenorWiseForwardsRates = useSelector(
    (state) => state.RealtimeActionsSlice.tenorWiseForwardsRates
  );

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [TenorRemoveRecord, setTenorRemoveRecord] = useState(null);
  useEffect(() => {
    if (newTenorRecord !== null) {
      let newData = [...forwardsForTreasuryBranch, newTenorRecord];
      dispatch(setForwardsForTreasuryBranch(newData));

      setNewTenorRecord(null);
    }
  }, [newTenorRecord]);

  useEffect(() => {
    if (getAllTenorsData !== null) {
      try {
        console.log(getAllTenorsData, "Filtered Applicable Tenors");

        const {
          currentTenorWiseForwardRates = [],
          lastTenorWiseForwardRates = [],
        } = getDashboardForwards !== null && getDashboardForwards;
        const { tenors } = getAllTenorsData;

        // Step 1: Filter only tenors where forward is applicable
        const applicableTenors = tenors.filter(
          (tenor) => tenor.isForwardingApplicable === true
        );

        // Step 2: Map applicable tenors to final formatted data
        const newDataMap = applicableTenors.map((tenor) => {
          const current = currentTenorWiseForwardRates.find(
            (item) => item.tenorID === tenor.tenorID
          );
          const last = lastTenorWiseForwardRates.find(
            (item) => item.tenorID === tenor.tenorID
          );

          return {
            tenorID: tenor.tenorID,
            tenorName: tenor.tenorName,
            currentBid: current?.bid ?? "0",
            currentAsk: current?.ask ?? "0",
            lastBid: last?.bid ?? "0",
            lastAsk: last?.ask ?? "0",
            dateTime: current?.dateTime ?? "",
          };
        });

        dispatch(setForwardsForTreasuryBranch(newDataMap));
      } catch (error) {
        console.error("Error processing tenor forwards:", error);
      }
    }
  }, [getDashboardForwards, getAllTenorsData]);

  useEffect(() => {
    if (getTenorWiseForwardsRates !== null) {
      try {
        const { currentTenorWiseForwardRates, lastTenorWiseForwardRates } =
          getTenorWiseForwardsRates.tenorWiseForwardRates;
        let newDataMap = currentTenorWiseForwardRates.map((item) => {
          let findData = lastTenorWiseForwardRates.find(
            (data) => data.tenorID === item.tenorID
          );
          if (findData !== undefined) {
            return {
              tenorID: item.tenorID,
              tenorName: item.tenorName,
              currentBid: item.bid,
              currentAsk: item.ask,
              lastBid: findData.bid,
              lastAsk: findData.ask,
              dateTime: item.dateTime,
            };
          } else {
            return {
              tenorID: item.tenorID,
              tenorName: item.tenorName,
              currentBid: item.bid,
              currentAsk: item.ask,
              lastBid: "",
              lastAsk: "",
              dateTime: item.dateTime,
            };
          }
        });
        dispatch(setForwardsForTreasuryBranch(newDataMap));

        dispatch(tenorWiseFowardsRatesPublishedActions(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [getTenorWiseForwardsRates]);

  const handleDeleteTenorRecord = (record) => {
    setTenorRemoveRecord(record);
    setConfirmationModal(true);
  };

  const handleYesConfirmatonModal = () => {
    const filteredRecords = forwardsForTreasuryBranch.filter(
      (item) => item.tenorID !== TenorRemoveRecord.tenorID
    );

    dispatch(setForwardsForTreasuryBranch(filteredRecords));
    setConfirmationModal(false);
  };
  const handleChangeCurrentForwards = (record, view, event) => {
    const { value } = event.target;
    try {
      dispatch(
        updateForwardItem({
          tenorID: record.tenorID,
          view,
          value,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handlePublishForwards = () => {
    let checkDoNotempty = forwardsForTreasuryBranch.every(
      (item) => item.currentAsk !== "" && item.currentBid !== ""
    );

    if (!checkDoNotempty) {
      const handleClick = () => {
        showMessage("Please fill all required fields.");
      };

      handleClick();
      return;
    }

    let checkAskValue = forwardsForTreasuryBranch.find(
      (item) =>
        Number(item.currentAsk) !== 0 &&
        Number(item.currentBid) !== 0 &&
        Number(item.currentAsk) < Number(item.currentBid)
    );

    if (checkAskValue !== undefined) {
      const handleClick = () => {
        showMessage("Ask value must be greater than Bid value.");
      };

      handleClick();
      return;
    }

    let Data = {
      CurrentTenorWiseForwardRates: forwardsForTreasuryBranch.map((item) => {
        return {
          TenorID: item.tenorID,
          Bid: Number(item.currentBid),
          Ask: Number(item.currentAsk),
          DateTime: item.dateTime,
        };
      }),
    };
    dispatch(PublishTenorWiseForwardsAction({ Data, navigate }));
  };

  const columns = [
    {
      title: "",
      children: [
        {
          title: "Tenor",
          dataIndex: "tenorName",
          key: "tenorName",
          width: 250,
        },
      ],
    },
    {
      title: "Current",
      children: [
        {
          title: "Bid",
          dataIndex: "currentBid",
          key: "currentBid",
          align: "center",
          render: (text, record) =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld
                  type='number'
                  value={record.currentBid}
                  onChange={(event) =>
                    handleChangeCurrentForwards(record, "bid", event)
                  }
                  applyClass={"DealerTableBitInput"}
                />
              </Suspense>
            ) : null,
        },
        {
          title: "Ask",
          dataIndex: "currentAsk",
          key: "currentAsk",
          align: "center",
          render: (text, record) =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld
                  type='number'
                  value={record.currentAsk}
                  onChange={(event) =>
                    handleChangeCurrentForwards(record, "ask", event)
                  }
                  applyClass={"DealerTableBitInput"}
                />
              </Suspense>
            ) : null,
        },
      ],
    },
    {
      title: "Last",
      children: [
        {
          title: "Bid",
          dataIndex: "lastBid",
          key: "lastBid",
          align: "center",
          render: (text, record) =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld
                  type='number'
                  value={record.lastBid}
                  disabled={true}
                  applyClass={"DealerTableBitInput"}
                />
              </Suspense>
            ) : null,
        },
        {
          title: "Ask",
          dataIndex: "lastAsk",
          key: "lastAsk",
          align: "center",
          render: (text, record) =>
            InputFIeld ? (
              <Suspense fallback={<div>Loading input...</div>}>
                <InputFIeld
                  type='number'
                  value={record.lastAsk}
                  disabled={true}
                  applyClass={"DealerTableBitInput"}
                />
              </Suspense>
            ) : null,
        },
      ],
    },
    {
      title: "",
      key: "",
      children: [
        {
          title: "",
          dataIndex: "",
          key: "",
          width: 80,
          align: "center",
          render: (record) => {
            return (
              CustomButton &&
              IconElement && (
                <Suspense fallback={<div>Loading button...</div>}>
                  <CustomButton
                    type='link'
                    icon={
                      <Suspense fallback={<div>Loading icon...</div>}>
                        <IconElement
                          iconClass={"icon-close color-red fs-6 cursor-pointer"}
                          onClick={() => handleDeleteTenorRecord(record)}
                        />
                      </Suspense>
                    }
                  />
                </Suspense>
              )
            );
          },
        },
      ],
    },
  ];

  return (
    <>
      {GlobalTable && (
        <>
          <Suspense fallback={<div>Loading Table...</div>}>
            <GlobalTable
              columns={columns}
              dataSource={forwardsForTreasuryBranch}
              prefixCls={"ForwardsForTreasuryAndBranchTable"}
              pagination={false}
            />
            {CustomButton && (
              <span className='d-flex justify-content-center mt-4'>
                <CustomButton
                  applyClass='publishForwardsBtn'
                  value={"Publish Forwards"}
                  onClick={handlePublishForwards}
                  disabled={marketStatus === false ? true : false}
                />
              </span>
            )}
            <GlobalModal
              show={confirmationModal}
              centered={true}
              footerClassName={"d-block border-0"}
              bodyClassName={"b-0"}
              modalBody={
                <>
                  <Row>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className='d-flex justify-content-center'>
                      <span className='modalDescription'>
                        Are you sure you want to delete it
                      </span>
                    </Col>
                  </Row>
                </>
              }
              modalFooter={
                <>
                  <Row>
                    <Col
                      sm={6}
                      md={6}
                      lg={6}
                      className='d-flex justify-content-end'>
                      <CustomButton
                        value={"Yes"}
                        onClick={handleYesConfirmatonModal}
                        applyClass={"ConfirmationModalYesDealBox"}
                      />
                    </Col>
                    <Col
                      sm={6}
                      md={6}
                      lg={6}
                      className='d-flex justify-content-start'>
                      <CustomButton
                        value={"No"}
                        onClick={() => setConfirmationModal(false)}
                        applyClass={"ConfirmationModalNoDealBox"}
                      />
                    </Col>
                  </Row>
                </>
              }
            />
          </Suspense>
        </>
      )}
    </>
  );
};

export default TenoreWiseCurrentAndLastRates;
