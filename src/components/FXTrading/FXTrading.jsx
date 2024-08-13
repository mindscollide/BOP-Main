import React from "react";

const FXTrading = () => {
  return (
    <div className='col p-0 pe-2  mb-2'>
      <div className='card-box bg-Yorange-light h-auto'>
        <div className='box-header px-3 py-2'>
          <div className='text-start fw-bold fs-6'>FX Trading</div>
        </div>
        {/*box content*/}
        <div className='box-content-wrapper mt-0 h-350 overflow-inherit p-2'>
          {/*Rate boxes row*/}
          <div className='row m-0'>
            {/*column  start*/}
            <div className='col-md-4 col-sm-6 px-1'>
              <div
                className='box-item mt-0 bg-Yorange-light2 no-inst-added droppable-inst ui-droppable'
                data-tile-id='InsTile1'>
                <div className='box-item-inner'>
                  {/*box header*/}
                  <div className='box-header d-flex align-items-center'>
                    <div className='heading'>
                      {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                      <span className='fs-4 fw-bold ins-title' />
                      <small className='fw-normal ins-subtitle' />
                    </div>
                    {/*<div class="box-dd ms-auto">
                          <select class="selectpicker select-rate-type">
                            <option selected value="Spot">Spot</option>
                            <option value="Forward">Forward</option>
                            <option value="Discounting">Discounting</option>
                          </select>
                        </div>*/}
                  </div>
                  {/*box content*/}
                  <div className='box-content tab-content'>
                    {/*USD spot item*/}
                    <div className='inst-content'>
                      <div className='d-flex align-items-center'>
                        <div
                          className='col px-1 py-2 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Sell'>
                          <div
                            className='text-center rate-area showcase-sell p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Sell</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate' />
                              <span className='fs-5 fw-bold rate-decimal' />
                            </div>
                          </div>
                        </div>
                        <div
                          className='col px-1 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Buy'>
                          <div
                            className='text-center rate-area showcase-buy p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Buy</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate' />
                              <span className='fs-5 fw-bold rate-decimal' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*no intsturment content wrapper start*/}
                <div className='no-inst-content'>
                  <div className='no-inst-content-inner text-center'>
                    <div className='dragg-icn'>
                      <img src='img/no-inst-icn.png' width={50} />
                    </div>
                    Drop Insturment
                  </div>
                </div>
                {/*no intsturment content wrapper end ...////...*/}
              </div>
            </div>
            {/*column  end*/}
            {/*column  start*/}
            <div className='col-md-4 col-sm-6 px-1'>
              <div
                className='box-item bg-Yorange-light2 mt-0 no-inst-added droppable-inst ui-droppable'
                data-tile-id='InsTile2'>
                <div className='box-item-inner'>
                  {/*box header*/}
                  <div className='box-header d-flex align-items-center'>
                    <div className='heading'>
                      {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                      <span className='fs-4 fw-bold ins-title' />
                      <small className='fw-normal ins-subtitle' />
                    </div>
                    {/*<div class="box-dd ms-auto">
                          <select class="selectpicker select-rate-type">
                            <option selected value="Spot">Spot</option>
                            <option value="Forward">Forward</option>
                            <option value="Discounting">Discounting</option>
                          </select>
                        </div>*/}
                  </div>
                  {/*box content*/}
                  <div className='box-content tab-content'>
                    {/*USD spot item*/}
                    <div className='inst-content'>
                      <div className='d-flex align-items-center'>
                        <div
                          className='col px-1 py-2 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Sell'>
                          <div
                            className='text-center rate-area showcase-sell p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Sell</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate' />
                              <span className='fs-5 fw-bold rate-decimal' />
                            </div>
                          </div>
                        </div>
                        <div
                          className='col px-1 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Buy'>
                          <div
                            className='text-center rate-area showcase-buy p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Buy</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate' />
                              <span className='fs-5 fw-bold rate-decimal' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*no intsturment content wrapper start*/}
                <div className='no-inst-content'>
                  <div className='no-inst-content-inner text-center'>
                    <div className='dragg-icn'>
                      <img src='img/no-inst-icn.png' width={50} />
                    </div>
                    Drop Insturment
                  </div>
                </div>
                {/*no intsturment content wrapper end ...////...*/}
              </div>
            </div>
            {/*column  end*/}
            {/*column  start*/}
            <div className='col-md-4 col-sm-6 px-1'>
              <div
                className='box-item bg-Yorange-light2 mt-0 droppable-inst ui-droppable'
                data-tile-id='InsTile3'>
                <div className='box-item-inner'>
                  {/*box header*/}
                  <div className='box-header d-flex align-items-center'>
                    <div className='heading'>
                      {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                      <span className='fs-4 fw-bold ins-title'>USD</span>
                      <small className='fw-normal ins-subtitle'>PKR</small>
                    </div>
                    {/*<div class="box-dd ms-auto">
                          <select class="selectpicker select-rate-type">
                            <option selected value="Spot">Spot</option>
                            <option value="Forward">Forward</option>
                            <option value="Discounting">Discounting</option>
                          </select>
                        </div>*/}
                  </div>
                  {/*box content*/}
                  <div className='box-content tab-content'>
                    {/*USD spot item*/}
                    <div className='inst-content'>
                      <div className='d-flex align-items-center'>
                        <div
                          className='col px-1 py-2 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Sell'>
                          <div
                            className='text-center rate-area showcase-sell p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Sell</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate'>289.</span>
                              <span className='fs-5 fw-bold rate-decimal'>
                                00
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className='col px-1 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Buy'>
                          <div
                            className='text-center rate-area showcase-buy p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Buy</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate'>288.</span>
                              <span className='fs-5 fw-bold rate-decimal'>
                                00
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*no intsturment content wrapper start*/}
                <div className='no-inst-content' style={{ display: "none" }}>
                  <div className='no-inst-content-inner text-center'>
                    <div className='dragg-icn'>
                      <img src='img/no-inst-icn.png' width={50} />
                    </div>
                    Drop Insturment
                  </div>
                </div>
                {/*no intsturment content wrapper end ...////...*/}
              </div>
            </div>
            {/*column  end*/}
            {/*column  start*/}
            <div className='col-md-4 col-sm-6 px-1'>
              <div
                className='box-item bg-Yorange-light2 mt-0 no-inst-added droppable-inst ui-droppable'
                data-tile-id='InsTile4'>
                <div className='box-item-inner'>
                  {/*box header*/}
                  <div className='box-header d-flex align-items-center'>
                    <div className='heading'>
                      {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                      <span className='fs-4 fw-bold ins-title' />
                      <small className='fw-normal ins-subtitle' />
                    </div>
                    {/*<div class="box-dd ms-auto">
                          <select class="selectpicker select-rate-type">
                            <option selected value="Spot">Spot</option>
                            <option value="Forward">Forward</option>
                            <option value="Discounting">Discounting</option>
                          </select>
                        </div>*/}
                  </div>
                  {/*box content*/}
                  <div className='box-content tab-content'>
                    {/*USD spot item*/}
                    <div className='inst-content'>
                      <div className='d-flex align-items-center'>
                        <div
                          className='col px-1 py-2 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Sell'>
                          <div
                            className='text-center rate-area showcase-sell p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Sell</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate' />
                              <span className='fs-5 fw-bold rate-decimal' />
                            </div>
                          </div>
                        </div>
                        <div
                          className='col px-1 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Buy'>
                          <div
                            className='text-center rate-area showcase-buy p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Buy</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate' />
                              <span className='fs-5 fw-bold rate-decimal' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*no intsturment content wrapper start*/}
                <div className='no-inst-content'>
                  <div className='no-inst-content-inner text-center'>
                    <div className='dragg-icn'>
                      <img src='img/no-inst-icn.png' width={50} />
                    </div>
                    Drop Insturment
                  </div>
                </div>
                {/*no intsturment content wrapper end ...////...*/}
              </div>
            </div>
            {/*column  end*/}
            {/*column  start*/}
            <div className='col-md-4 col-sm-6 px-1'>
              <div
                className='box-item bg-Yorange-light2 mt-0 no-inst-added droppable-inst ui-droppable'
                data-tile-id='InsTile5'>
                <div className='box-item-inner'>
                  {/*box header*/}
                  <div className='box-header d-flex align-items-center'>
                    <div className='heading'>
                      {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                      <span className='fs-4 fw-bold ins-title' />
                      <small className='fw-normal ins-subtitle' />
                    </div>
                    {/*<div class="box-dd ms-auto">
                          <select class="selectpicker select-rate-type">
                            <option selected value="Spot">Spot</option>
                            <option value="Forward">Forward</option>
                            <option value="Discounting">Discounting</option>
                          </select>
                        </div>*/}
                  </div>
                  {/*box content*/}
                  <div className='box-content tab-content'>
                    {/*USD spot item*/}
                    <div className='inst-content'>
                      <div className='d-flex align-items-center'>
                        <div
                          className='col px-1 py-2 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Sell'>
                          <div
                            className='text-center rate-area showcase-sell p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Sell</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate' />
                              <span className='fs-5 fw-bold rate-decimal' />
                            </div>
                          </div>
                        </div>
                        <div
                          className='col px-1 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Buy'>
                          <div
                            className='text-center rate-area showcase-buy p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Buy</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate' />
                              <span className='fs-5 fw-bold rate-decimal' />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*no intsturment content wrapper start*/}
                <div className='no-inst-content'>
                  <div className='no-inst-content-inner text-center'>
                    <div className='dragg-icn'>
                      <img src='img/no-inst-icn.png' width={50} />
                    </div>
                    Drop Insturment
                  </div>
                </div>
                {/*no intsturment content wrapper end ...////...*/}
              </div>
            </div>
            {/*column  end*/}
            {/*column  start*/}
            <div className='col-md-4 col-sm-6 px-1'>
              <div
                className='box-item bg-Yorange-light2 mt-0 droppable-inst ui-droppable'
                data-tile-id='InsTile6'>
                <div className='box-item-inner'>
                  {/*box header*/}
                  <div className='box-header d-flex align-items-center'>
                    <div className='heading'>
                      {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                      <span className='fs-4 fw-bold ins-title'>EUR</span>
                      <small className='fw-normal ins-subtitle'>PKR</small>
                    </div>
                    {/*<div class="box-dd ms-auto">
                          <select class="selectpicker select-rate-type">
                            <option selected value="Spot">Spot</option>
                            <option value="Forward">Forward</option>
                            <option value="Discounting">Discounting</option>
                          </select>
                        </div>*/}
                  </div>
                  {/*box content*/}
                  <div className='box-content tab-content'>
                    {/*USD spot item*/}
                    <div className='inst-content'>
                      <div className='d-flex align-items-center'>
                        <div
                          className='col px-1 py-2 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Sell'>
                          <div
                            className='text-center rate-area showcase-sell p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Sell</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate'>308.</span>
                              <span className='fs-5 fw-bold rate-decimal'>
                                85
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className='col px-1 col-rate-showcase input-col-forexdata'
                          data-target='#BuysMDForex'
                          deal-type='Deal'
                          col-type='Buy'>
                          <div
                            className='text-center rate-area showcase-buy p-2'
                            aria-hidden='true'>
                            <div className='rate-heading fs-6'>I Buy</div>
                            <div className='rate-showcase'>
                              <span className='fs-6 rate'>308.</span>
                              <span className='fs-5 fw-bold rate-decimal'>
                                60
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*no intsturment content wrapper start*/}
                <div className='no-inst-content' style={{ display: "none" }}>
                  <div className='no-inst-content-inner text-center'>
                    <div className='dragg-icn'>
                      <img src='img/no-inst-icn.png' width={50} />
                    </div>
                    Drop Insturment
                  </div>
                </div>
                {/*no intsturment content wrapper end ...////...*/}
              </div>
            </div>
            {/*column  end*/}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FXTrading;
