import React, { useState } from "react";
import "./SpotBranch.css";
import { Col, Row } from "react-bootstrap";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import BranchRateCardsOfWatchList from "../../common/branchWatchlistDroppableCard/branchWatchlistCard";
import BidAmountBox from "../../common/bidAmountBox/BidAmountBox";
import GlobalTable from "../../common/table/GlobalTable";
import SellAndBuyModal from "./SellAndBuyModal/SellAndBuyModal";
import { useModal } from "../../../context/ModalContext";
import ChatBox from "../chatBox/ChatBox.jsx";

const SpotBranch = () => {
  //Modal Context State
  const { iSellAndBuyModal } = useModal();

  console.log(iSellAndBuyModal, "iSellAndBuyModal");
  //Data to be rendered in the Table
  const [dataSource, setDataSource] = useState([
    { key: "1", instrument: "USDPKR", bid: "288.00", offer: "289.00" },
    { key: "2", instrument: "EURPKR", bid: "308.60", offer: "308.85" },
    { key: "3", instrument: "EUR", bid: "308.60", offer: "308.85" },
    { key: "4", instrument: "GBPPKR", bid: "355.18", offer: "355.44" },
    { key: "5", instrument: "CNYPKR", bid: "40.76", offer: "40.80" },
    { key: "6", instrument: "JPYPKR", bid: "2.0727", offer: "2.0742" },
    { key: "7", instrument: "AUDPKR", bid: "188.45", offer: "188.60" },
    { key: "8", instrument: "CHFPKR", bid: "181.24", offer: "180.09" },
  ]);

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
      dataIndex: "instrument",
      key: "instrument",
      width: "160px",
      align: "left",
      render: (text) => <span className="instrument-column">{text}</span>,
    },
    {
      title: "Bid",
      dataIndex: "bid",
      key: "bid",
      width: "120px",
      align: "center",
      render: (text) => (
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
      render: (text) => (
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

  //Handle Draging function
  const onDragEnd = (result) => {
    const { source, destination } = result;

    console.log(result, "drag result");

    // If no destination, return
    if (!destination) {
      console.log("No destination");
      return;
    }

    // Handle reordering within the table
    if (destination.droppableId === "droppable") {
      const reorderedDataSource = Array.from(dataSource);
      const [movedItem] = reorderedDataSource.splice(source.index, 1);
      reorderedDataSource.splice(destination.index, 0, movedItem);
      setDataSource(reorderedDataSource);
    } else {
      // Handle dropping into BranchRateCardsOfWatchList
      const item = dataSource[source.index];
      const { bid, offer } = item;

      // Update the watchlist data based on the destination droppableId
      setWatchlistData((prevData) => ({
        ...prevData,
        [destination.droppableId]: {
          currecncyLabel: item.instrument,
          buyValue: bid,
          sellValue: offer,
        },
      }));
    }
  };

  // Draggable Row of the table
  const DraggableBodyRow = ({ index, className, style, ...restProps }) => {
    const { children, ...draggableProps } = restProps;

    return (
      <Draggable draggableId={draggableProps["data-row-key"]} index={index}>
        {(provided, snapshot) => (
          <tr
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...style,
              height: "0px",
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
              {/* First Row of Dragger below */}
              <Row className="mt-2">
                <Col lg={4} md={4} sm={12}>
                  <Droppable droppableId="watchlist1">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <BranchRateCardsOfWatchList
                          currencyLabel={
                            watchlistData.watchlist1.currecncyLabel
                          }
                          buyHeading="I Buy"
                          sellHeading="I Sell"
                          buyValue={watchlistData.watchlist1.buyValue}
                          sellValue={watchlistData.watchlist1.sellValue}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <Droppable droppableId="watchlist2">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <BranchRateCardsOfWatchList
                          currencyLabel={
                            watchlistData.watchlist2.currecncyLabel
                          }
                          buyHeading="I Buy"
                          sellHeading="I Buy"
                          buyValue={watchlistData.watchlist2.buyValue}
                          sellValue={watchlistData.watchlist2.sellValue}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <Droppable droppableId="watchlist3">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <BranchRateCardsOfWatchList
                          currencyLabel={
                            watchlistData.watchlist3.currecncyLabel
                          }
                          buyHeading="I Buy"
                          sellHeading="I Buy"
                          buyValue={watchlistData.watchlist3.buyValue}
                          sellValue={watchlistData.watchlist3.sellValue}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
              </Row>
              {/* Second Row of Dragger below */}
              <Row className="mt-2">
                <Col lg={4} md={4} sm={12}>
                  <Droppable droppableId="watchlist4">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <BranchRateCardsOfWatchList
                          currencyLabel={
                            watchlistData.watchlist4.currecncyLabel
                          }
                          buyHeading="I Buy"
                          sellHeading="I Sell"
                          buyValue={watchlistData.watchlist4.buyValue}
                          sellValue={watchlistData.watchlist4.sellValue}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <Droppable droppableId="watchlist5">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <BranchRateCardsOfWatchList
                          currencyLabel={
                            watchlistData.watchlist5.currecncyLabel
                          }
                          buyHeading="I Buy"
                          sellHeading="I Buy"
                          buyValue={watchlistData.watchlist5.buyValue}
                          sellValue={watchlistData.watchlist5.sellValue}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
                <Col lg={4} md={4} sm={12}>
                  <Droppable droppableId="watchlist6">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <BranchRateCardsOfWatchList
                          currencyLabel={
                            watchlistData.watchlist6.currecncyLabel
                          }
                          buyHeading="I Buy"
                          sellHeading="I Buy"
                          buyValue={watchlistData.watchlist6.buyValue}
                          sellValue={watchlistData.watchlist6.sellValue}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Col>
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
                        dataSource={dataSource}
                        prefixCls={"WatchList_table"}
                        pagination={false}
                        bordered={false}
                        components={{
                          body: {
                            row: DraggableBodyRow,
                          },
                        }}
                        onRow={(record, index) => ({
                          index,
                          "data-row-key": record.key,
                        })}
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
      <ChatBox />
      {iSellAndBuyModal && <SellAndBuyModal />}
    </section>
  );
};

export default SpotBranch;
