import React, { memo } from "react";
import { Modal } from "antd";

const GlobalModal = ({
  title,
  centered,
  show,
  footer,
  modalBody,
  mask,
  prefixCls,
}) => {
  return (
    <>
      <Modal
        title={title}
        centered={centered}
        open={show || false}
        footer={footer || null}
        mask={mask}
        prefixCls={prefixCls}
        closeIcon={false}
        loading={false}>
        {modalBody}
      </Modal>
    </>
  );
};

export default memo(GlobalModal);
