import React from "react";

const TXNSUmmary = () => {
  return (
    <div className='row m-0'>
      {/*col Begin*/}
      <div className='col-12 ps-1 pe-1 mb-2 col-blotter-table'>
        <div className='card-box p-2'>
          {/*box header*/}
          <div className='box-header'>
            <div className='d-flex align-items-center'>
              <div className='fs-6 fw-bold color-hd mb-2'>
                <div className='fs-6 fw-bold color-hd data-summary-heading'>
                  TXN Summary
                </div>
              </div>
              <div className='filter-export-wrapper ms-auto'>
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
                <div className='d-inline-block dropdown'>
                  <button
                    className='btn btn-primary ps-4 pe-4'
                    data-bs-toggle='dropdown'
                    value='export'>
                    Export
                  </button>
                  <div className='dropdown-menu dropdown-ex-doc border'>
                    <div className='d-flex align-items-center'>
                      <span className='export-to-doc cursor-pointer col'>
                        <img src='img/icons/pdf.png' alt='pdf' />
                      </span>
                      <span className='export-to-doc cursor-pointer col'>
                        <img src='img/icons/excel.png' alt='excel' />
                      </span>
                      <span className='col'>
                        <i className='icon-email2 fs-4 cursor-pointer' />
                      </span>
                      <span className='col'>
                        <i className='icon-screen fs-4 cursor-pointer' />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*box content*/}
          <div className='box-content-wrapper'>
            <div className='tab-content'>
              <div
                className='tab-pane data-summary fade show active TXNSummary-wrapper'
                id='TXNSummary'>
                <table className='table text-center align-middle table-ForexTXNSummaryClient col-p-2 blotter-table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            TXN ID
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            Customer Name
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            Type
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            Nature
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            CCY1
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            Amount
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            Rate
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            CCY2
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            Amount
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            Time
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            LC No.
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            data-bs-auto-close='outside'>
                            Acc No.
                          </div>
                          <ul className='dropdown-menu dropdown-menu-filter'></ul>
                        </div>
                      </th>
                      <th scope='col'>Checker</th>
                      <th scope='col'>Comment</th>
                      <th scope='col'>
                        <div className='dropdown dropdown-filter'>
                          <div
                            className='dropdown-toggle with-arrow'
                            data-bs-toggle='dropdown'
                            aria-bs-expanded='false'
                            aria-expanded='false'
                            data-bs-auto-close='outside'>
                            Status
                          </div>
                          <ul
                            className='dropdown-menu dropdown-menu-filter'
                            style={{}}></ul>
                        </div>
                      </th>
                      <th scope='col'>Chat</th>
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
  );
};

export default TXNSUmmary;
