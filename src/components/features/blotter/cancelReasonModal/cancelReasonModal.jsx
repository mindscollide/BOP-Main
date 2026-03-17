import CustomButton from "@/components/common/globalButton/button";
import GlobalModal from "@/components/common/globalModal/Modal";
import TextArea from "@/components/common/textArea/TextArea";
import React from "react";
import { Col, Row } from "react-bootstrap";
const CancelReasonModal = ({
  cancelReasonModal,
  setCancelReasonModal,
  handleClickReasonSubmit,
  handleCloseReasonModal,
  cancelReasonComment,
  setCancelReasonComment,
}) => {
  const handleChange = (event) => {
    setCancelReasonComment(event.target.value.trimStart());
  };

  const handleHideModal = () => {
    setCancelReasonModal(false);
    setCancelReasonComment("");
  };
  return (
    <GlobalModal
      show={cancelReasonModal}
      footerClassName={"d-block border-0 pt-0 pb-1"}
      bodyClassName={"pb-0"}
      onHide={handleHideModal}
      modalBody={
        <>
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              className="modal-title fw-bold color-blue h5"
            >
              Cancel Reason
            </Col>
          </Row>
          <Row className="form-group">
            <span className="col-form-label mt-4">Cancel Reason</span>
            <Col sm={12} md={12} lg={12}>
              <TextArea
                className="form-control"
                name={"cancelReasonInput"}
                value={cancelReasonComment}
                onChange={handleChange}
                maxLength={1500}
                placeholder={"Please enter cancel reason"}
                applyClass={"cancelReasonModalInputField"}
              />
            </Col>
          </Row>
        </>
      }
      modalFooter={
        <Row className="text-center">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex gap-1 justify-content-center"
          >
            <CustomButton
              applyClass={"cancelReasonModalSubmitBtn"}
              value="Submit"
              onClick={handleClickReasonSubmit}
              // disabled={cancelReasonComment !== "" ? false : true}
            />
            <CustomButton
              applyClass={"cancelReasonModalCancelBtn"}
              value="Close"
              onClick={handleCloseReasonModal}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default CancelReasonModal;
