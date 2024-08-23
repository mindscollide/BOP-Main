import React from "react";
import RadioButton from "../../common/radioButton/SwitchBtn";
import CustomButton from "../../common/globalButton/button";
import InputFIeld from "../../common/inputField/InputField";
import "./SpotRates.css";

const SpotRates = () => {
  return (
    <div className='col-12 px-1'>
      <div className='card-box p-0  h-auto'>
        <div className='box-header p-2 bg-Yorange-light color-dark'>
          <div className='d-flex align-items-center'>
            <div className='flex-fill ff-roboto fs-6 fw-bold color-dark'>
              Spot Rates (USD/PKR)
            </div>
            <div className='d-flex align-items-center'>
              {/*<button class="btn btn-default publish-rate-upload me-1 d-none" disabled>Publish</button>
                <button class="btn btn-default me-1 Refresh-spotrate">Refresh</button>
                <button class="btn btn-default me-1 clearclose-spotrate">Clear &amp; Close</button>
                <button class="btn btn-default me-1 enable-refresh-spotrate d-none">Enable Refresh</button>*/}
              <div className='form-check form-switch me-3'>
                <RadioButton labelValue={"ON / OFF"} />
                {/* <label className='form-check-label mt-1' htmlFor='MarketStatus'>
                  ON / OFF
                </label> */}
              </div>
              <CustomButton value={"Clear Rates"} applyClass='clearRates' />
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
                      type='number'
                      applyClass='RefreshInterval'
                    />
                    {/* <button className='btn btn-primary publish-rate-upload me-1'>
                      Publish
                    </button> */}
                    <CustomButton value={"Publish"} applyClass='publishBtn' />
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
                  02 May 2023, 10:46:20
                </div>
              </div>
              <div className='rate-box-content'>
                <div className='table-responsive h-auto'>
                  <table className='table text-center fs-6'>
                    <thead className=''>
                      <tr>
                        <th className='fs-6 color-primary border-bottom-1 bg-trRow'>Bid</th>
                        <th className='fs-6 color-primary  border-bottom-1 bg-trRow'>Ask</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className='border-0'>
                          <span className='bid-val mt-4 d-block fs-5  ff-roboto fw-bold'>
                            285.07
                          </span>
                        </td>
                        <td className='border-0'>
                          <span className='ask-val  mt-4 d-block fs-5 ff-roboto fw-bold'>
                            285.32
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
                  02 May 2023, 10:46:20
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
                            type='number'
                            className={
                              "text-center form-control ff-roboto mt-4 d-block fs-5 fw-bold mb-0"
                            }
                          />
                        </td>
                        <td className='border-0'>
                          <InputFIeld
                            min={1}
                            type='number'
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
    </div>
  );
};

export default SpotRates;
