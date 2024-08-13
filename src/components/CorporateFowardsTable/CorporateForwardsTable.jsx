import React from 'react'

const CorporateForwardsTable = () => {
  return (
    <div className="tab-content">
    <div className="tab-pane tab-spot-content" id="Spot" role="tabpanel">
      {/*row Begin*/}
      <div className="row m-0">
        {/*col Begin*/}
        <div className="col p-0 pe-2 mb-2">
          <div className="card-box bg-Yorange-light h-auto">
            <div className="box-header px-3 py-2">
              <div className="text-start fw-bold fs-6">FX Trading</div>
            </div>
            {/*box content*/}
            <div className="box-content-wrapper mt-0 h-350 overflow-inherit p-2">
              {/*Rate boxes row*/}
              <div className="row m-0">
                {/*column  start*/}
                <div className="col-md-4 col-sm-6 px-1">
                  <div
                    className="box-item mt-0 bg-Yorange-light2 no-inst-added droppable-inst ui-droppable"
                    data-tile-id="InsTile1"
                  >
                    <div className="box-item-inner">
                      {/*box header*/}
                      <div className="box-header d-flex align-items-center">
                        <div className="heading">
                          {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                          <span className="fs-4 fw-bold ins-title" />
                          <small className="fw-normal ins-subtitle" />
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
                      <div className="box-content tab-content">
                        {/*USD spot item*/}
                        <div className="inst-content">
                          <div className="d-flex align-items-center">
                            <div
                              className="col px-1 py-2 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Sell"
                            >
                              <div
                                className="text-center rate-area showcase-sell p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Sell</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate" />
                                  <span className="fs-5 fw-bold rate-decimal" />
                                </div>
                              </div>
                            </div>
                            <div
                              className="col px-1 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Buy"
                            >
                              <div
                                className="text-center rate-area showcase-buy p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Buy</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate" />
                                  <span className="fs-5 fw-bold rate-decimal" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*no intsturment content wrapper start*/}
                    <div className="no-inst-content">
                      <div className="no-inst-content-inner text-center">
                        <div className="dragg-icn">
                          <img src="img/no-inst-icn.png" width={50} />
                        </div>
                        Drop Insturment
                      </div>
                    </div>
                    {/*no intsturment content wrapper end ...////...*/}
                  </div>
                </div>
                {/*column  end*/}
                {/*column  start*/}
                <div className="col-md-4 col-sm-6 px-1">
                  <div
                    className="box-item bg-Yorange-light2 mt-0 no-inst-added droppable-inst ui-droppable"
                    data-tile-id="InsTile2"
                  >
                    <div className="box-item-inner">
                      {/*box header*/}
                      <div className="box-header d-flex align-items-center">
                        <div className="heading">
                          {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                          <span className="fs-4 fw-bold ins-title" />
                          <small className="fw-normal ins-subtitle" />
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
                      <div className="box-content tab-content">
                        {/*USD spot item*/}
                        <div className="inst-content">
                          <div className="d-flex align-items-center">
                            <div
                              className="col px-1 py-2 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Sell"
                            >
                              <div
                                className="text-center rate-area showcase-sell p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Sell</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate" />
                                  <span className="fs-5 fw-bold rate-decimal" />
                                </div>
                              </div>
                            </div>
                            <div
                              className="col px-1 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Buy"
                            >
                              <div
                                className="text-center rate-area showcase-buy p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Buy</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate" />
                                  <span className="fs-5 fw-bold rate-decimal" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*no intsturment content wrapper start*/}
                    <div className="no-inst-content">
                      <div className="no-inst-content-inner text-center">
                        <div className="dragg-icn">
                          <img src="img/no-inst-icn.png" width={50} />
                        </div>
                        Drop Insturment
                      </div>
                    </div>
                    {/*no intsturment content wrapper end ...////...*/}
                  </div>
                </div>
                {/*column  end*/}
                {/*column  start*/}
                <div className="col-md-4 col-sm-6 px-1">
                  <div
                    className="box-item bg-Yorange-light2 mt-0 droppable-inst ui-droppable"
                    data-tile-id="InsTile3"
                  >
                    <div className="box-item-inner">
                      {/*box header*/}
                      <div className="box-header d-flex align-items-center">
                        <div className="heading">
                          {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                          <span className="fs-4 fw-bold ins-title">USD</span>
                          <small className="fw-normal ins-subtitle">PKR</small>
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
                      <div className="box-content tab-content">
                        {/*USD spot item*/}
                        <div className="inst-content">
                          <div className="d-flex align-items-center">
                            <div
                              className="col px-1 py-2 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Sell"
                            >
                              <div
                                className="text-center rate-area showcase-sell p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Sell</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate">289.</span>
                                  <span className="fs-5 fw-bold rate-decimal">
                                    00
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col px-1 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Buy"
                            >
                              <div
                                className="text-center rate-area showcase-buy p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Buy</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate">288.</span>
                                  <span className="fs-5 fw-bold rate-decimal">
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
                    <div className="no-inst-content" style={{ display: "none" }}>
                      <div className="no-inst-content-inner text-center">
                        <div className="dragg-icn">
                          <img src="img/no-inst-icn.png" width={50} />
                        </div>
                        Drop Insturment
                      </div>
                    </div>
                    {/*no intsturment content wrapper end ...////...*/}
                  </div>
                </div>
                {/*column  end*/}
                {/*column  start*/}
                <div className="col-md-4 col-sm-6 px-1">
                  <div
                    className="box-item bg-Yorange-light2 mt-0 no-inst-added droppable-inst ui-droppable"
                    data-tile-id="InsTile4"
                  >
                    <div className="box-item-inner">
                      {/*box header*/}
                      <div className="box-header d-flex align-items-center">
                        <div className="heading">
                          {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                          <span className="fs-4 fw-bold ins-title" />
                          <small className="fw-normal ins-subtitle" />
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
                      <div className="box-content tab-content">
                        {/*USD spot item*/}
                        <div className="inst-content">
                          <div className="d-flex align-items-center">
                            <div
                              className="col px-1 py-2 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Sell"
                            >
                              <div
                                className="text-center rate-area showcase-sell p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Sell</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate" />
                                  <span className="fs-5 fw-bold rate-decimal" />
                                </div>
                              </div>
                            </div>
                            <div
                              className="col px-1 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Buy"
                            >
                              <div
                                className="text-center rate-area showcase-buy p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Buy</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate" />
                                  <span className="fs-5 fw-bold rate-decimal" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*no intsturment content wrapper start*/}
                    <div className="no-inst-content">
                      <div className="no-inst-content-inner text-center">
                        <div className="dragg-icn">
                          <img src="img/no-inst-icn.png" width={50} />
                        </div>
                        Drop Insturment
                      </div>
                    </div>
                    {/*no intsturment content wrapper end ...////...*/}
                  </div>
                </div>
                {/*column  end*/}
                {/*column  start*/}
                <div className="col-md-4 col-sm-6 px-1">
                  <div
                    className="box-item bg-Yorange-light2 mt-0 no-inst-added droppable-inst ui-droppable"
                    data-tile-id="InsTile5"
                  >
                    <div className="box-item-inner">
                      {/*box header*/}
                      <div className="box-header d-flex align-items-center">
                        <div className="heading">
                          {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                          <span className="fs-4 fw-bold ins-title" />
                          <small className="fw-normal ins-subtitle" />
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
                      <div className="box-content tab-content">
                        {/*USD spot item*/}
                        <div className="inst-content">
                          <div className="d-flex align-items-center">
                            <div
                              className="col px-1 py-2 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Sell"
                            >
                              <div
                                className="text-center rate-area showcase-sell p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Sell</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate" />
                                  <span className="fs-5 fw-bold rate-decimal" />
                                </div>
                              </div>
                            </div>
                            <div
                              className="col px-1 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Buy"
                            >
                              <div
                                className="text-center rate-area showcase-buy p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Buy</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate" />
                                  <span className="fs-5 fw-bold rate-decimal" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/*no intsturment content wrapper start*/}
                    <div className="no-inst-content">
                      <div className="no-inst-content-inner text-center">
                        <div className="dragg-icn">
                          <img src="img/no-inst-icn.png" width={50} />
                        </div>
                        Drop Insturment
                      </div>
                    </div>
                    {/*no intsturment content wrapper end ...////...*/}
                  </div>
                </div>
                {/*column  end*/}
                {/*column  start*/}
                <div className="col-md-4 col-sm-6 px-1">
                  <div
                    className="box-item bg-Yorange-light2 mt-0 droppable-inst ui-droppable"
                    data-tile-id="InsTile6"
                  >
                    <div className="box-item-inner">
                      {/*box header*/}
                      <div className="box-header d-flex align-items-center">
                        <div className="heading">
                          {/*<div class="fs-sm text-uppercase">FX Cross</div>*/}
                          <span className="fs-4 fw-bold ins-title">EUR</span>
                          <small className="fw-normal ins-subtitle">PKR</small>
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
                      <div className="box-content tab-content">
                        {/*USD spot item*/}
                        <div className="inst-content">
                          <div className="d-flex align-items-center">
                            <div
                              className="col px-1 py-2 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Sell"
                            >
                              <div
                                className="text-center rate-area showcase-sell p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Sell</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate">308.</span>
                                  <span className="fs-5 fw-bold rate-decimal">
                                    85
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div
                              className="col px-1 col-rate-showcase input-col-forexdata"
                              data-target="#BuysMDForex"
                              deal-type="Deal"
                              col-type="Buy"
                            >
                              <div
                                className="text-center rate-area showcase-buy p-2"
                                aria-hidden="true"
                              >
                                <div className="rate-heading fs-6">I Buy</div>
                                <div className="rate-showcase">
                                  <span className="fs-6 rate">308.</span>
                                  <span className="fs-5 fw-bold rate-decimal">
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
                    <div className="no-inst-content" style={{ display: "none" }}>
                      <div className="no-inst-content-inner text-center">
                        <div className="dragg-icn">
                          <img src="img/no-inst-icn.png" width={50} />
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
        {/*col End*/}
        {/*col Begin*/}
        <div className="max-w-fix-360 p-0 mb-2">
          <div className="card-box p-2 h-auto bg-Yorange-gray">
            {/*box header*/}
            <div className="box-header">
              <div className="d-flex align-items-center">
                <div className="text-start fw-bold fs-6">Watchlist</div>
                <div className="ms-auto">
                  <div className="date-quotes control-data-header">
                    21-11-2022 9:18 PM
                  </div>
                </div>
              </div>
            </div>
            {/*box content*/}
            <div className="box-content-wrapper h-340 m-0 p-0">
              <div className="forex-data" id="">
                <div className="">
                  <table className="table text-center align-middle ForexTab-table forex-watchlist-table table-borderless">
                    <thead className="">
                      <tr>
                        <th className="text-start">Instrument</th>
                        <th>Bid</th>
                        <th>Offer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="USD"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          USDPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            col-type="Buy"
                          >
                            288.00
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            col-type="Sell"
                          >
                            289.00
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="EUR"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          EURPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            308.60
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            308.85
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="EUR"
                        data-cross-rate="USD"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          EUR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            308.60
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            308.85
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="GBP"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          GBPPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            355.18
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            355.44
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="CNY"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          CNYPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            40.76
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            40.80
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="JPY"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          JPYPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            2.0727
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            2.0742
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="AUD"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          AUDPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            188.45
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            188.60
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="CHF"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          CHFPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            181.24
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            180.09
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="CAD"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          CADPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            130.80
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            129.96
                          </span>
                        </td>
                      </tr>
                      <tr
                        className="drag-inst ui-draggable ui-draggable-handle"
                        data-rate-title="CNH"
                        data-cross-rate="PKR"
                      >
                        <td className="text-start color-hd title-col text-nowrap">
                          CNHPKR
                        </td>
                        <td className="text-nowrap col-buy">
                          <span
                            className="val-highlight1 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Buy"
                          >
                            25.4777
                          </span>
                        </td>
                        <td className="text-nowrap col-sell">
                          <span
                            className="val-highlight2 col-forexdata"
                            data-target="#BuysMDForex"
                            col-type="Sell"
                          >
                            25.2924
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*col End*/}
      </div>
      {/*row Begin*/}
      {/*row blotter Begin*/}
      <div className="row m-0">
        {/*col Begin*/}
        <div className="col-12 ps-1 pe-1 mb-2 col-blotter-table">
          <div className="card-box p-2">
            {/*box header*/}
            <div className="box-header">
              <div className="d-flex align-items-center">
                <div className="fs-6 fw-bold color-hd mb-2">
                  <div className="fs-6 fw-bold color-hd data-summary-heading">
                    TXN Summary
                  </div>
                </div>
                <div className="filter-export-wrapper ms-auto">
                  {/*<div class="d-inline-block">
                      <button class="btn btn-primary ps-4 pe-4"><i class="icon-search fs-6"></i></button>
                  </div>*/}
                  {/*<div class="d-inline-block dropdown">
                    <button class="btn btn-secondary ps-4 pe-4" data-bs-toggle="dropdown" value="filter">Filter</button>
                    <div class="dropdown-menu dropdown-blotter-filter border p-2">
                      <div class="d-flex w-fix-220">
                        <div class="col px-1">
                          <label class="color-hd fw-bold">From</label>
                          <input type="text" name="dateto" class="date date-to form-control form-control-sm">
                        </div>
                        <div class="col px-1">
                            <label class="color-hd fw-bold">To</label>
                          <input type="text" name="datefrom" class="date date-to form-control form-control-sm">
                        </div>
                      </div>
                    </div>
                  </div>*/}
                  <div className="d-inline-block dropdown">
                    <button
                      className="btn btn-primary ps-4 pe-4"
                      data-bs-toggle="dropdown"
                      value="export"
                    >
                      Export
                    </button>
                    <div className="dropdown-menu dropdown-ex-doc border">
                      <div className="d-flex align-items-center">
                        <span className="export-to-doc cursor-pointer col">
                          <img src="img/icons/pdf.png" alt="pdf" />
                        </span>
                        <span className="export-to-doc cursor-pointer col">
                          <img src="img/icons/excel.png" alt="excel" />
                        </span>
                        <span className="col">
                          <i className="icon-email2 fs-4 cursor-pointer" />
                        </span>
                        <span className="col">
                          <i className="icon-screen fs-4 cursor-pointer" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*box content*/}
            <div className="box-content-wrapper">
              <div className="tab-content">
                <div
                  className="tab-pane data-summary fade show active TXNSummary-wrapper"
                  id="TXNSummary"
                >
                  <table className="table text-center align-middle table-ForexTXNSummaryClient col-p-2 blotter-table">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              TXN ID
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Customer Name
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Type
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Nature
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              CCY1
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Amount
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Rate
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              CCY2
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Amount
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Time
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              LC No.
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Acc No.
                            </div>
                            <ul className="dropdown-menu dropdown-menu-filter"></ul>
                          </div>
                        </th>
                        <th scope="col">Checker</th>
                        <th scope="col">Comment</th>
                        <th scope="col">
                          <div className="dropdown dropdown-filter">
                            <div
                              className="dropdown-toggle with-arrow"
                              data-bs-toggle="dropdown"
                              aria-bs-expanded="false"
                              aria-expanded="false"
                              data-bs-auto-close="outside"
                            >
                              Status
                            </div>
                            <ul
                              className="dropdown-menu dropdown-menu-filter"
                              style={{}}
                            ></ul>
                          </div>
                        </th>
                        <th scope="col">Chat</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/*<tr>
                          <td class="color-hd fw-bold title-col text-nowrap">07-12-22/01</td>
                          <td class="color-hd fw-bold title-col text-nowrap">ABC Corporation</td>
                          <td>
                              Buy
                          </td>
                          <td>Import Payment</td>
                          <td scope="col" class="color-hd fw-bold">
                              USD
                          </td>
                          <td>1,000</td>
                          <td>285.07</td>
                          <td>PKR</td>
                          <td>285,070</td>
                          <td>10:49 AM</td>
                          <td>AB123456</td>
                          <td>11-11-11111-111-111111</td>
                          <td>
                            <span class="d-block border rounded color-light text-start small p-2 w-fix-200 comment-box">
                                System Approved
                            </span>
                          </td>
                          <td>
                            <span class="color-light fw-bold">Pending</span>
                          </td>
                          <td class="text-nowrap">
                            <span class="btn-icn" onclick="updateOutstandingDeals($(this))" accepted="true"><i class="icon-check fs-5 color-green"></i></span>
                            <span class="btn-icn" onclick="updateOutstandingDeals($(this))" accepted="false"><i class="icon-close fs-5 fw-bold color-red"></i></span>
                            <span class="btn-icn" onclick="updateOutstandingDeals($(this))" accepted="deleted"><i class="icon-trash fs-5 color-red"></i></span>
                          </td>
                        </tr>*/}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*col End*/}
      </div>
      {/*row blotter End*/}
    </div>
    {/*FWD branch Tab*/}
    <div
      className="tab-pane fwd-branch-wrapper fade mt-3 active show"
      id="Forwards"
      role="tabpanel"
    >
      <div className="table-responsive">
        <table
          className="table table-striped table-bordered text-center bg-none"
          id="calculatedFWDBranch"
        >
          <thead className="bg-none border-transparent">
            <tr
              className="t-heading fw-bold color-white tr-no-border"
              id="calculatedFWDHR1Branch"
            >
              <th className="bg-none no-border border-0" />
              <th className="color-white bg-blue" colSpan={2}>
                USD
              </th>
              <th className="color-white bg-blue" colSpan={2}>
                EUR
              </th>
              <th className="color-white bg-blue" colSpan={2}>
                GBP
              </th>
            </tr>
            <tr className="t-sub_heading bg-primary" id="calculatedFWDHR2Branch">
              <th className="border-left-thick border-right-thick text-left color-white">
                Tenor
              </th>
              <th className="border-left-thick color-white">Bid</th>
              <th className="border-right-thick color-white">Ask</th>
              <th className="border-left-thick color-white">Bid</th>
              <th className="border-right-thick color-white">Ask</th>
              <th className="border-left-thick color-white">Bid</th>
              <th className="border-right-thick color-white">Ask</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                1 WEEK
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                1 MONTH
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                2 MONTH
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                3 MONTH
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                4 MONTH
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                5 MONTH
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                6 MONTH
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                9 MONTH
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
            <tr>
              <td className="border-left-thick border-right-thick row-heading text-left">
                1 YEAR
              </td>
              <td className="border-left-thick" id="FWD-7-1-1-CB-B">
                287.12
              </td>
              <td className="border-right-thick" id="FWD-7-1-1-CB-A">
                287.29
              </td>
              <td className="border-left-thick" id="FWD-7-2-1-CB-B">
                313.74
              </td>
              <td className="border-right-thick" id="FWD-7-2-1-CB-A">
                313.93
              </td>
              <td className="border-left-thick" id="FWD-7-3-1-CB-B">
                367.72
              </td>
              <td className="border-right-thick" id="FWD-7-3-1-CB-A">
                367.95
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {/*FWD branch Tab ..////// close*/}
    {/*Discounting branch Tab*/}
    <div
      className="tab-pane discounting-branch-wrapper fade mt-3"
      id="Discounting"
      role="tabpanel"
    >
      <div className="table-responsive">
        <table
          className="table table-striped table-bordered text-center bg-none"
          id="calculatedDISCBranch"
        >
          <thead className="bg-none border-transparent">
            <tr
              className="t-heading fw-bold tr-no-border"
              id="calculatedDiscountingHR1branch"
            >
              <th className="no-bg no-border" />
              <th className="color-white bg-blue">USD</th>
              <th className="color-white bg-blue">EUR</th>
              <th className="color-white bg-blue">GBP</th>
              <th className="color-white bg-blue">CNY</th>
            </tr>
            <tr
              className="t-sub_heading bg-primary"
              id="calculatedDiscountingHR2branch"
            >
              <th className="text-left border-left-thick border-right-thick color-white">
                Tenor
              </th>
              <th className="border-left-thick border-right-thick color-white">
                Value
              </th>
              <th className="border-left-thick border-right-thick color-white">
                Value
              </th>
              <th className="border-left-thick border-right-thick color-white">
                Value
              </th>
              <th className="border-left-thick border-right-thick color-white">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              <td className="row-heading border-left-thick border-right-thick text-left">
                1 MONTH
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-1-1-CB-R"
              >
                287.12
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-2-1-CB-R"
              >
                313.61
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-3-1-CB-R"
              >
                367.97
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-7-1-CB-R"
              >
                40.2755
              </td>
            </tr>
            <tr>
              <td className="row-heading border-left-thick border-right-thick text-left">
                2 MONTH
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-1-1-CB-R"
              >
                287.12
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-2-1-CB-R"
              >
                313.61
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-3-1-CB-R"
              >
                367.97
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-7-1-CB-R"
              >
                40.2755
              </td>
            </tr>
            <tr>
              <td className="row-heading border-left-thick border-right-thick text-left">
                3 MONTH
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-1-1-CB-R"
              >
                287.12
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-2-1-CB-R"
              >
                313.61
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-3-1-CB-R"
              >
                367.97
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-7-1-CB-R"
              >
                40.2755
              </td>
            </tr>
            <tr>
              <td className="row-heading border-left-thick border-right-thick text-left">
                4 MONTH
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-1-1-CB-R"
              >
                287.12
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-2-1-CB-R"
              >
                313.61
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-3-1-CB-R"
              >
                367.97
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-7-1-CB-R"
              >
                40.2755
              </td>
            </tr>
            <tr>
              <td className="row-heading border-left-thick border-right-thick text-left">
                5 MONTH
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-1-1-CB-R"
              >
                287.12
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-2-1-CB-R"
              >
                313.61
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-3-1-CB-R"
              >
                367.97
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-7-1-CB-R"
              >
                40.2755
              </td>
            </tr>
            <tr>
              <td className="row-heading border-left-thick border-right-thick text-left">
                6 MONTH
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-1-1-CB-R"
              >
                287.12
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-2-1-CB-R"
              >
                313.61
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-3-1-CB-R"
              >
                367.97
              </td>
              <td
                className="border-left-thick border-right-thick"
                id="DISC-32-7-1-CB-R"
              >
                40.2755
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    {/*Discounting branch Tab ...//// close*/}
  </div>
  
  )
}

export default CorporateForwardsTable