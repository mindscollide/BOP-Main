import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import { useModal } from "@/context/ModalContext";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { saveChatApi } from "./ChatActions";
import { useNavigate } from "react-router-dom";
import { convertDateTimeIntoGMT } from "@/utils/formatters";
import moment from "moment";
// import styles from "./ChatBranch.css";
const ChatBox = () => {
  const { setChatModal ,chatModalTransactionId} = useModal();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userName = localStorage.getItem("name");
  const [transactionChat, setTransactionChat] = useState({
    chatID: 0,
    getAllChat: [],
    transactionID: 0,
  });

  const getAllUserData = useSelector(
    (state) => state.chatSlicer.getAllChatByTransactions
  );


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
      } catch (error) {}
    } else {
      setTransactionChat({
        chatID: 0,
        getAllChat: [],
        transactionID: 0,
      });
    }
  }, [getAllUserData]);

  const handleClickClose = () => {
    setChatModal(false);
  };

  const handleClickSaveChat = (e) => {
    e.preventDefault()
    if (message !== "") {
      let Data = {
        TranscationID: chatModalTransactionId, // This is the transaction ID for the chat
        ReceiverID: 1, // He is the user who is receiving a message
        SenderID: 149, // He is the user who is sending a message
        Message: message, // This is the message content
        Attachments: [], // This is an array of attachments (if any)
      };
      dispatch(saveChatApi({ navigate, Data, setTransactionChat, setMessage }));
    }
  };

  return (
    <div className='user-chat-box active-chat' id='chat-len1'>
      <div className='chat-box-inner'>
        <div className='chat-box-header'>
          <div className='d-flex align-items-center'>
            <span className='user-name fw-bold'>{userName}</span>{" "}
            <span className='Company'>(ABC Corporation)</span>
            <span className='ms-auto'>
              <IconElement
                applyClass={"icon-close cursor-pointer"}
                onClick={handleClickClose}
              />
            </span>
          </div>
        </div>
        <div className='chat-box-content'>
          {transactionChat.getAllChat.length > 0
            ? transactionChat.getAllChat.map((data, index) => {
                if (data.senderID === 149) {
                  return (
                    <div className='text-end mb-3' key={data.chatMessageID}>
                      <div className='message-outbox message-box text-start'>
                        <div className='mess-txt-wrapper'>
                          <div className='mess-txt'>{data.message}</div>
                          {data.attachments.length > 0 &&
                            data.attachments.map((imgData, index) => {
                              if (imgData.imageBase64 !== "") {
                                return (
                                  <div className='w-100 mt-2'>
                                    <img src={`${imgData.imageBase64}`} />
                                  </div>
                                );
                              }
                            })}
                        </div>
                        <div className='mess-datetime mt-1'>
                          <div className='d-flex'>
                            <div className='message-status' />
                            <div className='ms-auto'>
                              <span className='chat-datetime'>
                              {moment(convertDateTimeIntoGMT(data.creationDateTime)).format("MMM DD, YYYY - HH:mm:ss A")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className='text-start mb-3' key={data.chatMessageID}>
                      <div className='message-inbox message-box text-start'>
                        <div className='mess-txt-wrapper'>
                          <div className='mess-txt'>{data.message}</div>
                          {data.attachments.length > 0 &&
                            data.attachments.map((imgData, index) => {
                              return (
                                <div className='w-100 mt-2'>
                                  <img
                                    width={30}
                                    height={30}
                                    src={`data:image/png;base64,${imgData.imageBase64}`}
                                  />
                                </div>
                              );
                            })}
                        </div>
                        <div className='mess-datetime mt-1'>
                          <div className='d-flex'>
                            <div className='message-status' />
                            <div className='ms-auto'>
                              <span className='chat-datetime'>
                              {moment(convertDateTimeIntoGMT(data.creationDateTime)).format("MMM DD, YYYY - HH:mm:ss A")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            : null}
        </div>
        <div className='chat-box-footer'>
          <form onSubmit={handleClickSaveChat}>
            <div className='d-flex align-items-center'>
              <div className='textarea-block col pe-1'>
                <InputFIeld
                  type={"text"}
                  applyClass={"chatSenderInput"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.trimStart())}
                />
              </div>
              <div className=''>
                <IconElement
                  applyClass={"icon-send cursor-pointer"}
                  onClick={handleClickSaveChat}
                />
                <span className='fw-bold cursor-pointer upload-file-wrapper'>
                  <IconElement
                    applyClass={"icon-attachment "}
                    isFile={true}
                    onFileChange={(e) => {
                      console.log("File selected:", e.target.files[0]);
                    }}
                  />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
