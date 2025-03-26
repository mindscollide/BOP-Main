import React, { useEffect, useState } from "react";
import "./SpotBranch.css";
import { Col, Row } from "react-bootstrap";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import BranchRateCardsOfWatchList from "../../common/branchWatchlistDroppableCard/branchWatchlistCard";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import GlobalTable from "../../common/table/GlobalTable";
import SellAndBuyModal from "./SellAndBuyModal/SellAndBuyModal";
import { useModal } from "../../../context/ModalContext";
import ChatBox from "../chatBox/ChatBox.jsx";
import BlotterHeader from "@/container/pages/mainTreasury/tabsContent/liveRates/blotter/blotterHeader/BlotterHeader";
import {
  GetDashboardDataAPI,
  GetFXInstrumentsAPI,
  SaveUserDashboardAPI,
} from "./WatchlistAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SpotBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Modal Context State
  const { iSellAndBuyModal } = useModal();

  //Card Data Local State
  const [watchlistCardData, setWatchlistCardData] = useState([]);
  const [watchlistTableData, setWatchlistTableData] = useState([]);

  console.log(watchlistCardData, "watchlistTableDatawatchlistTableData");
  //Global State for Watchlist Card Data
  const globalStateWatchlistCardData = useSelector(
    (state) => state.WatchListReducer?.GettheDashboardData ?? null
  );

  //WatchList table Data Api Call
  useEffect(() => {
    try {
      dispatch(GetFXInstrumentsAPI({}));
      dispatch(GetDashboardDataAPI({}));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);

  // Extracting out the Cards Wathlist data in the state
  useEffect(() => {
    try {
      if (
        globalStateWatchlistCardData &&
        globalStateWatchlistCardData !== null
      ) {
        console.log(globalStateWatchlistCardData.watchLists, "watchLists");
        console.log(
          typeof globalStateWatchlistCardData.watchLists,
          "watchLists"
        );
        setWatchlistCardData(globalStateWatchlistCardData.sections);
        setWatchlistTableData(globalStateWatchlistCardData.watchLists);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }, [globalStateWatchlistCardData]);

  useEffect(() => {
    if (watchlistCardData.length > 0) {
      setWatchlistData((prevData) => {
        const updatedData = { ...prevData };

        watchlistCardData.forEach((item, index) => {
          if (index < 6) {
            updatedData[`watchlist${index + 1}`] = {
              currecncyLabel: item.instrumentName || "Unknown", // Handle null
              buyValue: item.buy ?? "--", // Handle null or undefined
              sellValue: item.sell ?? "--",
            };
          }
        });

        console.log(updatedData, "updated watchlistData");

        return updatedData;
      });
    }
  }, [watchlistCardData]);

  //Watch<List>Data State
  const [watchlistData, setWatchlistData] = useState({
    watchlist1: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist2: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist3: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist4: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist5: { currecncyLabel: "", buyValue: "", sellValue: "" },
    watchlist6: { currecncyLabel: "", buyValue: "", sellValue: "" },
  });

  //Column of my watch<list> Table
  const columns = [
    {
      title: "Instrument",
      dataIndex: "instrumentName",
      key: "instrumentName",
      width: "160px",
      align: "left",
      render: (text, record) => {
        console.log(text, "responseresponseresponse");
        return <span className="instrument-column">{text}</span>;
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
            spot={false}
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
            spot={false}
            BidAmountValue={text}
            applyClass="OfferCardBox"
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
      const { instrumentName, bid, offer, key, instrumentID } = item; // Extract values
      console.log(item, "resultresultresultresult");
      //   Calling the save Droppale Item API
      let Data = {
        DashboardSections: [
          {
            SectionID: Number(source.index),
            InstrumentID: Number(instrumentID),
            Sell: offer,
            Buy: bid,
          },
        ],
      };
      dispatch(SaveUserDashboardAPI({ Data }));
      setWatchlistData((prevData) => ({
        ...prevData,
        [destination.droppableId]: {
          currecncyLabel: instrumentName,
          buyValue: bid,
          sellValue: offer,
        },
      }));
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
          <Col>
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
                  console.log(data, "datadatadatadatadata");
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
                              buyHeading="I Buy"
                              sellHeading="I Sell"
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
          <Col lg={3} md={3} sm={12} className="WatchListOuterBox">
            <Row>
              <Col lg={6} md={6} sm={12}>
                <span className="WatchlistLabel">Watchlist</span>
              </Col>
              <Col lg={6} md={6} sm={12} className="d-flex justify-content-end">
                <span>21-11-2022 9:18 PM</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
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
                            row: DraggableBodyRow,
                          },
                        }}
                        onRow={(record, index) => {
                          console.log("Missing draggableId for row:", record); // Log the record
                          console.log("Missing draggableId for row:", index); // Log the index (optional)
                          return {
                            index,
                            "data-row-key": record.instrumentID, // Ensure this matches your API data
                          };
                        }}
                        scroll={{ y: 330, x: "auto" }}
                      />
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            </Row>
          </Col>
        </Row>
      </DragDropContext>
      {/* ChatBox Component */}
      {/* <ChatBox /> */}
      <BlotterHeader />
      {iSellAndBuyModal && <SellAndBuyModal />}
    </section>
  );
};

export default SpotBranch;
