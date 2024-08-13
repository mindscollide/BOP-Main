const RFQModal = () => {
  return (
    <>
      {/*Modal RFQ*/}
      <div
        className="modal fade"
        id="RFQModal"
        data-bs-backdrop="static"
        role="dialog"
        aria-labelledby="RFQModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content form-data-input RFQ-modal bg-white">
            <div className="modal-header">
              <h5 className="modal-title text-uppercase text-center flex-fill">
                Request for Quote
              </h5>
              <span
                className="close cursor-pointer"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="icon-close" />
              </span>
            </div>
            <div className="modal-body pt-2 ps-0 h-screen-74 max-h-screen-74">
              <div className="row m-0">
                <div className="col-4 py-2 bg-light">
                  <div className="modal-side-panel buysell-readonly readonly-fields h-screen-70">
                    {/*TXN ID*/}
                    <div className="mb-2">
                      <div className="form-group">
                        <label className="input-readonly-label">TXN ID</label>
                        <div className="form-control-input">
                          <input
                            type="text"
                            name="TXNIDinput"
                            className="form-control form-control-sm date TXNID-input"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                    {/*Issue date*/}
                    <div className="col mb-2">
                      <div className="form-group">
                        <label className="input-readonly-label">
                          Issue date
                        </label>
                        <div className="form-control-input">
                          <input
                            type="text"
                            name="Issuedate"
                            className="date form-control form-control-sm Issuedate-input"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                    {/*Maturity date*/}
                    <div className="col mb-2">
                      <div className="form-group">
                        <label className="input-readonly-label">
                          Maturity date
                        </label>
                        <div className="form-control-input">
                          <input
                            type="text"
                            name="Maturitydate"
                            className="date form-control form-control-sm date Maturitydate-input"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                    {/*Tenor*/}
                    <div className="col mb-2">
                      <div className="form-group tenor-wrapper">
                        <label className="input-readonly-label">Tenor</label>
                        <div
                          className="col-8 select-bg-white tenor-item form-control-input"
                          id="tenor-Tbills"
                        >
                          <input
                            type="text"
                            name="Tenor"
                            className="form-control form-control-sm Tenor-select"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                    {/*Coupon Rate Days*/}
                    <div className="col mb-2">
                      <div className="form-group">
                        <label className="input-readonly-label">
                          Coupon Rate
                        </label>
                        <div className="form-control-input">
                          <input
                            type="text"
                            name="CouponRate"
                            className="form-control form-control-sm CouponRate-input"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                    {/*Trade date*/}
                    <div className="mb-2">
                      <div className="form-group">
                        <label className="input-readonly-label">
                          Trade date
                        </label>
                        <div className="form-control-input">
                          <input
                            type="text"
                            name="Tradedate"
                            className="date form-control form-control-sm date Tradedate-input"
                            defaultValue="21-11-2022"
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                    {/*No. of Days*/}
                    <div className="col mb-2">
                      <div className="form-group">
                        <label className="input-readonly-label">
                          No. of Days
                        </label>
                        <div className="form-control-input">
                          <input
                            type="number"
                            maxLength={3}
                            name="NoDays"
                            className="form-control form-control-sm NoDays-input"
                            defaultValue={0}
                            disabled=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-8 editable-fields">
                  <div className="row m-0">
                    {/*Position*/}
                    <div className="col-6 mb-4">
                      <div className="form-group">
                        <label className="col-form-label">Position*</label>
                        <div className="select-bg-white highlight-input form-control-input">
                          <select
                            className="Position-select highlight-input form-control-input"
                            name="Position-select"
                          >
                            <option value="Buy" selected="">
                              Buy
                            </option>
                            <option value="Sell">Sell</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/*Amount*/}
                    <div className="col-6 mb-4">
                      <div className="form-group">
                        <label className="col-form-label">Amount (PKR)*</label>
                        <div className="form-control-input">
                          <input
                            type="text"
                            pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$"
                            data-type="currency"
                            name="AmountPKR"
                            className="form-control form-control-sm AmountPKR-input highlight-input"
                            defaultValue="1,000,000"
                          />
                        </div>
                      </div>
                    </div>
                    {/*Security Type*/}
                    <div className="col-6 mb-4">
                      <div className="form-group">
                        <label className="col-form-label">Security Type*</label>
                        <div className="select-bg-white highlight-input form-control-input">
                          {/*<input type="text" name="Securitytype" class="form-control form-control-sm Securitytype-input" value="Tbill">*/}
                          <select
                            className="Securitytype-select highlight-input form-control-input"
                            name="Securitytype"
                          >
                            <option value="Tbills" selected="">
                              Tbills
                            </option>
                            <option value="PIBs">PIBs</option>
                            <option value="PIB Floater">PIB Floater</option>
                            <option value="SUKUK">SUKUK</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/*Inventory*/}
                    <div className="col-6 mb-4">
                      <div className="form-group">
                        <label className="col-form-label">Inventory*</label>
                        <div className="select-bg-white highlight-input form-control-input">
                          {/*<input type="text" name="Securitytype" class="form-control form-control-sm Securitytype-input" value="Tbill">*/}
                          <select
                            className="Inventory-select highlight-input form-control-input"
                            name="Inventory"
                          >
                            <option value="Tbills" selected="">
                              Tbills
                            </option>
                            <option value="PIBs">PIBs</option>
                            <option value="PIB Floater">PIB Floater</option>
                            <option value="Sukuk">Sukuk</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/*Inventory*/}
                    <div className="col-6 mb-4">
                      <div className="form-group">
                        <label className="col-form-label">Type*</label>
                        <div className="select-bg-white highlight-input form-control-input">
                          {/*<input type="text" name="Securitytype" class="form-control form-control-sm Securitytype-input" value="Tbill">*/}
                          <select
                            className="txtype-select highlight-input form-control-input"
                            name="txtype"
                          >
                            <option value="Outright" selected="">
                              Outright
                            </option>
                            <option value="Repo">Repo</option>
                            <option value="Rrepo">Rrepo</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/*Settlement date*/}
                    <div className="col-6 mb-4">
                      <div className="form-group">
                        <label className="col-form-label">
                          Settlement Date*
                        </label>
                        <div className="form-control-input">
                          <input
                            type="text"
                            name="SettlementDate"
                            className="highlight-input form-control form-control-sm date SettlementDate-input"
                            defaultValue="21-11-2022"
                          />
                        </div>
                      </div>
                    </div>
                    {/*Comment*/}
                    <div className="col-12 mb-4">
                      <div className="form-group">
                        <label className="col-form-label">Comment</label>
                        <div className="form-control-input">
                          <textarea
                            className="form-control form-control-sm comment"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-4 inputFormDataBuySale-footer modal-footer d-block text-center">
                      <button type="button" className="btn btn-primary px-4">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RFQModal;
