import React from "react";
import { Row, Col } from "react-bootstrap";
import CardImage from "./../../../assets/no-inst-icn.png";

const CardDragger = ({}) => {
  return (
    <>
      <div className="box-item mt-0 bg-Yorange-light2 no-inst-added droppable-inst">
        <div className="no-inst-content">
          <div className="no-inst-content-inner text-center">
            <div className="dragg-icn">
              <img src={CardImage} width={50} alt="No Instrument Icon" />
            </div>
            Drop Instrument
          </div>
        </div>
      </div>
    </>
  );
};
export default CardDragger;
