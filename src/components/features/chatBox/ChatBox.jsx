import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import styles from "./ChatBox.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DownloadFileApi, saveChatApi, uploadDocumentApi } from "./ChatActions";
import { useNavigate } from "react-router-dom";
import {
  convertDateTimeIntoGMT,
  convertDateTimeIntoLocal,
  formatDateToUTC,
} from "@/utils/formatters";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { fileToBase64 } from "@/utils/converts";
import { setChatModal } from "@/store/modalSlice/modalSlicer";
import { setIncomingChat } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
// import styles from "./ChatBranch.css";

const ChatBox = () => {
  const chatModalTransactionId = useSelector(
    (state) => state.modalReducer.chatModalTransactionId
  );
  const IncomingChat = useSelector(
    (state) => state.RealtimeActionsSlice.IncomingChat
  );
  const receiverPersonID = useSelector(
    (state) => state.modalReducer.treasuryPersonID
  );

  console.log(receiverPersonID, "receiverPersonID");

  const [receiverId, setReceiverId] = useState(0);

  console.log(IncomingChat, "IncomingChatIncomingChat");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isTreasury = import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";
  console.log(receiverId, "receiverIdreceiverIdreceiverId");
  let userName = localStorage.getItem("name");
  const [transactionChat, setTransactionChat] = useState({
    chatID: 0,
    getAllChat: [],
    transactionID: 0,
  });
  console.log(transactionChat, "transactionChattransactionChat");
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
          setReceiverId(getAllChat[0]?.senderID);
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
  useEffect(() => {
    if (Array.isArray(IncomingChat) && IncomingChat.length > 0) {
      try {
        setTransactionChat((prevState) => {
          const existingChatIDs = prevState.getAllChat.map(
            (chat) => chat.chatMessageID
          );

          const updatedChats = prevState.getAllChat.map((existingChat) => {
            const incomingMatch = IncomingChat.find(
              (newChat) => newChat.chatMessageID === existingChat.chatMessageID
            );
            return incomingMatch
              ? { ...existingChat, ...incomingMatch }
              : existingChat;
          });

          const newChats = IncomingChat.filter(
            (newChat) => !existingChatIDs.includes(newChat.chatMessageID)
          );

          return {
            ...prevState,
            getAllChat: [...newChats, ...updatedChats], // prepend new chats, keep updated
          };
        });

        // Only dispatch AFTER state update is done
        const updatedIncoming = IncomingChat.filter(
          (newChat) =>
            !transactionChat.getAllChat.some(
              (existingChat) =>
                existingChat.chatMessageID === newChat.chatMessageID
            )
        );
        if (updatedIncoming.length !== IncomingChat.length) {
          dispatch(setIncomingChat(updatedIncoming));
        }
      } catch (error) {
        console.log(error, "Error in processing IncomingChat");
      }
    }
  }, [IncomingChat]);

  const handleClickClose = () => {
    dispatch(setChatModal(false));
  };

  const handleClickSaveChat = async (e) => {
    console.log("first", "file in handleClickSaveChat");
    if (message !== "" || file !== null) {
      if (file !== null) {
        const result = await dispatch(uploadDocumentApi({ file, navigate }));
        if (uploadDocumentApi.fulfilled.match(result)) {
          console.log("Success:", result.payload);
          const { response } = result.payload;
          let newRecords = [...response.attachments];
          let Data = {
            TranscationID: chatModalTransactionId, // This is the transaction ID for the chat
            ReceiverID: receiverPersonID, // He is the user who is receiving a message
            Message: message, // This is the message content
            Attachments: response.attachments.map((fileData, index) => {
              return {
                DisplayAttachmentName: fileData.displayAttachmentName,
                OriginalAttachmentName: fileData.originalAttachmentName,
              };
            }), // This is an array of attachments (if any)
          };
          console.log(newRecords, "attachmentsattachments");
          dispatch(
            saveChatApi({
              navigate,
              Data,
              setTransactionChat,
              setMessage,
              setFile,
              newRecords,
              file,
            })
          );
          // result.payload contains:
          // {
          //   response: ...,
          //   message: "File Uploaded Successfully"
          // }
        } else if (uploadDocumentApi.rejected.match(result)) {
          console.error("Error:", result.payload);
        }
      } else {
        let Data = {
          TranscationID: chatModalTransactionId, // This is the transaction ID for the chat
          ReceiverID: receiverPersonID, // He is the user who is receiving a message
          Message: message, // This is the message content
          Attachments: [], // This is an array of attachments (if any)
        };
        dispatch(
          saveChatApi({
            navigate,
            Data,
            setTransactionChat,
            setMessage,
            setFile,
            attachmentsData: [],
            file: null,
          })
        );
      }
    }
  };

  const handleDownload = (imgData) => {
    console.log(imgData, "imgData in handleDownload");
    let fileName = imgData.displayAttachmentName.split(".")[0];
    let ext = imgData.displayAttachmentName.split(".").pop().toLowerCase();
    let Data = {
      DisplayAttachmentName: imgData.displayAttachmentName,
      OriginalAttachmentName: imgData.originalAttachmentName,
    };
    dispatch(DownloadFileApi({ navigate, Data, fileName, ext }));
    console.log(fileName, ext, "imgData in handleDownload");
  };

  return (
    <div className="user-chat-box active-chat" id="chat-len1">
      <div className="chat-box-inner">
        <div className="chat-box-header">
          <div className="d-flex align-items-center">
            <span className="user-name fw-bold">{userName}</span>{" "}
            {/* <span className='Company'>(ABC Corporation)</span> */}
            <span className="ms-auto">
              <IconElement
                applyClass={"icon-close cursor-pointer"}
                onClick={handleClickClose}
              />
            </span>
          </div>
        </div>
        <div className="chat-box-content">
          {transactionChat.getAllChat.length > 0
            ? transactionChat.getAllChat.map((data, index) => {
                if (
                  data.receiverID === Number(localStorage.getItem("userID"))
                ) {
                  return (
                    <div className="text-start mb-3" key={data.chatMessageID}>
                      <div className="message-inbox message-box text-start">
                        <div className="mess-txt-wrapper">
                          <div className="mess-txt">{data.message}</div>
                          {data.attachments.length > 0 &&
                            data.attachments.map((imgData, index) => {
                              let extractExt =
                                imgData.displayAttachmentName.split(".")[1];
                              let extractBase64 =
                                imgData.imageBase64.split(",")[1];
                              console.log(
                                extractExt,
                                extractBase64,
                                "extractBase64extractBase64extractBase64"
                              );

                              return (
                                <div className="w-100 mt-2" key={index}>
                                  {extractExt === "png" ||
                                  extractExt === "jpeg" ||
                                  extractExt === "jpg" ? (
                                    <img
                                      src={`data:image/png;base64,${extractBase64}`}
                                    />
                                  ) : (
                                    <img
                                      src={`data:image/png;base64,${extractBase64}`}
                                    />
                                  )}

                                  <IconElement applyClass={"icon-download "} />
                                </div>
                              );
                            })}
                        </div>
                        <div className="mess-datetime mt-1">
                          <div className="d-flex">
                            <div className="message-status" />
                            <div className="ms-auto">
                              <span className="chat-datetime">
                                {moment(
                                  convertDateTimeIntoLocal(
                                    data.creationDateTime
                                  )
                                ).format("MMM DD, YYYY - hh:mm:ss A")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="text-end mb-3" key={data.chatMessageID}>
                      <div className="message-outbox message-box text-start">
                        <div className="mess-txt-wrapper">
                          <div className="mess-txt">{data.message}</div>
                          {data.attachments.length > 0 &&
                            data.attachments.map((imgData, index) => {
                              let extractExt =
                                imgData.displayAttachmentName.split(".")[1];
                              let extractBase64 =
                                imgData.imageBase64.split(",")[1];

                              if (
                                extractExt === "png" ||
                                extractExt === "jpeg" ||
                                extractExt === "jpg"
                              ) {
                                return (
                                  <div className="w-100 mt-2" key={index}>
                                    <IconElement
                                      applyClass={
                                        "icon-download d-flex justify-content-start"
                                      }
                                    />
                                    <img
                                      src={`data:image/png;base64,${extractBase64}`}
                                    />
                                  </div>
                                );
                              }
                            })}
                        </div>
                        <div className="mess-datetime mt-1">
                          <div className="d-flex">
                            <div className="message-status" />
                            <div className="ms-auto">
                              <span className="chat-datetime">
                                {moment(
                                  convertDateTimeIntoLocal(
                                    data.creationDateTime
                                  )
                                ).format("MMM DD, YYYY - hh:mm:ss A")}
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
        <div className="chat-box-footer">
          <form>
            <div className="d-flex align-items-center position-relative">
              {file && (
                <div className={styles["uploaded-file-section"]}>
                  <div className={styles["file-upload"]}>
                    <Row>
                      <Col
                        lg={3}
                        md={3}
                        sm={3}
                        className={styles["chat-upload-icon"]}
                      >
                        <IconElement applyClass={"icon-file"} />
                        <p className={styles["chat-upload-text"]}>
                          {file.name}
                        </p>
                        <div className={styles["delete-uplaoded-file"]}>
                          <IconElement
                            applyClass={"icon-close"}
                            onClick={() => setFile(null)}
                            iconClass={"text-white"}
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              )}

              <div className="textarea-block col pe-1">
                <InputFIeld
                  type="text"
                  applyClass="chatSenderInput"
                  value={message}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // prevent newline
                      handleClickSaveChat(e); // manually trigger submit
                    }
                  }}
                  // pattern={}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div>
                <IconElement
                  applyClass="icon-send cursor-pointer"
                  onClick={handleClickSaveChat}
                />
                <span className="fw-bold cursor-pointer upload-file-wrapper">
                  <IconElement
                    applyClass="icon-attachment"
                    isFile={true}
                    onFileChange={(e) => {
                      const selectedFile = e.target.files[0];
                      console.log("File selected:", selectedFile);
                      setFile(selectedFile);
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
