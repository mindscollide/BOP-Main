import React, { lazy, Suspense } from "react";
import { Row, Col } from "react-bootstrap";
import { useModal } from "../../../context/ModalContext";
import GlobalModal from "../../common/globalModal/Modal";

// Conditionally import CustomButton based on the environment variables
const shouldIncludeComponents =
  import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
  import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

const CustomButton = shouldIncludeComponents
  ? lazy(() => import("../../common/globalButton/button"))
  : null;

const SelectDropdown = shouldIncludeComponents
  ? lazy(() => import("../../common/selectDropdown/SelectDropdown"))
  : null;

const IconElement = shouldIncludeComponents
  ? lazy(() => import("../../common/IconElement/IconElement"))
  : null;

const ForwardsForTreasuryAndBranchTable = shouldIncludeComponents
  ? lazy(() =>
      import(
        "../forwardsForTreasuryAndBranchTable/ForwardsForTreasuryAndBranchTable"
      )
    )
  : null;

const DealeAndTreasuryDiscountingTable = shouldIncludeComponents
  ? lazy(() =>
      import(
        "../dealeAndTreasuryDiscountingTable/DealeAndTreasuryDiscountingTable"
      )
    )
  : null;

const ForwardsForTreasuryAndBranch = () => {
  const { createTenorModal, setCreateTenorModal } = useModal();
  console.log(createTenorModal, "createTenorModalcreateTenorModal");
  return (
    <>
      <Row className='mt-4 mb-2'>
        <Col sm={12} md={6} lg={6}>
          <h6 className='fs-4 fw-bold color-primary'>
            Forwards For Treasury & Branch
          </h6>
        </Col>
        <Col sm={12} md={6} lg={6} className='flex-fill text-end'>
          {CustomButton && (
            <Suspense fallback={<div>Loading button...</div>}>
              <CustomButton
                value={"Create Tenor"}
                applyClass='createTenorBtn'
                onClick={() => setCreateTenorModal(true)}
              />
            </Suspense>
          )}
        </Col>
        <Col sm={12} md={12} lg={12}>
          <div
            className='d-flex select-br-days flex-wrap justify-content-center'
            data-select2-id='6'>
            <div className='w-fix-350'>
              <div className='input-group'>
                {SelectDropdown && (
                  <Suspense fallback={<div>Loading dropdown...</div>}>
                    <SelectDropdown classNamePrefix={"DealerDropDown"} />
                  </Suspense>
                )}
                {IconElement && (
                  <Suspense fallback={<div>Loading icon...</div>}>
                    <CustomButton
                      value={"Add"}
                      iconPosition={"start"}
                      applyClass='PlusButton'
                      icon={
                        <IconElement iconClass={"icon-add-circle-fill fs-4"} />
                      }
                    />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        </Col>
        {ForwardsForTreasuryAndBranchTable && (
          <Col sm={12} md={12} lg={12} className='mt-3'>
            <Suspense fallback={<div>Loading table...</div>}>
              <ForwardsForTreasuryAndBranchTable />
            </Suspense>
          </Col>
        )}
        {DealeAndTreasuryDiscountingTable && (
          <Col sm={12} md={12} lg={12} className='mt-3'>
            <Suspense fallback={<div>Loading table...</div>}>
              <h6 className='fs-4 fw-bold color-primary'>Discounting</h6>
              <DealeAndTreasuryDiscountingTable />
            </Suspense>
          </Col>
        )}
      </Row>
      <GlobalModal
        show={createTenorModal}
        backdrop="static"

      />
    </>
  );
};

export default ForwardsForTreasuryAndBranch;
