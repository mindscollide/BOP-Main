import React from "react";

const MarketTIming = () => {
  return (
    <div className='setting-body-content px-3 py-3 h-screen-65'>
      <div className='fs-6 fw-bold mb-1 color-primary'>Mon - Thur</div>
      <div className='d-flex flex-wrap align-items-end'>
        <div className='w-fix-180 me-2'>
          <div className='form-group mb-0'>
            <label>Start Time</label>
            <input
              type='number'
              className='form-control start-time'
              name='start-time'
            />
          </div>
        </div>
        <div className='w-fix-180 me-2'>
          <div className='form-group mb-0'>
            <label>End Time</label>
            <input
              type='number'
              className='form-control start-time'
              name='start-time'
            />
          </div>
        </div>
        {/*<div class="timer-action">
                  <button class="btn btn-outline-primary timer-action-btn">Save</button>
                </div>*/}
      </div>
      <div className='fs-6 fw-bold mb-1 mt-3 color-primary'>Friday</div>
      <div className='d-flex flex-wrap align-items-end'>
        <div className='w-fix-180 me-2'>
          <div className='form-group mb-0'>
            <label>Start Time</label>
            <input
              type='number'
              className='form-control start-time'
              name='start-time'
            />
          </div>
        </div>
        <div className='w-fix-180 me-2'>
          <div className='form-group mb-0'>
            <label>End Time</label>
            <input
              type='number'
              className='form-control start-time'
              name='start-time'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTIming;
