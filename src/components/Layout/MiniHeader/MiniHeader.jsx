import React, { useContext } from "react";
import Logo from "../../../assets/images/logo.png";
import { BOPContext } from "../../../Context";

const MiniHeader = ({}) => {
  const { roleValue } = useContext(BOPContext);
  return (
    <div className='header-inner d-flex align-items-center px-2 my-2'>
      <div className='site-logo'>
        <a href='#' tabIndex={0}>
          <img src={Logo} width={250} className='img-fluid' alt='BOP Logo' />
        </a>
      </div>
      <div className='ms-auto'>
        <div className='d-flex align-items-center'>
          <div
            className='dropdown deal-exp-notification-dd me-3'
            style={{ display: "none" }}>
            <span
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'>
              <i className='icon-clock fs-4 color-red' />
            </span>
            <div className='dropdown-menu dropdown-menu-end deal-exp-notification-dd-menu'>
              <table className='table table-borderless fs-sm'>
                <thead>
                  <tr>
                    <th className='text-start fs-sm color-black'>TXN ID</th>
                    <th className='text-center fs-sm color-black'>Time Left</th>
                    <th className='text-center fs-sm color-black' />
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
          {roleValue === 1 && (
            <div className='dropdown'>
              <a
                className='btn btn-primary btn-rfq-header me-2 fw-bold ps-4 pe-4 input-col-forexdata'
                data-target='#BuysMDForexRFQ'
                col-type='Sell'
                rfq-type='Forex'
                deal-type='RFQ'
                type='button'
                tabIndex={0}>
                <i className='icon-list fs-6' />
                <span className='d-inline-block align-middle ms-1'>RFQ</span>
              </a>
            </div>
          )}

          <div className='dropdown'>
            <a
              href='forexclc.html'
              className='btn btn-primary btn-clc-header me-2 fw-bold ps-4 pe-4'
              tabIndex={0}>
              <span className='d-inline-block align-middle ms-1'>
                Calculators
              </span>
            </a>
            {/*<ul class="dropdown-menu">
          <li><a class="dropdown-item" href="calculator.html">Fixed Income</a></li>
          <li><a class="dropdown-item" href="forexclc.html">Forex</a></li>
        </ul>*/}
          </div>
          {roleValue === 4 && (
            <div className='vol-meter-container me-2'>
              <div className='d-flex align-items-center vol-meter-inner-wrapper'>
                <div className='heading-vol-meter fs-6 fw-semibold ff-poppins'>
                  Vol Meter
                </div>
                <button
                  className='btn btn-default vol-meter ms-1 active-vol'
                  aria-pressed='true'
                  value={"01"}
                  onclick='VolMeterSelector(this)'
                  tabIndex={0}>
                  01
                </button>
                <button
                  className='btn btn-default vol-meter ms-1'
                  aria-pressed='false'
                  value={"02"}
                  onclick='VolMeterSelector(this)'
                  tabIndex={0}>
                  02
                </button>
                <button
                  className='btn btn-default vol-meter ms-1'
                  aria-pressed='false'
                  value={"03"}
                  onclick='VolMeterSelector(this)'
                  tabIndex={0}>
                  03
                </button>
                <button
                  className='btn btn-default vol-meter ms-1 vol-meter-off'
                  aria-pressed='false'
                  value='off'
                  onclick='VolMeterSelector(this)'
                  tabIndex={0}>
                  off
                </button>
              </div>
            </div>
          )}

          {/*User Dropdown*/}
          <div className='user-dd dropdown ps-2'>
            {/*<span class="user-thumb"><img class="rounded-circle img-fluid" src="img/profile3.png" alt="user"></span>*/}
            <span
              className='user-dd-trigger'
              data-bs-toggle='dropdown'
              tabIndex={0}>
              <span className='user-logdin-name fw-bold color-hd max-w-fix-100 text-truncate d-inline-block align-middle'>
                Michael Hawk
              </span>
              <i className='icon-arrow-down' />
            </span>
            <ul className='dropdown-menu'>
              <li
                className='dropdown-item d-flex align-items-center'
                data-bs-toggle='modal'
                data-bs-target='#UserSettingModal'>
                <i className='icon-settings me-1' />
                Setting
              </li>
              <li className='dropdown-item d-flex align-items-center'>
                <i className='icon-logout me-1' />
                Logout
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;
