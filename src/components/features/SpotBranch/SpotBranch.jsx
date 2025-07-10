import React, { useEffect, useState } from "react";
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

const SpotBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Modal Context State

  const iSellAndBuyModal = useSelector(
    (state) => state.modalReducer.iSellAndBuyModal
  );

  //Card Data Local State
  const [watchlistCardData, setWatchlistCardData] = useState([]);
  const [watchlistTableData, setWatchlistTableData] = useState([]);

  console.log(watchlistTableData, "watchlistTableDatawatchlistTableData");
  //Global State for Watchlist Card Data
  const globalStateWatchlistCardData = useSelector(
    (state) => state.WatchListReducer?.GettheDashboardData ?? null
  );

  //By Default for having Six Tiles
  const [watchlistData, setWatchlistData] = useState({
    watchlist1: {
      currecncyLabel: "",
      instrumentID: 0,
      buyValue: "",
      sellValue: "",
    },
    watchlist2: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist3: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist4: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist5: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist6: { currecncyLabel: "", buyValue: "", sellValue: "" },
  });
  // Extracting out the Cards Wathlist data in the state
  useEffect(() => {
    try {
      if (
        globalStateWatchlistCardData &&
        globalStateWatchlistCardData !== null
      ) {
        const { spotApplicableInstruments } = globalStateWatchlistCardData;
        if (spotApplicableInstruments.length > 0) {
          const updateData = spotApplicableInstruments.map((list, index) => {
            return {
              ...list,
              bid: 200,
              offer: 215,
            };
          });
          setWatchlistTableData(updateData);
          const filterSections = updateData.filter(
            (list, index) => list.sectionID !== "0"
          );
          if (filterSections.length > 0) {
            setWatchlistData((prevData) => {
              const updatedData = { ...prevData };

              for (let i = 0; i < 6; i++) {
                const item = filterSections[i];
                updatedData[`watchlist${i + 1}`] = item
                  ? {
                      ...prevData[`watchlist${i + 1}`],
                      currecncyLabel: `${item.instrumentName}${item.secondaryInstrumentName}`,
                      buyValue: item.bid,
                      sellValue: item.offer,
                      instrumentID: item.instrumentID,
                    }
                  : prevData[`watchlist${i + 1}`]; // fallback to previous state if not found
              }

              return updatedData;
            });
          }
        }
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [globalStateWatchlistCardData]);

  //Watch<List>Data State

  console.log(watchlistData, "watchlistDatawatchlistData");

  //Column of my watch<list> Table
  const columns = [
    {
      title: "Instrument",
      dataIndex: "instrumentName",
      key: "instrumentName",
      width: "160px",
      align: "left",
      render: (text, record) => {
        console.log(text, record, "responseresponseresponse");
        return (
          <span className='instrument-column'>
            {record.secondaryInstrumentID === 0
              ? text
              : `${text}${record.secondaryInstrumentName}`}
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
        <div className='d-flex justify-content-center'>
          <BidAmountBox
            spot={false}
            BidAmountValue={text}
            applyClass='BidCardBox'
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
        <div className='d-flex justify-content-center'>
          <BidAmountBox
            spot={false}
            BidAmountValue={text}
            applyClass='OfferCardBox'
          />
        </div>
      ),
    },
  ];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log(result, "resultresultresultresult");

    // If there's no destination, do nothing
    if (!destination) return;

    // Handle dropping into BranchRateCardsOfWatchList
    if (destination.droppableId.startsWith("watchlist")) {
      const item = watchlistTableData[source.index]; // Get dragged item
      const { instrumentID, secondaryInstrumentID } = item; // Extract values
      //   Calling the save Droppale Item API
      let Data = {
        SectionID: String(source.index),
        InstrumentID: Number(instrumentID),
        SecondaryInstrumentID: Number(secondaryInstrumentID),
      };
      console.log(Data, "resultresultresultresult");

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
            className={className}>
            {children}
          </tr>
        )}
      </Draggable>
    );
  };
  return (
    <section>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row className='px-2'>
          <Col>
            <span className='FxTradingOuterBox'>
              <Row className='mt-2'>
                <Col lg={12} md={12} sm={12}>
                  <span className='FxTradingLabel'>FX Trading</span>
                </Col>
              </Row>

              <Row className='mt-3'>
                {[...Array(6)].map((_, index) => {
                  const droppableId = `watchlist${index + 1}`;
                  const data = watchlistData[droppableId] || {}; // Get data if available, else empty
                  console.log(data, "datadatadatadatadata");
                  return (
                    <Col key={index} lg={4} md={4} sm={12}>
                      <Droppable droppableId={droppableId}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}>
                            <BranchRateCardsOfWatchList
                              currencyLabel={data.currecncyLabel || ""}
                              buyHeading='I Buy'
                              sellHeading='I Sell'
                              buyValue={data.buyValue || ""}
                              sellValue={data.sellValue || ""}
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
          <Col lg={3} md={3} sm={12} className='WatchListOuterBox'>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <span className='WatchlistLabel'>Watchlist</span>
              </Col>
              <Col lg={6} md={6} sm={12} className='d-flex justify-content-end'>
                <span>21-11-2022 9:18 PM</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                {watchlistTableData.length > 0 ? (
                  <Droppable droppableId='droppable' direction='vertical'>
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
                            "data-row-key": record.instrumentID,
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
