import React, {
  lazy,
  Suspense,
  startTransition,
  useEffect,
  useState,
} from "react";
import { Row, Col } from "react-bootstrap";
import { useModal } from "../../../context/ModalContext";
import GlobalModal from "../../common/globalModal/Modal";
import InputFIeld from "../../common/inputField/InputField";
import {
  createTenorAction,
  getAllTenorsAction,
  getTenorWiseForwardsAction,
} from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTenorSchema } from "@/common/validationSchemas";
import { useDealerAndTreasury } from "@/context/DealerAndTreasuryContext";
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
        "../forwardsForTreasuryAndDealerTable/ForwardsForTreasuryAndDealerTable"
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

const ForwardsForTreasuryAndDealer = () => {
  const { createTenorModal, setCreateTenorModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newTenorRecord, setNewTenorRecord] = useState(null);
  const { forwardsForTreasuryBranch } = useDealerAndTreasury();
  const getTenorWiseForwardsRates = useSelector(
    (state) => state.dealerReducer.getTenorWiseForwardsRates
  );
  const getAllTenorsData = useSelector(
    (state) => state.dealerReducer.getAllTenors
  );
  const [getAllTenorsList, setAllTenorsList] = useState([]);
  const [createTenor, setCreateTenor] = useState({
    tenorName: "",
    noOfDays: 0,
  });
  const [error, setError] = useState({ tenorName: "", noOfDays: "" });
  const [tenorValue, setTenorValue] = useState({
    value: 0,
    label: "",
  });
  useEffect(() => {
    dispatch(getAllTenorsAction({ navigate }));
  }, []);
  const handleOpenModal = () => {
    // Wrap the state update in startTransition
    startTransition(() => {
      setCreateTenorModal(true);
    });
  };

  const handleChangeTenors = (value) => {
    setTenorValue(value);
  };

  const handleChangeCreateTenor = (event) => {
    const { name, value } = event.target;

    // Restrict input length
    if (name === "tenorName" && value.length > 10) return;
    if (name === "noOfDays" && value.length > 4) return;
    setCreateTenor({ ...createTenor, [name]: value });

    // Live validation
    const validationResult = createTenorSchema.safeParse({
      ...createTenor,
      [name]: value,
    });
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.format();
      setError({
        tenorName: fieldErrors.tenorName?._errors[0] || "",
        noOfDays: fieldErrors.noOfDays?._errors[0] || "",
      });
    } else {
      setError({ tenorName: "", noOfDays: "" });
    }
  };

  const handleCreateTenor = () => {
    if (createTenor.tenorName !== "" && createTenor.noOfDays !== 0) {
      let Data = {
        Tenor: createTenor.tenorName,
        NoOfDays: Number(createTenor.noOfDays),
      };
      dispatch(createTenorAction({ Data, navigate, setCreateTenorModal }));
    }
  };

  const handleAddTenor = () => {
    try {
      if (!tenorValue?.value || !tenorValue?.label) {
        alert("Invalid tenor selection");
        return;
      }

      const tenorForwardData = {
        tenorID: tenorValue.value,
        tenorName: tenorValue.label,
        currentBid: "",
        currentAsk: "",
        lastAsk: "",
        lastBid: "",
        DateTime: new Date().toISOString(),
      };

      // Check if the tenor already exists in the current list
      const isExist = forwardsForTreasuryBranch.some(
        (item) => item.tenorID === tenorValue.value
      );

      if (isExist) {
        alert("Already exists");
        return;
      }

      // Add new tenor record
      setNewTenorRecord(tenorForwardData);
    } catch (error) {
      console.error("Error in handleAddTenor:", error);
    }
  };

  useEffect(() => {
    if (getAllTenorsData !== null) {
      try {
        let tenorsList = getAllTenorsData.tenors.map((tenor) => {
          return {
            ...tenor,
            label: tenor.tenorName,
            value: tenor.tenorID,
          };
        });
        setTenorValue({
          value: tenorsList[0].value,
          label: tenorsList[0].label,
        });
        setAllTenorsList(tenorsList);
      } catch (error) {}
    }
  }, [getAllTenorsData]);

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
                onClick={handleOpenModal}
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
                    <SelectDropdown
                      value={tenorValue}
                      onChange={handleChangeTenors}
                      options={getAllTenorsList}
                      classNamePrefix={"DealerDropDown"}
                    />
                  </Suspense>
                )}
                {IconElement && (
                  <Suspense fallback={<div>Loading icon...</div>}>
                    <CustomButton
                      value={"Add"}
                      iconPosition={"start"}
                      onClick={handleAddTenor}
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
              <ForwardsForTreasuryAndBranchTable
                newTenorRecord={newTenorRecord}
                setNewTenorRecord={setNewTenorRecord}
              />
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
        backdrop='static'
        onHide={() => setCreateTenorModal(false)}
        centered={true}
        footerClassName='d-block border-0'
        modalBody={
          <>
            <Row>
              <Col sm={12} md={12} lg={12} className='mb-4'>
                <div className='color-blue fw-bold fs-5'>Create Tenor</div>
              </Col>
              <Col sm={12} md={12} lg={12} className='mb-4'>
                <label className='mb-1'>Tenor</label>
                <InputFIeld
                  type='text'
                  value={createTenor.tenorName}
                  name='tenorName'
                  onChange={handleChangeCreateTenor}
                  className={"form-control"}
                />
                {error.tenorName && <span>{error.tenorName}</span>}
              </Col>
              <Col sm={12} md={12} lg={12} className='mb-2'>
                <label># Of Days</label>
                <InputFIeld
                  type='number'
                  value={createTenor.noOfDays}
                  name='noOfDays'
                  onChange={handleChangeCreateTenor}
                  className={"form-control"}
                />
                {error.noOfDays && <span>{error.noOfDays}</span>}
              </Col>
            </Row>
          </>
        }
        modalFooter={
          <>
            <Row>
              <Col
                sm={12}
                md={12}
                lg={12}
                className='d-flex justify-content-center gap-2'>
                {CustomButton && (
                  <Suspense fallback={<div>Loading button...</div>}>
                    <CustomButton
                      value={"Create Tenor"}
                      applyClass={"createTenorModalFooterBtn"}
                      onClick={handleCreateTenor}
                    />
                    <CustomButton
                      value={"Cancel"}
                      onClick={() => setCreateTenorModal(false)}
                      applyClass={"cancelTenorModalFooterBtn"}
                    />
                  </Suspense>
                )}
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default ForwardsForTreasuryAndDealer;
