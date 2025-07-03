import React, { useEffect, useState } from "react";
import "./CorporateBookaForwardModal.css";
import Select from "react-select";
import Modal from "@/components/common/globalModal/Modal";
import { Col, Row } from "react-bootstrap";
import InputFIeld from "@/components/common/inputField/InputField";
import CustomButton from "@/components/common/globalButton/button";
import { useSelector } from "react-redux";
const CorporateBookaForwardModal = ({
  bookaForwardModalCall,
  setBookaForwardModalCall,
}) => {
  const natureOfBusinessList = useSelector(
    (state) => state.authReducer.GetAllNatureOfTransactions
  );

  const [natureOfBusinessSelcted, setNatureOfBusinessSelected] = useState({
    value: 0,
    label: "",
  });
  const [instrumentValue, setInstrumentValue] = useState({
    value: 0,
    label: "",
    SecondaryInstrumentID: 0,
  });
  const [forwardRFQState, setForwardRFQState] = useState({
    AccNo: "",
    Amount: "",
    TenorDays: "",
    Options: "",
    Ready: "",
    Swap: "",
    CalculateRate: 0,
  });

  const [typeOptions] = useState([
    { label: "Buy", value: 1 },
    { label: "Sell", value: 2 },
  ]);

  const [typeOptionSelected, setTypeOptionSelected] = useState({
    value: 0,
    label: "",
  });

  const handleChangeType = (selectType) => {
    console.log("selectType", selectType);
    setTypeOptionSelected(selectType);
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  useEffect(() => {
    if (natureOfBusinessList !== null) {
      console.log(
        natureOfBusinessList,
        "natureOfBusinessListnatureOfBusinessList"
      );
      try {
        const { natureOfTransactions } = natureOfBusinessList;
        natureOfTransactions.forEach((business) => {
          if (business.isForForward === true) {
            setNatureOfBusinessSelected({
              value: business.id,
              label: business.name,
            });
          }
        });

        // setNatureOfBusinessSelected(formattedOptions);
      } catch (error) {
        console.log(error, "Error in natureOfBusinessList useEffect");
      }
    }
  }, [natureOfBusinessList]);

  // handle Change amount
  const handleChangeValues = (event) => {
    const { name, value } = event.target;
    if (name === "Amount") {
      const regex = /^[0-9]*$/;
      if (regex.test(value)) {
        setForwardRFQState({
          ...forwardRFQState,
          [name]: value,
        });
      }
    }
  };

  return (
    <div>
      {" "}
      <Modal
        show={bookaForwardModalCall}
        setShow={setBookaForwardModalCall}
        onHide={() => {
          setBookaForwardModalCall(false);
        }}
        closeButton
        footerClassName={"BookaforwardCorporateFooterClassname"}
        headerClassName={"BookaforwardCorporateHeaderClassname"}
        bodyClassName={"BookaforwardCorporateBodyClassname"}
        className=''
        modalHeader={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className='HeaderHeadingName'>Gull Ahmed</span>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <Row>
              <Col lg={9} md={9} sm={9} className='position-relative'>
                <Row>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Currency</span>
                      <Select
                        options={options}
                        placeholder=''
                        classNamePrefix='bookaForwardCorporate'
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Type</span>
                      <Select
                        options={typeOptions}
                        placeholder=''
                        value={
                          typeOptionSelected.value === 0
                            ? null
                            : typeOptionSelected
                        }
                        onChange={handleChangeType}
                        classNamePrefix='bookaForwardCorporate'
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Nature</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={natureOfBusinessSelcted?.label || ""}
                        disabled={true}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>A/c No*</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.AccNo}
                        name={"AccNo"}
                        onChange={handleChangeValues}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={12} md={12} sm={12}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Amount</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.Amount}
                        name={"Amount"}
                        onChange={handleChangeValues}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2  g-0'>
                  <Col lg={8} md={8} sm={8}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Tenor</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.TenorDays}
                        name={"TenorDays"}
                        onChange={handleChangeValues}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4} className='position-relative'>
                    <span className='dateSpan'>Fri, Apr 25, 2025</span>
                  </Col>
                </Row>
                <Row className='mt-2  g-0'>
                  <Col lg={8} md={8} sm={8}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Options</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.Options}
                        name={"Options"}
                        onChange={handleChangeValues}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={4} className='position-relative'>
                    <span className='dateSpatwo'>Fri, Apr 25, 2025</span>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Ready</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.Ready}
                      />
                    </div>
                  </Col>
                  <Col lg={6} md={6} sm={6}>
                    <div className='d-flex flex-column flex-wrap'>
                      <span className='SubHeadings'>Swap</span>
                      <InputFIeld
                        applyClass={"BookaForwardCorporateInputFields"}
                        value={forwardRFQState.Swap}
                      />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col lg={3} md={3} sm={3} className='BlueboxStyles '>
                <span className='BlueBackGroundbox d-flex justify-content-center align-items-centerF '>
                  {forwardRFQState.CalculateRate}
                </span>
              </Col>
            </Row>
          </>
        }
        modalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className='d-flex justify-content-center'>
                <CustomButton
                  value={"Confirm"}
                  applyClass={"ConfirmButtonBookaForward"}
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default CorporateBookaForwardModal;
