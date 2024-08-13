import React from "react";

const CorporateDiscountTable = () => {
  return (
    <div
      className='tab-pane discounting-branch-wrapper fade mt-3 active show'
      id='Discounting'
      role='tabpanel'>
      <div className='table-responsive'>
        <table
          className='table table-striped table-bordered text-center bg-none'
          id='calculatedDISCBranch'>
          <thead className='bg-none border-transparent'>
            <tr
              className='t-heading fw-bold tr-no-border'
              id='calculatedDiscountingHR1branch'>
              <th className='no-bg no-border' />
              <th className='color-white bg-blue'>USD</th>
              <th className='color-white bg-blue'>EUR</th>
              <th className='color-white bg-blue'>GBP</th>
              <th className='color-white bg-blue'>CNY</th>
            </tr>
            <tr
              className='t-sub_heading bg-primary'
              id='calculatedDiscountingHR2branch'>
              <th className='text-left border-left-thick border-right-thick color-white'>
                Tenor
              </th>
              <th className='border-left-thick border-right-thick color-white'>
                Value
              </th>
              <th className='border-left-thick border-right-thick color-white'>
                Value
              </th>
              <th className='border-left-thick border-right-thick color-white'>
                Value
              </th>
              <th className='border-left-thick border-right-thick color-white'>
                Value
              </th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            <tr>
              <td className='row-heading border-left-thick border-right-thick text-left'>
                1 MONTH
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-1-1-CB-R'>
                287.12
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-2-1-CB-R'>
                313.61
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-3-1-CB-R'>
                367.97
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-7-1-CB-R'>
                40.2755
              </td>
            </tr>
            <tr>
              <td className='row-heading border-left-thick border-right-thick text-left'>
                2 MONTH
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-1-1-CB-R'>
                287.12
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-2-1-CB-R'>
                313.61
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-3-1-CB-R'>
                367.97
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-7-1-CB-R'>
                40.2755
              </td>
            </tr>
            <tr>
              <td className='row-heading border-left-thick border-right-thick text-left'>
                3 MONTH
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-1-1-CB-R'>
                287.12
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-2-1-CB-R'>
                313.61
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-3-1-CB-R'>
                367.97
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-7-1-CB-R'>
                40.2755
              </td>
            </tr>
            <tr>
              <td className='row-heading border-left-thick border-right-thick text-left'>
                4 MONTH
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-1-1-CB-R'>
                287.12
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-2-1-CB-R'>
                313.61
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-3-1-CB-R'>
                367.97
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-7-1-CB-R'>
                40.2755
              </td>
            </tr>
            <tr>
              <td className='row-heading border-left-thick border-right-thick text-left'>
                5 MONTH
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-1-1-CB-R'>
                287.12
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-2-1-CB-R'>
                313.61
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-3-1-CB-R'>
                367.97
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-7-1-CB-R'>
                40.2755
              </td>
            </tr>
            <tr>
              <td className='row-heading border-left-thick border-right-thick text-left'>
                6 MONTH
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-1-1-CB-R'>
                287.12
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-2-1-CB-R'>
                313.61
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-3-1-CB-R'>
                367.97
              </td>
              <td
                className='border-left-thick border-right-thick'
                id='DISC-32-7-1-CB-R'>
                40.2755
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CorporateDiscountTable;
