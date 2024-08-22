import React from "react";
import { Row, Col } from "react-bootstrap";
import CustomButton from "../../common/globalButton/button";
import SelectDropdown from "../../common/selectDropdown/SelectDropdown";
import IconElement from "../../common/IconElement/IconElement";

const ForwardsForTreasuryAndBranch = () => {
  return (
    <>
      <Row className='mt-4 mb-2'>
        <Col sm={12} md={6} lg={6}>
          <h6 className='fs-4 fw-bold color-primary'>
            Forwards For Treasury & Branch
          </h6>
        </Col>
        <Col sm={12} md={6} lg={6} className='flex-fill text-end'>
          <CustomButton value={"Create Tenor"} applyClass='createTenorBtn' />
        </Col>
        <div
          class='d-flex select-br-days flex-wrap justify-content-center'
          data-select2-id='6'>
          <div class='w-fix-350  '>
            <div className='input-group'>
              <SelectDropdown classNamePrefix={"DealerDropDown"} />
              <CustomButton
              
                value={"Add"}
                iconPosition={"start"}
                applyClass='PlusButton'
                icon={<IconElement iconClass={"icon-add-circle-fill fs-4"} />}
              />
            </div>
          </div>
        </div>
      </Row>
      {/* <Row className='mt-4 mb-2'>
        <Col sm={12} md={6} lg={6} className="d-flex justify-content-center">
            <SelectDropdown /><CustomButton value={"Add"} iconPosition={"end"} icon={<IconElement iconClass={"icon-add-circle-fill"} />} />
        </Col>
      </Row> */}
    </>
  );
};

export default ForwardsForTreasuryAndBranch;
