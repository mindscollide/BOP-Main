import React, { useEffect, useState } from "react";
import CustomButton from "../../common/globalButton/button";
import InputFIeld from "../../common/inputField/InputField";
import InputFieldWithTag from "../../common/inputFieldWithTag/InputFieldWithTag";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CalculateFxDiscountingAPI } from "@/container/pages/mainCalculator/CalculatorActions";
import { formatDate } from "@/common/utils";

const CalculatorFxDiscounting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Drop down Instruments  Data
  const InstrumentsData = useSelector(
    (state) => state.authReducer.getAllInstruments
  );

  //World Crosses Data to Get the Cross Rates Without Spread
  const WorldCrossesData = useSelector(
    (state) => state.WatchListReducer.GetBankSpotForTreasury
  );

  //Resulting Calculated value of FX Discounting
  const CalculatedFxDiscounting = useSelector(
    (state) => state?.CalculatorReducer?.calculateFXDiscountingData?.fxRate || 0
  );

  //Local States
  const [selectedOption, setSelectedOption] = useState(null);
  const [discountingApplicableList, setDiscountingApplicableList] = useState(
    []
  );
  const [price, setPrice] = useState(285.2635);
  const [inputValue, setInputValue] = useState("0");
  const [liborValue, setLiborValue] = useState(0);
  const [tagText, setTagText] = useState(formatDate(new Date()));

  //Extracting out the Forward Applicable and nonForward Applicable Instruments
  useEffect(() => {
    try {
      if (
        InstrumentsData?.instruments &&
        Array.isArray(InstrumentsData.instruments) &&
        WorldCrossesData?.worldCrosses
      ) {
        const forwards = InstrumentsData.instruments.filter(
          (item) => item.forwardsApplicable === true
        );

        const discountings = InstrumentsData.instruments
          .filter((item) => item.discountingApplicable === true)
          .map((item) => ({
            value: item.instrumentID,
            label: item.instrumentName,
          }));

        setDiscountingApplicableList(discountings);

        // Select USD by default in discountingApplicableList
        const defaultUSD = discountings.find((item) => item.label === "USD");

        if (defaultUSD) {
          setSelectedOption(defaultUSD); // use your actual discounting selected state if different

          const matchedRate = WorldCrossesData.worldCrosses.find(
            (cross) => cross.instrumentID === defaultUSD.value
          );

          if (matchedRate) {
            setPrice(matchedRate.bid);
          } else {
            setPrice(null); // fallback if no rate found
          }
        }
      }
    } catch (error) {
      console.error("Error processing instrument data:", error);
    }
  }, [InstrumentsData, WorldCrossesData]);

  //Handle onChange Currency
  const handleChangeCurrencyCalculator = (selected) => {
    setSelectedOption(selected);

    const selectedInstrumentID = selected?.value;

    // Get matching rate from WorldCrossesData
    const matchedRate = WorldCrossesData?.worldCrosses?.find(
      (cross) => cross.instrumentID === selectedInstrumentID
    );

    if (matchedRate) {
      setPrice(matchedRate.bid);
    } else {
      setPrice(null);
    }
  };

  // Only allow numeric or decimal values handle change Ready
  const handleInputChange = (e) => {
    const val = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (val === "" || regex.test(val)) {
      setPrice(val);
    }
  };

  const handleInputChangeTenor = (e) => {
    const value = e.target.value;

    // Allow only digits and up to 4 characters
    if (/^\d{0,4}$/.test(value)) {
      const numericValue = parseInt(value, 10);

      // Allow empty input or numbers from 1 to 1000
      if (value === "" || (numericValue >= 1 && numericValue <= 1000)) {
        setInputValue(value);

        if (value !== "") {
          const newDate = new Date();
          newDate.setDate(newDate.getDate() + numericValue); // Use numericValue here
          setTagText(formatDate(newDate));
        } else {
          setTagText(""); // Optional: clear tag text if input is empty
        }
      }
    }
  };

  // Only allow numeric input
  const handleInputChangelibor = (e) => {
    const value = e.target.value;

    // Allow up to 2 digits before decimal and up to 4 digits after decimal
    if (/^\d{0,2}(\.\d{0,4})?$/.test(value)) {
      setLiborValue(value);
    }
  };

  // Handle Change Ready Value
  const handleReadyValue = (e) => {
    const value = e.target.value;

    // Match format: up to 4 digits before decimal, up to 4 digits after
    if (/^\d{0,4}(\.\d{0,4})?$/.test(value)) {
      const [integerPart] = value.split(".");

      // Allow empty string (for typing) or numeric part between 1 and 1000
      if (
        value === "" ||
        (parseInt(integerPart, 10) >= 1 && parseInt(integerPart, 10) <= 1000)
      ) {
        setPrice(value);
      }
    }
  };

  const handleCalculateFxDiscountingRate = () => {
    let Data = {
      Ready: price,
      Tenor: Number(inputValue),
      Libor: Number(liborValue),
    };
    dispatch(CalculateFxDiscountingAPI({ Data, navigate }));
  };

  return (
    <>
      <div className="card-box h-auto">
        <div className="box-header bg-primary-orange px-2 color-white">
          <div className="d-flex align-items-center">
            <div className="fs-6 fw-bold">FX Discounting</div>
            <div className="clc-btn-wrapper ms-auto">
              <CustomButton
                value="Calculate Rate"
                applyClass="calculatorButton"
                onClick={handleCalculateFxDiscountingRate}
              />
            </div>
          </div>
        </div>
        <div className="box-content-wrapper h-auto">
          <div className="d-flex align-items-center">
            <div className="flex-fill px-2 p-2">
              <label className="mt-1">Currency</label>
              <SelectDropdown
                options={discountingApplicableList}
                value={selectedOption}
                onChange={handleChangeCurrencyCalculator}
                placeholder="Select a currency"
              />

              <label className="mt-1">Ready</label>
              <InputFIeld
                type="number"
                name="price"
                defaultValue="0"
                value={price}
                applyClass={"CalculatorTextfield"}
                onChange={handleReadyValue}
              />

              <label className="mt-1">Tenor</label>
              <InputFieldWithTag
                type="text"
                value={inputValue}
                onChange={handleInputChangeTenor}
                placeholder="Enter value"
                applyClass="inputField-calculator"
                applyClassTag="tag-for-calculator"
                width="100%" // width of the entire container
                inputWidth="60%" // width of the input field
                tagText={tagText}
                tagWidth="40%" // width of the span
                tagClassName="yourTagClass"
              />

              <label className="mt-1">Libor</label>
              <InputFieldWithTag
                type="text"
                value={liborValue}
                onChange={handleInputChangelibor}
                placeholder="Enter value"
                applyClass="inputField-calculator"
                applyClassTag="tag-for-calculator"
                width="100%" // width of the entire container
                inputWidth="90%" // width of the input field
                tagText="%"
                tagWidth="10%" // width of the span
                tagClassName="yourTagClass"
              />
            </div>
            <div className="px-2 text-center">
              <div className="clc-amount fs-4 fw-bold px-4 py-3 bg-black color-white">
                {CalculatedFxDiscounting}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalculatorFxDiscounting;
