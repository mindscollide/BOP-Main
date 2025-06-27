import React, { useEffect } from "react";
import BlotterHeader from "./blotterHeader/BlotterHeader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BlotterDataAPI } from "./BlotterActions";

const Blotter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Calling Corporate Blotter Data API
  useEffect(() => {
    try {
      let Data = { sRow: 0, Length: 10 };
      dispatch(BlotterDataAPI({ navigate, Data }));
    } catch (error) {
      console.log(error, "error");
    }
  }, []);
  return (
    <>
      <div className='row m-0 mt-3'>
        <div className='col-12 ps-1 pe-1 mb-2 col-blotter-table'>
          <div className='p-2 '>
            <BlotterHeader />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blotter;
