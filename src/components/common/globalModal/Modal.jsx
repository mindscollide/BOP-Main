import React, { memo } from "react";
import { Modal } from "react-bootstrap";

const GlobalModal = ({
  show,
  centered,
  onHide,
  keyboard,
  modalBody, // Only include this once
  className,
  fullscreen,
  size,
  scrollable,
  style,
  modalFooter,
  backdrop = "static",
  closeButton,
  modalHeader,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop={backdrop}
      keyboard={keyboard}
      className={className}
      centered={centered}
      fullscreen={fullscreen}
      size={size}
      scrollable={scrollable}
      style={style}>
      {modalHeader && (
        <Modal.Header closeButton={closeButton}>{modalHeader}</Modal.Header>
      )}
      <Modal.Body>{modalBody}</Modal.Body>
      {modalFooter && <Modal.Footer>{modalFooter}</Modal.Footer>}
    </Modal>
  );
};

export default memo(GlobalModal);
