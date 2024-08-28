import React from "react";
// import styles from "./ChatBranch.css";
const ChatBox = () => {
  return (
    <div className="user-chat-box active-chat" id="chat-len1">
      <div className="chat-box-inner">
        <div className="chat-box-header">
          <div className="d-flex align-items-center">
            <span
              className="user-chat text-center"
              tabIndex={0}
              id="chat-user-img"
            >
              <img src="../img/profile.png" className="" alt="user" />
            </span>
            <span className="user-name fw-bold">John Carter</span>{" "}
            <span className="Company">(ABC Corporation)</span>
            <span className="ms-auto">
              <i
                className="icon-close cursor-pointer"
                onclick="ChatBoxFunction($(this), 'close');"
              />
            </span>
          </div>
        </div>
        <div className="chat-box-content"></div>
        <div className="chat-box-footer">
          <div className="d-flex align-items-center">
            <div className="" />
            <div className="textarea-block col pe-1">
              <textarea
                className="form-control"
                name="chat-text-input"
                rows={1}
                defaultValue={""}
              />
            </div>
            <div className="">
              <i className="icon-send" />
              <span className="fw-bold cursor-pointer upload-file-wrapper">
                <input
                  type="file"
                  className="upload-chat-document-attachment"
                  name="upload-chat-document-attachment"
                  accept="image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                />
                <i className="icon-attachment fw-bold" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
