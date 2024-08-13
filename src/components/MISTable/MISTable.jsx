const MISTable = () => {
  return (
    <div className="card-box h-auto">
      <div className="box-header bg-primary px-3">
        <div className="text-start color-white fw-bold fs-6">MIS</div>
      </div>
      <div className="box-content-wrapper px-2 h-screen-68">
        <div className="d-flex flex-wrap h-clc-100">
          <div className="flex-fill px-3">
            <table className="table align-middle mis-table">
              <thead className="">
                <tr>
                  <th />
                  <th>Company</th>
                  <th className="text-end">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="color-hd">
                    <span className="">Volumewise</span>
                  </td>
                  <td className="">Gulahmed</td>
                  <td className="text-end">
                    <span className="mis-volumwise-value">500,000</span>
                  </td>
                </tr>
                <tr>
                  <td className="color-hd">
                    <span className="">Profit-wise (PKR)</span>
                  </td>
                  <td className="">HBL</td>
                  <td className="text-end">
                    <span className="mis-profitwise-value">300,000</span>
                  </td>
                </tr>
                <tr>
                  <td className="color-hd border-0">
                    <span className="">Total Profit (PKR)</span>
                  </td>
                  <td className="text-end border-0" colSpan={2}>
                    <span className="mis-totalprofit-value">10,000,000</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mis-selectrange-form w-fix-210 bg-lighter p-2">
            <label className="mb-2 fs-6 color-blue">Select Range</label>
            <div className="form-group">
              <label className="mb-1">From</label>
              <input
                type="text"
                className="date form-control"
                placeholder="Select Date"
              />
            </div>
            <div className="form-group">
              <label className="mb-1">To</label>
              <input
                type="text"
                className="date form-control"
                placeholder="Select Date"
              />
            </div>
            <div className="filter-mis-btn mt-3">
              <button className="btn btn-secondary">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MISTable;
