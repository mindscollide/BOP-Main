const Forwarding = () => {
  return (
    <div className='bank-fwd'>
      <div className='flex-fill mt-3 fs-4 fw-bold color-black mb-1'>
        Bank Forwards
      </div>
      <div className='table-responsive'>
        <table
          className='table table-striped table-bordered text-center bg-none'
          id='calculatedFWDTreasury'>
          <thead className='bg-none'>
            <tr
              className='t-heading font-bold border-0'
              id='calculatedFWDHR1treasury'>
              <th className='no-bg border-0' />
              <th className='no-bg border-0' />
              <th className='bg-primary color-white' colSpan={2}>
                USD
              </th>
              <th className='bg-primary color-white' colSpan={2}>
                EUR
              </th>
              <th className='bg-primary color-white' colSpan={2}>
                GBP
              </th>
              <th className='bg-primary color-white' colSpan={2}>
                JPY
              </th>
            </tr>
            <tr className='t-sub_heading' id='calculatedFWDHR2treasury'>
              <th className='border-left-thick text-left bg-black color-white'>
                Tenor
              </th>
              <th className='border-right-thick text-middle bg-black color-white'>
                Days
              </th>
              <th className='border-left-thick bg-black color-white'>Bid</th>
              <th className='border-right-thick bg-black color-white'>Ask</th>
              <th className='border-left-thick bg-black color-white'>Bid</th>
              <th className='border-right-thick bg-black color-white'>Ask</th>
              <th className='border-left-thick bg-black color-white'>Bid</th>
              <th className='border-right-thick bg-black color-white'>Ask</th>
              <th className='border-left-thick bg-black color-white'>Bid</th>
              <th className='border-right-thick bg-black color-white'>Ask</th>
            </tr>
          </thead>
          <tbody className='bg-white'>
            <tr>
              <td className='row-heading text-left border-left-thick color-black'>
                Bank Spot
              </td>
              <td className='border-right-thick'>-</td>
              <th
                className='border-left-thick font-weight-bold color-green'
                id='FWD-L-1-CT-B'>
                287.12
              </th>
              <th
                className='border-right-thick font-weight-bold color-red'
                id='FWD-L-1-CT-A'>
                287.29
              </th>
              <th
                className='border-left-thick font-weight-bold color-green'
                id='FWD-L-2-CT-B'>
                313.71
              </th>
              <th
                className='border-right-thick font-weight-bold color-red'
                id='FWD-L-2-CT-A'>
                313.98
              </th>
              <th
                className='border-left-thick font-weight-bold color-green'
                id='FWD-L-3-CT-B'>
                367.74
              </th>
              <th
                className='border-right-thick font-weight-bold color-red'
                id='FWD-L-3-CT-A'>
                367.99
              </th>
              <th
                className='border-left-thick font-weight-bold color-green'
                id='FWD-L-4-CT-B'>
                2.0244
              </th>
              <th
                className='border-right-thick font-weight-bold color-red'
                id='FWD-L-4-CT-A'>
                2.0257
              </th>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                1 WEEK
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>1 WEEK (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                1 MONTH
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>1 MONTH (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                2 MONTH
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>2 MONTH (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                3 MONTH
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>3 MONTH (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                4 MONTH
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>4 MONTH (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                5 MONTH
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>5 MONTH (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                6 MONTH
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>6 MONTH (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                9 MONTH
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>9 MONTH (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='row-heading text-left border-left-thick'>
                1 YEAR
              </td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
            <tr>
              <td className='text-left border-left-thick'>1 YEAR (P)</td>
              <td id='FWD-Days-7' className='border-right-thick'>
                7
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-1-CT-B'>
                287.12
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-1-CT-A'>
                287.29
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-2-CT-B'>
                313.81
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-2-CT-A'>
                314.09
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-3-CT-B'>
                367.76
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-3-CT-A'>
                368.01
              </td>
              <td
                className='border-left-thick font-weight-bold'
                id='FWD-7-4-CT-B'>
                2.0264
              </td>
              <td
                className='border-right-thick font-weight-bold'
                id='FWD-7-4-CT-A'>
                2.0278
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Forwarding;
