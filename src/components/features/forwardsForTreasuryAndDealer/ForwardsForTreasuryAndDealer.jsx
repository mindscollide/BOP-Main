import React, {
  lazy,
  Suspense,
  startTransition,
  useEffect,
  useState,
} from "react";
import { Row, Col } from "react-bootstrap";
import GlobalModal from "../../common/globalModal/Modal";
import InputFIeld from "../../common/inputField/InputField";
import {
  createTenorAction,
  getAllTenorsAction,
  getDealerDashboardApi,
  getTenorWiseForwardsAction,
} from "@/container/pages/mainDealer/dealerActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTenorSchema } from "@/common/validationSchemas";
import { setCreateTenorModal } from "@/store/modalSlice/modalSlicer";
import { setTenorsCreated } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
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

const DealeAndTreasuryFeDiscountingTable = shouldIncludeComponents
  ? lazy(() =>
      import("@/components/features/FeDiscountingTable/FeDiscountingTable")
    )
  : null;

const DealeAndTreasuryNonFeDiscountingTable = shouldIncludeComponents
  ? lazy(() =>
      import(
        "@/components/features/NonFeDiscountingTable/NonFeDiscountingTable"
      )
    )
  : null;

/**
 * ForwardsForTreasuryAndDealer component.
 *
 * This component is responsible for managing the creation and display of
 * forwards for treasury and dealer operations. It allows users to create
 * new tenors, select existing tenors, and view related data in tables.
 *
 * It utilizes Redux for state management and includes modal functionality
 * for creating new tenor records. The component also handles validation
 * for tenor names and days, ensuring that duplicates are not created.
 *
 * @component
 * @example
 * return (
 *   <ForwardsForTreasuryAndDealer />
 * )
 */
const ForwardsForTreasuryAndDealer = () => {
  const createTenorModal = useSelector(
    (state) => state.modalReducer.createTenorModal
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [newTenorRecord, setNewTenorRecord] = useState(null);
  const tenorsCreated = useSelector(
    (state) => state.RealtimeActionsSlice.tenorsCreated
  );
  const forwardsForTreasuryBranch = useSelector(
    (state) => state.dealerReducer.forwardsForTreasuryBranch
  );
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
    dispatch(getDealerDashboardApi({ navigate }));
  }, []);
  const handleOpenModal = () => {
    // Wrap the state update in startTransition
    startTransition(() => {
      dispatch(setCreateTenorModal(true));
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
  };

  const handleCreateTenor = () => {
    if (createTenor.tenorName !== "" && createTenor.noOfDays !== 0) {
      const { tenors } = getAllTenorsData;
      if (tenors.length > 0) {
        const isExistTenorName = tenors.some(
          (item) => item.tenorName === createTenor.tenorName
        );
        const isExistTenorDays = tenors.some(
          (item) => item.tenorDays === createTenor.noOfDays
        );
        if (isExistTenorName) {
          setError({
            ...error,
            tenorName: "Tenor name already exists",
          });
        }
        if (isExistTenorDays) {
          setError({
            ...error,
            noOfDays: "No of days already exists",
          });
        }
      }
      let Data = {
        Tenor: createTenor.tenorName,
        NoOfDays: Number(createTenor.noOfDays),
      };
      dispatch(
        createTenorAction({
          Data,
          navigate,
          setCreateTenor,
        })
      );
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
    } catch (error) {}
  };
  console.log(getAllTenorsData, "getAllTenorsDatagetAllTenorsData");
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

  useEffect(() => {
    if (tenorsCreated !== null) {
      try {
        console.log(tenorsCreated, "tenorsCreatedtenorsCreated");
        const { tenor } = tenorsCreated;
        let findIsExist = getAllTenorsList.find(
          (data2, index) => data2.tenorID === tenor.tenorID
        );
        if (findIsExist === undefined) {
          let newObj = {
            ...tenor,
            value: tenor.tenorID,
            label: tenor.tenorName,
          };
          setAllTenorsList([...getAllTenorsList, newObj]);
          dispatch(setTenorsCreated(null));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [tenorsCreated]);

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
        {DealeAndTreasuryFeDiscountingTable && (
          <Col sm={12} md={12} lg={12} className='mt-3'>
            <Suspense fallback={<div>Loading table...</div>}>
              <h6 className='fs-4 fw-bold color-primary'>FE Discounting</h6>
              <DealeAndTreasuryFeDiscountingTable />
            </Suspense>
          </Col>
        )}
        {DealeAndTreasuryNonFeDiscountingTable && (
          <Col sm={12} md={12} lg={12} className='mt-3'>
            <Suspense fallback={<div>Loading table...</div>}>
              <h6 className='fs-4 fw-bold color-primary'>Non-FE Discounting</h6>
              <DealeAndTreasuryNonFeDiscountingTable />
            </Suspense>
          </Col>
        )}
      </Row>
      <GlobalModal
        show={createTenorModal}
        backdrop='static'
        onHide={() => {
          dispatch(setCreateTenorModal(false));
          setError({ tenorName: "", noOfDays: "" });
          setCreateTenor({
            tenorName: "",
            noOfDays: 0,
          });
        }}
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
                      onClick={() => {
                        dispatch(setCreateTenorModal(false));
                        setError({ tenorName: "", noOfDays: "" });
                        setCreateTenor({
                          tenorName: "",
                          noOfDays: 0,
                        });
                      }}
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
