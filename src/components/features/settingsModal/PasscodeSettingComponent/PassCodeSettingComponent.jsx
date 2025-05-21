import React from "react";
import "../settingModal.css";
const PassCodeSettingComponent = () => {
  return (
    <div className='setting-body-content px-2 py-3 h-screen-65'>
      <div className='d-flex border-bottom pb-3 pt-2 mb-2 fs-normal'>
        <div>Two Factor Authentication</div>
        <label className='form-check form-switch ms-auto'>
          <input
            className='form-check-input'
            type='checkbox'
            id='flexSwitchCheckDefault'
          />
        </label>
      </div>
      <div className='pb-3 pt-2 mb-2 fs-normal collapsible'>
        <label className='fs-6 fw-bold mb-1 color-primary'>
          Change Password
        </label>
        <div
          className='collapsible-conent collapse show mt-2'
          id='ChangepasswordUserSetitng'>
          <div className='form-group d-flex'>
            <label className='col-form-label col-4'>Enter New Password*</label>
            <div className='col-8'>
              <input
                type='password'
                name='new-password'
                className='form-control form-control-sm Position-input'
              />
            </div>
          </div>
          <div className='form-group d-flex'>
            <label className='col-form-label col-4'>
              Confirm New Password*
            </label>
            <div className='col-8'>
              <input
                type='password'
                name='re-password'
                className='form-control form-control-sm Position-input'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassCodeSettingComponent;
