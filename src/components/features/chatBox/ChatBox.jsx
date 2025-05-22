import IconElement from "@/components/common/IconElement/IconElement";
import { useModal } from "@/context/ModalContext";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import styles from "./ChatBranch.css";
const ChatBox = () => {
  const { chatModalTransactionId, setChatModal } = useModal();
  const [transactionChat, setTransactionChat] = useState({
    chatID: 0,
    getAllChat: [],
    transactionID: 0,
  });

  const getAllUserData = useSelector(
    (state) => state.chatSlicer.getAllChatByTransactions
  );

  console.log(getAllUserData, "getAllUserDatagetAllUserData");

  useEffect(() => {
    if (getAllUserData !== null) {
      try {
        const { chatID, getAllChat, transactionID } = getAllUserData;
        if (Array.isArray(getAllChat) && getAllChat.length > 0) {
          setTransactionChat({
            chatID: chatID,
            getAllChat: getAllChat,
            transactionID: transactionID,
          });
        }
        // if()
      } catch (error) {}
    }
  }, [getAllUserData]);

  const handleClickClose = () => {
    setChatModal(false);
  };
  return (
    <div className='user-chat-box active-chat' id='chat-len1'>
      <div className='chat-box-inner'>
        <div className='chat-box-header'>
          <div className='d-flex align-items-center'>
            <span
              className='user-chat text-center'
              id='chat-user-img'>
              <img src='../img/profile.png' className='' alt='user' />
            </span>
            <span className='user-name fw-bold'>John Carter</span>{" "}
            <span className='Company'>(ABC Corporation)</span>
            <span className='ms-auto'>
              <IconElement
                applyClass={"icon-close cursor-pointer"}
                onClick={handleClickClose}
              />
          
            </span>
          </div>
        </div>
        <div className='chat-box-content'></div>
        <div className='chat-box-footer'>
          <div className='d-flex align-items-center'>
            <div className='' />
            <div className='textarea-block col pe-1'>
              <textarea
                className='form-control'
                name='chat-text-input'
                rows={1}
                defaultValue={""}
              />
            </div>
            <div className=''>
              <i className='icon-send' />
              <span className='fw-bold cursor-pointer upload-file-wrapper'>
                <input
                  type='file'
                  className='upload-chat-document-attachment'
                  name='upload-chat-document-attachment'
                  accept='image/png, image/jpeg,.pdf,.doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                />
                <i className='icon-attachment fw-bold' />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
