import React from "react";
import "./SellAndBuyModal.css";
import GlobalModal from "../../../common/globalModal/Modal";
import { useModal } from "../../../../context/ModalContext";
import { Col, Row } from "react-bootstrap";
import InputFIeld from "../../../common/inputField/InputField";
import SelectDropdown from "../../../common/selectDropdown/SelectDropdown";
import CustomButton from "../../../common/globalButton/button";
const SellAndBuyModal = () => {
  const { iSellAndBuyModal, setISellAndBuyModal } = useModal();
  return (
    <div>
      <GlobalModal
        show={iSellAndBuyModal}
        backdrop="static"
        onHide={() => setISellAndBuyModal(false)}
        centered={true}
        className={"ModalClassNameIsBuySell"}
        bodyClassName={"IsBuySellBodyModalClass"}
        headerClassName={"border-0"}
        size={"lg"}
        closeButton={true}
        modalHeader={true}
        modalBody={
          <>
            <Row>
              {/* First Half Modal  */}
              <Col lg={6} md={6} sm={12}>
                <Row>
                  <Col
                    lg={4}
                    md={4}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <span className="CustomernameLabel">Customer Name*</span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <InputFIeld
                      className={"form-control"}
                      applyClass={"IBuyISellModalTextFileds"}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col
                    lg={4}
                    md={4}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <span className="CustomernameLabel">Currency*</span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <InputFIeld
                      className={"form-control"}
                      placeholder={"USDPKR"}
                      applyClass={"IBuyISellModalTextFileds"}
                      disabled={true}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col
                    lg={4}
                    md={4}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <span className="CustomernameLabel">Amount*</span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <InputFIeld
                      className={"form-control"}
                      applyClass={"IBuyISellModalTextFileds"}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col
                    lg={4}
                    md={4}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <span className="CustomernameLabel">Nature*</span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <SelectDropdown
                      classNamePrefix={"IBuySellModalSelector"}
                      className={"SelectorClassBuySellModal"}
                    />
                  </Col>
                </Row>
              </Col>
              {/* Second Half Modal  */}
              <Col lg={6} md={6} sm={12}>
                <Row className="UpperMarginRow"></Row>
                <Row className="mt-4">
                  <Col
                    lg={3}
                    md={3}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <span className="CustomernameLabel">Type*</span>
                  </Col>
                  <Col lg={9} md={9} sm={12}>
                    <InputFIeld
                      className={"form-control"}
                      placeholder={"Sell USD"}
                      applyClass={"IBuyISellModalTextFileds"}
                      disabled={true}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col
                    lg={3}
                    md={3}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <span className="CustomernameLabel">A/c No</span>
                  </Col>
                  <Col lg={9} md={9} sm={12}>
                    <InputFIeld
                      className={"form-control"}
                      applyClass={"IBuyISellModalTextFileds"}
                    />
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col
                    lg={3}
                    md={3}
                    sm={12}
                    className="d-flex align-items-center"
                  >
                    <span className="CustomernameLabel">LC No</span>
                  </Col>
                  <Col lg={9} md={9} sm={12}>
                    <InputFIeld
                      className={"form-control"}
                      applyClass={"IBuyISellModalTextFileds"}
                    />
                  </Col>
                </Row>
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
                className="d-flex justify-content-end"
              >
                <CustomButton
                  value={"Confirm"}
                  className={"ConfirmbuttonClass"}
                />
              </Col>
            </Row>
          </>
        }
      />
    </div>
  );
};

export default SellAndBuyModal;
