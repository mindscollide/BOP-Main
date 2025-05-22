import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import { useModal } from "@/context/ModalContext";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import styles from "./ChatBranch.css";
const ChatBox = () => {
  const { setChatModal } = useModal();
  const [message, setMessage] = useState("");

  console.log(message, "messagemessage");
  let userName = localStorage.getItem("name");
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

  const handleClickSaveChat = () => {
    if (message !== "") {
      let Data = {
        TranscationID: transactionChat.transactionID,
        ReceiverID: 149,
        SenderID: 1,
        Message: message,
        Attachments: [],
      };
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
                                Jul 18, 24 - 05:18:39 PM
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
                                Jul 18, 24 - 05:14:39 PM
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
          <div className='d-flex align-items-center'>
            <div className='' />
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
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
