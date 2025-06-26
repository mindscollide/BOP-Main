import React, { useEffect } from "react";
import BlotterHeader from "./blotterHeader/BlotterHeader";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BlotterDataAPI } from "./BlotterActions";

const Blotter = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //Calling Corporate Blotter Data API

  return (
    <>
      <div className='row m-0 mt-3'>
        <div className='col-12 ps-1 pe-1 mb-2 col-blotter-table'>
          <section className='bg-white p-2'>
            <BlotterHeader />
          </section>
        </div>
      </div>
    </>
  );
};

export default Blotter;
