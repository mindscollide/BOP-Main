import React from "react";

const Watchlist = () => {
  return (
    <div className='max-w-fix-360 p-0 mb-2'>
      <div className='card-box p-2 h-auto bg-Yorange-gray'>
        {/*box header*/}
        <div className='box-header'>
          <div className='d-flex align-items-center'>
            <div className='text-start fw-bold fs-6'>Watchlist</div>
            <div className='ms-auto'>
              <div className='date-quotes control-data-header'>
                21-11-2022 9:18 PM
              </div>
            </div>
          </div>
        </div>
        {/*box content*/}
        <div className='box-content-wrapper h-340 m-0 p-0'>
          <div className='forex-data' id=''>
            <div className=''>
              <table className='table text-center align-middle ForexTab-table forex-watchlist-table table-borderless'>
                <thead className=''>
                  <tr>
                    <th className='text-start'>Instrument</th>
                    <th>Bid</th>
                    <th>Offer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='USD'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      USDPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        col-type='Buy'>
                        288.00
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        col-type='Sell'>
                        289.00
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='EUR'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      EURPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        308.60
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
                        308.85
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='EUR'
                    data-cross-rate='USD'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      EUR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        308.60
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
                        308.85
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='GBP'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      GBPPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        355.18
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
                        355.44
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='CNY'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      CNYPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        40.76
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
                        40.80
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='JPY'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      JPYPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        2.0727
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
                        2.0742
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='AUD'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      AUDPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        188.45
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
                        188.60
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='CHF'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      CHFPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        181.24
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
                        180.09
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='CAD'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      CADPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        130.80
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
                        129.96
                      </span>
                    </td>
                  </tr>
                  <tr
                    className='drag-inst ui-draggable ui-draggable-handle'
                    data-rate-title='CNH'
                    data-cross-rate='PKR'>
                    <td className='text-start color-hd title-col text-nowrap'>
                      CNHPKR
                    </td>
                    <td className='text-nowrap col-buy'>
                      <span
                        className='val-highlight1 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Buy'>
                        25.4777
                      </span>
                    </td>
                    <td className='text-nowrap col-sell'>
                      <span
                        className='val-highlight2 col-forexdata'
                        data-target='#BuysMDForex'
                        col-type='Sell'>
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
  );
};

export default Watchlist;
