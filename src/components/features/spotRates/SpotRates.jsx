import React, { useEffect, useState } from "react";
import SwitchButton from "../../common/switchButton/SwitchBtn";
import CustomButton from "../../common/globalButton/button";
import InputFIeld from "../../common/inputField/InputField";
import "./SpotRates.css";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  PublishNewRatesAction,
  clearRatesAction,
  getLastPublishRatesAction,
  marketOnOffAction,
} from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import { refreshIntervalSchema } from "@/common/validationSchemas";
import { useNavigate } from "react-router-dom";

const SpotRates = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const getLastPublishRates = useSelector(
    (state) => state.uploadRatesSlicer.getLastPublishRates
  );

  const currentUpdatedRates = useSelector(
    (state) => state.uploadRatesSlicer.getCurrentPublishRate
  );
  console.log(getLastPublishRates, "statestate");
  const [marketStatus, setMarketStatus] = useState(false);
  const [currentRates, setCurrentRates] = useState({
    askValue: "",
    bidValue: "",
    dateTime: "",
  });
  const [lastPublishRates, setLastPublishRates] = useState({
    askValue: "",
    bidValue: "",
    dateTime: "",
  });
  const [refreshInterval, setRefreshInterval] = useState(1);
  const [refreshIntervalError, setRefreshIntervalError] = useState("")

  useEffect(() => {
    let Data = { value: 1 };

    dispatch(getLastPublishRatesAction({ Data , navigate}));
  }, []);

  useEffect(() => {
    if (getLastPublishRates !== null) {
      try {
        const {
          lastAsk,
          lastBid,
          refreshInterval,
          lastPublishDateTime,
          currentAsk,
          currentBid,
          currentValueDateTime,
        } = getLastPublishRates;
        setLastPublishRates({
          ...lastPublishRates,
          askValue: lastAsk,
          bidValue: lastBid,
          dateTime: lastPublishDateTime,
        });
        setCurrentRates({
          ...currentRates,
          askValue: currentAsk,
          bidValue: currentBid,
          dateTime: currentValueDateTime,
        });
        setRefreshInterval(refreshInterval);
      } catch (error) {}
    }
  }, [getLastPublishRates]);

  useEffect(() => {
    if (currentUpdatedRates !== null) {
      try {
        const {
          lastAsk,
          lastBid,
          refreshInterval,
          lastPublishDateTime,
          currentAsk,
          currentBid,
          currentValueDateTime,
        } = currentUpdatedRates;
        setLastPublishRates({
          ...lastPublishRates,
          askValue: lastAsk,
          bidValue: lastBid,
          dateTime: lastPublishDateTime,
        });
        setCurrentRates({
          ...currentRates,
          askValue: currentAsk,
          bidValue: currentBid,
          dateTime: currentValueDateTime,
        });
        setRefreshInterval(refreshInterval);
      } catch (error) {}
    }
  }, [currentUpdatedRates]);

  const handleChangeMarketStatus = (checked) => {
    console.log(checked);
    setMarketStatus(checked);
    let Data = { IsOn: checked };
    dispatch(marketOnOffAction({ Data }));
  };
  const handleClearRates = () => {
    let Data = { value: 1 };
    dispatch(clearRatesAction({ Data }));
    console.log("first");
  };
  const handleChangeCurrentRate = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "bidValue") {
      setCurrentRates({
        ...currentRates,
        bidValue: value,
      });
    } else if (name === "askValue") {
      setCurrentRates({
        ...currentRates,
        askValue: value,
      });
    } else if (name === "refreshInterval") {
      let value = parseInt(e.target.value, 10) || 1;
      // Validate with Zod
      const validationResult = refreshIntervalSchema.safeParse(value);

      if (!validationResult.success) {
        setRefreshIntervalError(validationResult.error.errors[0].message);
      } else {
        setRefreshIntervalError("");
        setRefreshInterval(value);
      }
    }
  };
  const handlePublishRates = () => {
    let Data = {
      CurrentBid: Number(currentRates.bidValue),
      CurrentAsk: Number(currentRates.askValue),
      RefreshInterval: Number(refreshInterval),
    };
    dispatch(PublishNewRatesAction({ Data }));
  };
  return (
    <Row>
      <Col sm={12} md={12} lg={12}>
        <div className='card-box p-0  h-auto'>
          <div className='box-header p-2 bg-Yorange-light color-dark'>
            <div className='d-flex align-items-center'>
              <div className='flex-fill ff-roboto fs-6 fw-bold color-dark'>
                Spot Rates (USD/PKR)
              </div>
              <div className='d-flex align-items-center'>
                <div className='form-check form-switch me-3'>
                  <SwitchButton
                    labelValue={"ON / OFF"}
                    checked={marketStatus}
                    onChange={handleChangeMarketStatus}
                  />
                </div>
                <CustomButton
                  value={"Clear Rates"}
                  applyClass='clearRates'
                  onClick={handleClearRates}
                />
              </div>
            </div>
          </div>
          <div className='box-content-wrapper h-auto p-2'>
            <div className='row m-0'>
              <div className='col-12 mb-2'>
                <div className='d-flex justify-content-end'>
                  <div className='col-6'>
                    <div className='d-flex align-items-center justify-content-end refresh-interval-wrapper'>
                      <span className='updloadrates-hd fs-6 me-1 ff-roboto'>
                        Refresh Interval
                      </span>
                      <InputFIeld
                        min={1}
                        onChange={handleChangeCurrentRate}
                        name='refreshInterval'
                        value={refreshInterval}
                        type='number'
                        applyClass='RefreshInterval'
                      />

                      <CustomButton
                        value={"Publish"}
                        applyClass='publishBtn'
                        onClick={handlePublishRates}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row m-0'>
              {/* last updated column Begin */}
              <div className='col-md-6 col-sm-12 ps-1 pe-1 rate-box'>
                <div className='rate box-header d-flex align-items-center px-2'>
                  <div className='fw-bold fs-6 ff-roboto'>Last Published @</div>
                  <div className='datetime ms-auto ff-roboto'>
                    {lastPublishRates.dateTime}
                  </div>
                </div>
                <div className='rate-box-content'>
                  <div className='table-responsive h-auto'>
                    <table className='table text-center fs-6'>
                      <thead className=''>
                        <tr>
                          <th className='fs-6 color-primary border-bottom-1 bg-trRow'>
                            Bid
                          </th>
                          <th className='fs-6 color-primary  border-bottom-1 bg-trRow'>
                            Ask
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='border-0'>
                            <span className='bid-val mt-4 d-block fs-5  ff-roboto fw-bold'>
                              {lastPublishRates.bidValue}
                            </span>
                          </td>
                          <td className='border-0'>
                            <span className='ask-val  mt-4 d-block fs-5 ff-roboto fw-bold'>
                              {lastPublishRates.askValue}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* last updated column Begin */}
              {/* last updated column Begin */}
              <div className='col-md-6 col-sm-12 ps-1 pe-1 rate-box'>
                <div className='rate box-header d-flex align-items-center px-2'>
                  <div className='fw-bold fs-6 ff-roboto'>Current Value @</div>
                  <div className='datetime ms-auto ff-roboto'>
                    {currentRates.dateTime}
                  </div>
                </div>
                <div className='rate-box-content'>
                  <div className=' h-auto'>
                    <table className='table mb-0 text-center fs-6'>
                      <thead className=''>
                        <tr>
                          <th className='fs-6 color-primary bg-trRow'>Bid</th>
                          <th className='fs-6 color-primary bg-trRow'>Ask</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='border-0'>
                            <InputFIeld
                              min={1}
                              value={currentRates.bidValue}
                              onChange={handleChangeCurrentRate}
                              name='bidValue'
                              type='number'
                              className={
                                "text-center form-control ff-roboto mt-4 d-block fs-5 fw-bold mb-0"
                              }
                            />
                          </td>
                          <td className='border-0'>
                            <InputFIeld
                              min={1}
                              value={currentRates.askValue}
                              type='number'
                              onChange={handleChangeCurrentRate}
                              name='askValue'
                              className={
                                "text-center form-control ff-roboto  mt-4 d-block fs-5 fw-bold mb-0"
                              }
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              {/* last updated column Begin */}
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SpotRates;
