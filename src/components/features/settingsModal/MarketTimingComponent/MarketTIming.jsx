import React, { useEffect, useState } from "react";
import { use } from "react";
import { useSelector } from "react-redux";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { ConvertDateTimrStringIntoGTM } from "@/utils/formatters";
import { useDispatch } from "react-redux";
import { setMarketTimingsUpdated } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import { convertUTCToLocalDateWithToday } from "@/components/utils/timeFunction";

const MarketTiming = () => {
  const getMarketTimingData = useSelector(
    (state) => state.settingSlicer.getMarketTimingData
  );
  const dispatch = useDispatch();
  const getMarketTiming = useSelector(
    (state) => state.RealtimeActionsSlice.marketTimingsUpdated
  );

  const [monToThruStartTime, setMonToThruStartTime] = useState(null);
  const [monToThruEndTime, setMonToThruEndTime] = useState(null);
  const [fridayStartTime, setFridayStartTime] = useState(null);
  const [fridayEndTime, setFridayEndTime] = useState(null);
  console.log(
    { monToThruStartTime, monToThruEndTime, fridayStartTime, fridayEndTime },
    "market Timing"
  );
  useEffect(() => {
    if (getMarketTimingData) {
      try {
        const { monThuStart, monThuEnd, fridayStart, fridayEnd } =
          getMarketTimingData?.response;
        console.log({ getMarketTimingData }, "market Timing");

        setMonToThruStartTime(convertUTCToLocalDateWithToday(monThuStart));
        setMonToThruEndTime(convertUTCToLocalDateWithToday(monThuEnd));
        setFridayStartTime(convertUTCToLocalDateWithToday(fridayStart));
        setFridayEndTime(convertUTCToLocalDateWithToday(fridayEnd));

        dispatch(setMarketTimingsUpdated(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [getMarketTimingData]);

  useEffect(() => {
    if (getMarketTiming !== null) {
      try {
        const { marketTimings } = getMarketTiming;
        if (marketTimings !== null && marketTimings !== undefined) {
          const {
            monThuStartTime,
            monThuEndTime,
            fridayStartTime,
            fridayEndTime,
          } = marketTimings;
          setMonToThruStartTime(
            convertUTCToLocalDateWithToday(monThuStartTime)
          );
          setMonToThruEndTime(convertUTCToLocalDateWithToday(monThuEndTime));
          setFridayStartTime(convertUTCToLocalDateWithToday(fridayStartTime));
          setFridayEndTime(convertUTCToLocalDateWithToday(fridayEndTime));
        }
      } catch (error) {}

      console.log(getMarketTiming, "marketTimingsmarketTimings");
    }
  }, [getMarketTiming]);
  return (
    <div className='setting-body-content px-2 py-3 h-screen-65'>
      <div className='fs-6 fw-bold mb-1 color-primary'>Mon - Thur</div>
      <div className='d-flex flex-wrap align-items-end'>
        <div className='w-fix-180 me-2'>
          <div className='form-group mb-0'>
            <label>Start Time</label>
            <DatePicker
              onlyTimePicker
              disableDayPicker
              inputClass='markettimePicker'
              format='hh:mm A'
              disabled={true}
              plugins={[<TimePicker hideSeconds />]}
              value={monToThruStartTime}
            />
          </div>
        </div>
        <div className='w-fix-180 me-2'>
          <div className='form-group mb-0'>
            <label>End Time</label>
            <DatePicker
              onlyTimePicker
              disableDayPicker
              inputClass='markettimePicker'
              format='hh:mm A'
              disabled={true}
              plugins={[<TimePicker hideSeconds />]}
              value={monToThruEndTime}
            />
          </div>
        </div>
      </div>
      <div className='fs-6 fw-bold mb-1 mt-3 color-primary'>Friday</div>
      <div className='d-flex flex-wrap align-items-end'>
        <div className='w-fix-180 me-2'>
          <div className='form-group mb-0'>
            <label>Start Time</label>
            <DatePicker
              onlyTimePicker
              disableDayPicker
              inputClass='markettimePicker'
              format='hh:mm A'
              disabled={true}
              plugins={[<TimePicker hideSeconds />]}
              value={fridayStartTime}
            />
          </div>
        </div>
        <div className='w-fix-180 me-2'>
          <div className='form-group mb-0'>
            <label>End Time</label>
            <DatePicker
              onlyTimePicker
              disableDayPicker
              inputClass='markettimePicker'
              format='hh:mm A'
              disabled={true}
              plugins={[<TimePicker hideSeconds />]}
              value={fridayEndTime}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTiming;
