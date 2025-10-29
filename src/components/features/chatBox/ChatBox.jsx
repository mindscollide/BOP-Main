import IconElement from "@/components/common/IconElement/IconElement";
import InputFIeld from "@/components/common/inputField/InputField";
import styles from "./ChatBox.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DownloadFileApi, saveChatApi, uploadDocumentApi } from "./ChatActions";
import { useNavigate } from "react-router-dom";
import { convertDateTimeIntoLocal } from "@/utils/formatters";
import moment from "moment";
import { Col, Row } from "react-bootstrap";
import { setChatModal } from "@/store/modalSlice/modalSlicer";
import { clearIncomingChat } from "@/store/realtimeActionsSlicer/realtimeActionSlice";
import CustomButton from "@/components/common/globalButton/button";
import {
  GetFEDiscountingTransactionDetailsApi,
  GetForwardTransactionDetailsApi,
  GetNonFEDiscountingTransactionDetailsApi,
  GetSpotTransactionDetailsApi,
} from "../blotter/BlotterActions";
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

  const ChatData = useSelector(
    (state) => state.modalReducer.ChatRecordInfoData
  );

  console.log(ChatData, "ChatDataChatData");

  const [receiverId, setReceiverId] = useState(0);

  console.log(receiverId, "IncomingChatIncomingChat");
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
  console.log(getAllUserData, "getAllUserDatagetAllUserData");
  useEffect(() => {
    if (getAllUserData !== null) {
      try {
        const { chatID, getAllChat, transactionID } = getAllUserData;

        if (Array.isArray(getAllChat)) {
          // Only update if data is different
          setTransactionChat((prev) => {
            if (
              prev.chatID !== chatID ||
              prev.transactionID !== transactionID ||
              prev.getAllChat.length !== getAllChat.length
            ) {
              return {
                chatID,
                getAllChat,
                transactionID,
              };
            }
            return prev; // no update → no re-render
          });

          // same for receiverId
          setReceiverId(getAllChat[0]?.senderID);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setTransactionChat((prev) => {
        if (
          prev.chatID !== 0 ||
          prev.transactionID !== 0 ||
          prev.getAllChat.length > 0
        ) {
          return {
            chatID: 0,
            getAllChat: [],
            transactionID: 0,
          };
        }
        return prev;
      });
    }
  }, [getAllUserData]);

  useEffect(() => {
    if (!Array.isArray(IncomingChat) || IncomingChat.length === 0) return;

    setTransactionChat((prevState) => {
      const existingChatIDs = new Set(
        prevState.getAllChat.map((chat) => chat.chatMessageID)
      );

      const mergedChats = [...prevState.getAllChat];
      let hasNewChats = false;

      IncomingChat.forEach((newChat) => {
        if (!existingChatIDs.has(newChat.chatMessageID)) {
          mergedChats.unshift(newChat);
          hasNewChats = true;
        } else {
          const index = mergedChats.findIndex(
            (c) => c.chatMessageID === newChat.chatMessageID
          );
          if (index !== -1)
            mergedChats[index] = { ...mergedChats[index], ...newChat };
        }
      });

      return {
        ...prevState,
        getAllChat: mergedChats,
      };
    });

    // ✅ now properly clear
    dispatch(clearIncomingChat());
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
  // const handleClickInfo = useCallback((getAllUserData) => {
  //   let Data = {
  //     PK_TransactionID: getAllUserData.transactionID,
  //   };
  //   if (natureType === 1) {
  //     dispatch(GetSpotTransactionDetailsApi({ navigate, Data }));
  //   } else if (natureType === 2) {
  //     dispatch(GetForwardTransactionDetailsApi({ navigate, Data }));
  //   } else if (natureType === 3) {
  //     dispatch(GetFEDiscountingTransactionDetailsApi({ navigate, Data }));
  //   } else if (natureType === 4) {
  //     dispatch(GetNonFEDiscountingTransactionDetailsApi({ navigate, Data }));
  //   }
  // }, []);

  const handleClickInfo = () => {
    let Data = {
      PK_TransactionID: chatModalTransactionId,
    };
    if (ChatData.natureType === 1) {
      dispatch(GetSpotTransactionDetailsApi({ navigate, Data }));
    } else if (ChatData.natureType === 2) {
      dispatch(GetForwardTransactionDetailsApi({ navigate, Data }));
    } else if (ChatData.natureType === 3) {
      dispatch(GetFEDiscountingTransactionDetailsApi({ navigate, Data }));
    } else if (ChatData.natureType === 4) {
      dispatch(GetNonFEDiscountingTransactionDetailsApi({ navigate, Data }));
    }
  };

  return (
    <div className="user-chat-box active-chat" id="chat-len1">
      <div className="chat-box-inner">
        <div className="chat-box-header">
          {/* <div className="d-flex align-items-center"> */}
          <Row>
            <Col
              sm={9}
              md={9}
              lg={9}
              className="d-flex justify-content-start align-items-center user-name fw-bold"
            >
              {ChatData?.clientName}
            </Col>
            <Col
              sm={2}
              md={2}
              lg={2}
              d-flex
              className="d-flex justify-content-end
              align-items-center"
            >
              <CustomButton
                size="small"
                onClick={handleClickInfo}
                applyClass="d-flex justify-content-center align-items-center"
                icon={
                  <svg
                    id="info_Layer_1"
                    x="0px"
                    y="0px"
                    width="12px"
                    height="12px"
                    fill="#ffffff"
                    viewBox="0 0 55 55"
                  >
                    <g>
                      <path d="M41.407,45.858c0.067,0.838,0.156,1.672,0.183,2.508   c0.005,0.152-0.205,0.376-0.37,0.461c-1.347,0.687-2.679,1.416-4.069,2.005c-3.305,1.396-6.715,2.5-10.277,3.009   c-1.447,0.206-2.936,0.154-4.403,0.153c-0.477-0.001-0.968-0.178-1.424-0.345c-1.313-0.481-1.98-1.443-1.948-2.85   c0.015-0.583,0.103-1.179,0.253-1.744c1.863-7.013,3.752-14.02,5.61-21.037c0.199-0.751,0.327-1.543,0.341-2.318   c0.021-1.142-0.615-1.925-1.667-2.331c-1.605-0.618-3.258-0.468-4.89-0.161c-1.764,0.332-3.468,0.873-5.149,1.884   c-0.074-0.978-0.157-1.863-0.187-2.75c-0.005-0.127,0.234-0.307,0.396-0.388c1.334-0.67,2.648-1.389,4.021-1.968   c3.327-1.403,6.755-2.512,10.337-3.021c1.465-0.208,2.994-0.294,4.457-0.125c2.782,0.323,3.808,2.02,3.073,4.73   c-0.94,3.474-1.914,6.941-2.838,10.419c-1.049,3.953-2.087,7.912-3.077,11.879c-0.524,2.107,0.385,3.449,2.526,3.839   c2.048,0.376,4.038-0.017,5.981-0.634C39.313,46.75,40.296,46.295,41.407,45.858z"></path>
                      <circle cx="27.5" cy="7.608" r="6.609"></circle>
                    </g>
                  </svg>
                }
              />
            </Col>
            <Col
              sm={1}
              md={1}
              lg={1}
              className="d-flex justify-content-end align-items-center"
            >
              {/* <span className="ms-auto"> */}
              <IconElement
                applyClass={"icon-close cursor-pointer"}
                onClick={handleClickClose}
              />
              {/* </span> */}
            </Col>
          </Row>
          {/* <span className="user-name fw-bold">{userName}</span>{" "} */}
          {/* <span className='Company'>(ABC Corporation)</span> */}
          {/* </div> */}
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
