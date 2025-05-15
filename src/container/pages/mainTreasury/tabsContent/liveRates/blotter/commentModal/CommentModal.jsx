import React from "react";
import Modal from "@/components/common/globalModal/Modal";
import { CloseButton, Col, Row } from "react-bootstrap";
const CommentModal = ({ comment, showCommentModal, setShowCommentModal }) => {
  return (
    <Modal
      show={showCommentModal}
      centered={true}
      onHide={() => setShowCommentModal(false)}
      modalBody={
        <>
          <Row>
            <Col
              sm={12}
              md={12}
              lg={12}
              className='d-flex justify-content-between'>
              <h5 className='modal-title fw-bold color-blue'>Comments</h5>
              <CloseButton onClick={() => setShowCommentModal(false)} />
            </Col>
            <Col sm={12} md={12} lg={12} className='mt-3'>
              <p className='comment-detail-modal-content'>{comment}</p>
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default CommentModal;
