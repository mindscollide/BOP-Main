import React, { useEffect, useRef, useState } from "react";
import "./SpotBranch.css";
import { Col, Row } from "react-bootstrap";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import BranchRateCardsOfWatchList from "../../common/branchWatchlistDroppableCard/branchWatchlistCard";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import GlobalTable from "../../common/table/GlobalTable";
import SellAndBuyModal from "./SellAndBuyModal/SellAndBuyModal";
import { SaveUserDashboardAPI } from "./WatchlistAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatDateUTCToGMT } from "@/components/utils/timeFunction";
import moment from "moment";
import { throttle } from "lodash";
import { setFxTradingCards } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { setWatchlistTableDataCopy } from "@/store/watchListSlicer/WatchListSlicer";

const initialWatchlistData = Object.fromEntries(
  Array.from({ length: 6 }, (_, i) => [
    `watchlist${i + 1}`,
    {
      tile: String(i + 1),
      currecncyLabel: "",
      instrumentID: 0,
      secondaryInstrumentID: 0,
      buyValue: "",
      sellValue: "",
      instrumentName: "",
      secondaryInstrumentName: "",
    },
  ])
);

const isBranch = import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
const isCorporate = import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";

const SpotBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Modal Context State

  const iSellAndBuyModal = useSelector(
    (state) => state.modalReducer.iSellAndBuyModal
  );

  const CounterPartySpotRates = useSelector(
    (state) => state.RealtimeActionsSlice.CounterPartySpotRates
  );

  //Card Data Local State
  // const [watchlistCardData, setWatchlistCardData] = useState([]);
  const [watchlistTableData, setWatchlistTableData] = useState([]);
  const [watchListDateTime, setWatchListDateTime] = useState(null);

  //Global State for Watchlist Card Data
  const getAllInstrumentsForCounterPartiesData = useSelector(
    (state) => state.WatchListReducer?.getAllInstrumentForCounterParties ?? null
  );

  const GetSpotRatesForCounterParty = useSelector(
    (state) => state.BlotterSlicer.GetSpotRatesForCounterParty
  );
  const FxTradingCards = useSelector(
    (state) => state.RealtimeActionsSlice.FxTradingCards
  );
  const marketStatus = useSelector(
    (state) => state.WatchListReducer.getMarketStatus
  );

  const ClearRatesData = useSelector(
    (state) => state.RealtimeActionsSlice.ClearRatesData
  );

  console.log(ClearRatesData, "ClearRatesDataClearRatesData");

  const [watchlistData, setWatchlistData] = useState(initialWatchlistData);

  console.log(watchlistData, "watchlistDatawatchlistData");
  // Extracting out the Cards Wathlist data in the state
  useEffect(() => {
    try {
      if (getAllInstrumentsForCounterPartiesData !== null) {
        const { spotApplicableInstruments } =
          getAllInstrumentsForCounterPartiesData;
        const { instruments = [], time = "" } =
          GetSpotRatesForCounterParty !== null && GetSpotRatesForCounterParty;

        // // Format time
        const DataTime = time !== "" && formatDateUTCToGMT(time);

        setWatchListDateTime(time !== "" && DataTime);

        if (spotApplicableInstruments.length > 0) {
          // Step 1: Map instruments and merge bid/offer
          const updatedTableData = spotApplicableInstruments.map((item) => {
            const matched = instruments.find(
              (rate) =>
                rate.instrumentID === item.instrumentID &&
                rate.secondaryInstrumentID === item.secondaryInstrumentID
            );

            return {
              ...item,
              bid: matched?.bid ?? 0,
              offer: matched?.offer ?? 0,
            };
          });

          // Update table state
          setWatchlistTableData(updatedTableData);
          dispatch(setWatchlistTableDataCopy(updatedTableData));

          // Step 2: Update section watchlists (1-6) based on sectionID
          const filteredSections = updatedTableData.filter(
            (item) => item.sectionID !== "0"
          );

          if (filteredSections.length > 0) {
            // Update each section
            filteredSections.forEach((item) => {
              const sectionID = item.sectionID || item.SectionID;
              // const key = `watchlist${sectionID}`;

              const sectionKey = `watchlist${sectionID}`;

              setWatchlistData((prev) => ({
                ...prev,
                [sectionKey]: {
                  ...prev[sectionKey],
                  currecncyLabel: `${item.instrumentName}${item.secondaryInstrumentName}`,
                  buyValue: item.bid,
                  sellValue: item.offer,
                  instrumentID: item.instrumentID,
                  secondaryInstrumentID: item.secondaryInstrumentID,
                  isSell: item.isSell,
                  isBuy: item.isBuy,
                  instrumentName: item.instrumentName,
                  secondaryInstrumentName: item.secondaryInstrumentName,
                },
              }));
            });
          }
        }
      }
    } catch (error) {
      console.error("Watchlist Error:", error);
    }
  }, [getAllInstrumentsForCounterPartiesData, GetSpotRatesForCounterParty]);

  const throttledUpdateTableData = useRef(
    throttle((CounterPartySpotRates) => {
      const { instrumentSpotData } = CounterPartySpotRates;

      setWatchlistTableData((prevState) =>
        prevState.map((data2) => {
          const getData = instrumentSpotData.find(
            (data3) =>
              data2.instrumentID === data3.instrumentID &&
              data2.secondaryInstrumentID === data3.secondaryInstrumentID
          );

          if (
            getData &&
            (data2.bid !== getData.bid || data2.offer !== getData.ask)
          ) {
            return {
              ...data2,
              bid: getData.bid,
              offer: getData.ask,
            };
          }

          return data2;
        })
      );
      dispatch(
        setWatchlistTableDataCopy((prevState) =>
          prevState.map((data2) => {
            const getData = instrumentSpotData.find(
              (data3) =>
                data2.instrumentID === data3.instrumentID &&
                data2.secondaryInstrumentID === data3.secondaryInstrumentID
            );

            if (
              getData &&
              (data2.bid !== getData.bid || data2.offer !== getData.ask)
            ) {
              return {
                ...data2,
                bid: getData.bid,
                offer: getData.ask,
              };
            }

            return data2;
          })
        )
      );

      setWatchlistData((prev) => {
        const updated = { ...prev };
        Object.keys(prev).forEach((key) => {
          const sectionData = prev[key];
          const matchingData = instrumentSpotData.find(
            (data) =>
              data.instrumentID === sectionData.instrumentID &&
              data.secondaryInstrumentID === sectionData.secondaryInstrumentID
          );

          if (matchingData) {
            updated[key] = {
              ...sectionData,
              buyValue: matchingData.bid,
              sellValue: matchingData.ask,
            };
          }
        });
        return updated;
      });
    }, 500) // 👈 Add throttle duration
  ).current;

  useEffect(() => {
    if (CounterPartySpotRates?.instrumentSpotData) {
      throttledUpdateTableData(CounterPartySpotRates);
    }
  }, [CounterPartySpotRates]);

  useEffect(() => {
    if (FxTradingCards !== null) {
      try {
        const { instrumentID, secondaryInstrumentID, sectionID } =
          FxTradingCards?.dashboardSection;

        const matchingData = watchlistTableData.find(
          (data) =>
            data.instrumentID === instrumentID &&
            data.secondaryInstrumentID === secondaryInstrumentID
        );

        if (matchingData && sectionID >= 1 && sectionID <= 6) {
          const sectionKey = `watchlist${sectionID}`;

          setWatchlistData((prev) => ({
            ...prev,
            [sectionKey]: {
              ...prev[sectionKey],
              currecncyLabel: `${matchingData.instrumentName}${matchingData.secondaryInstrumentName}`,
              buyValue: matchingData.bid,
              sellValue: matchingData.offer,
              instrumentID: matchingData.instrumentID,
              secondaryInstrumentID: matchingData.secondaryInstrumentID,
              isSell: matchingData.isSell,
              isBuy: matchingData.isBuy,
              instrumentName: matchingData.instrumentName,
              secondaryInstrumentName: matchingData.secondaryInstrumentName,
            },
          }));
        }
        dispatch(setFxTradingCards(null)); // Clear FxTradingCards after processing
      } catch (error) {
        console.error(
          "Error while setting real-time FxTradingCards data:",
          error
        );
      }
    }
  }, [FxTradingCards]);

  useEffect(() => {
    try {
      if (marketStatus !== null && marketStatus === false) {
        setWatchlistData(initialWatchlistData);
        setWatchlistTableData((prev) => {
          return prev.map((data) => {
            return {
              ...data,
              bid: 0, // Reset bid to 0
              offer: 0, // Reset offer to 0
            };
          });
        });
      }
    } catch (error) {
      console.error("Invalid marketStatus JSON:", marketStatus);
    }
  }, [marketStatus]);

  useEffect(() => {
    try {
      if (ClearRatesData?.areRatesClear) {
        setWatchlistData((prev) => {
          const updated = { ...prev };
          Object.keys(updated).forEach((key) => {
            if (updated[key]?.secondaryInstrumentName === "PKR") {
              updated[key] = {
                ...updated[key],
                buyValue: 0,
                sellValue: 0,
              };
            }
          });
          return updated;
        });

        setWatchlistTableData((prev) =>
          prev.map((data) =>
            data.secondaryInstrumentName === "PKR"
              ? { ...data, bid: 0, offer: 0 }
              : data
          )
        );
      }
    } catch (error) {
      console.error(
        "Error clearing PKR rates on ClearRatesData update:",
        error
      );
    }
  }, [ClearRatesData]);

  //Column of my watch<list> Table
  const columns = [
    {
      title: "Instrument",
      dataIndex: "instrumentName",
      key: "instrumentName",
      width: "160px",
      align: "left",
      render: (text, record) => {
        return (
          <span className="instrument-column">
            {`${record.instrumentName}${record.secondaryInstrumentName}`}
          </span>
        );
      },
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
      width: "120px",
      align: "center",
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          <BidAmountBox
            // spot={true}
            bankSpot={true}
            BidAmountValue={text}
            applyClass="BidCardBox"
          />
        </div>
      ),
    },
    {
      title: "Offer",
      dataIndex: "offer",
      key: "offer",
      align: "center",
      width: "120px",
      render: (text, record) => (
        <div className="d-flex justify-content-center">
          <BidAmountBox
            bankSpot={true}
            BidAmountValue={text}
            applyClass="OfferCardBox"
          />
        </div>
      ),
    },
  ];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    // Only proceed if item is dropped into one of the watchlist tiles
    if (destination.droppableId.startsWith("watchlist")) {
      const item = watchlistTableData[source.index]; // Dragged item
      const findSectionID = watchlistData[destination.droppableId]; // Get correct tile object
      const { instrumentID, secondaryInstrumentID } = item;

      const Data = {
        SectionID: String(findSectionID.tile), // Use tile number instead of index
        InstrumentID: Number(instrumentID),
        SecondaryInstrumentID: Number(secondaryInstrumentID),
      };

      dispatch(SaveUserDashboardAPI({ navigate, Data }));
    }
  };

  // Draggable Row of the table
  const DraggableBodyRow = ({ index, className, style, ...restProps }) => {
    const { children, ...draggableProps } = restProps;
    const draggableId = draggableProps["data-row-key"] || `row-${index}`;

    if (!draggableId) {
      console.error("Missing draggableId for row:", index, draggableProps);
    }

    return (
      <Draggable draggableId={String(draggableId)} index={index}>
        {(provided, snapshot) => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...style,
              ...provided.draggableProps.style,
            }}
            className={className}
          >
            {children}
          </tr>
        )}
      </Draggable>
    );
  };
  return (
    <section>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row className="px-2">
          <Col lg={9} md={9} sm={12}>
            <span className="FxTradingOuterBox">
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <span className="FxTradingLabel">FX Trading</span>
                </Col>
              </Row>

              <Row className="mt-3">
                {[...Array(6)].map((_, index) => {
                  const droppableId = `watchlist${index + 1}`;
                  const data = watchlistData[droppableId] || {}; // Get data if available, else empty
                  return (
                    <Col key={index} lg={4} md={4} sm={12}>
                      <Droppable droppableId={droppableId}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            <BranchRateCardsOfWatchList
                              currencyLabel={data.currecncyLabel || ""}
                              buyHeading={isBranch ? "BOP Buy" : "I Buy"}
                              sellHeading={isBranch ? "BOP Sell" : "I Sell"}
                              buyValue={
                                isCorporate ? data.sellValue : data.buyValue
                              }
                              sellValue={
                                isCorporate ? data.buyValue : data.sellValue
                              }
                              // buyHeading="I Buy"
                              // sellHeading="I Sell"
                              // buyValue={data.buyValue || ""}
                              // sellValue={data.sellValue || ""}
                              isSellDisabled={data.isSell}
                              isBuyDisabled={data.isBuy}
                              instrumentID={data.instrumentID || 0}
                              secondaryInstrumentID={
                                data.secondaryInstrumentID || 0
                              }
                              instrumentName={data.instrumentName}
                              secondaryInstrumentName={
                                data.secondaryInstrumentName
                              }
                            />
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </Col>
                  );
                })}
              </Row>
            </span>
          </Col>
          <Col lg={3} md={3} sm={12} className="WatchListOuterBox">
            <Row>
              <Col lg={6} md={6} sm={12}>
                <span className="WatchlistLabel">Watchlist</span>
              </Col>
              <Col lg={6} md={6} sm={12} className="d-flex justify-content-end">
                {/* <span>21-11-2022 9:18 PM</span> */}
                <span>
                  {watchListDateTime !== null &&
                    watchListDateTime !== false &&
                    moment(watchListDateTime).format("DD-MM-YYYY h:mm A")}
                </span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {watchlistTableData.length > 0 ? (
                  <Droppable droppableId="droppable" direction="vertical">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <GlobalTable
                          columns={columns}
                          dataSource={watchlistTableData}
                          prefixCls={"WatchList_table"}
                          pagination={false}
                          bordered={false}
                          components={{
                            body: {
                              row: DraggableBodyRow, // Drag functionality only works with this component
                            },
                          }}
                          onRow={(record, index) => ({
                            index,
                            "data-row-key": index,
                          })}
                          scroll={{ y: 330, x: "auto" }}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ) : (
                  <GlobalTable
                    columns={columns}
                    dataSource={watchlistTableData}
                    prefixCls={"WatchList_table"}
                    pagination={false}
                    bordered={false}
                    scroll={{ y: 330, x: "auto" }}
                  />
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </DragDropContext>
      {/* ChatBox Component */}
      {/* <ChatBox /> */}
      {/* <Blotter /> */}
      {iSellAndBuyModal && <SellAndBuyModal />}
    </section>
  );
};

export default SpotBranch;
