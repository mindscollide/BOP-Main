import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import CustomButton from "@/components/common/globalButton/button";
import Modal from "@/components/common/globalModal/Modal";
import PdfIcon from "@/assets/pdf-icon.png";
import XlsIcon from "@/assets/xls.svg";
import TextArea from "@/components/common/textArea/TextArea";
import SelectDropdown from "@/components/common/selectDropdown/SelectDropdown";
import "./MailModal.css";
import IconElement from "@/components/common/IconElement/IconElement";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUsersEmailApi } from "@/components/utils/globalApis";
import { useNotification } from "@/context/NotificationProvider";
import {
  EmailBlotterTransactionDetailsForBranchAPI,
  EmailBlotterTransactionDetailsForCorporateAPI,
  EmailBlotterTransactionDetailsForTreasuryAPI,
} from "@/store/ReportSlicer/ReportActions";

const MailModal = ({ openMailModal, setOpenMailModal }) => {
  const userRole = localStorage.getItem("roleId");
  console.log(userRole, "useros");
  const dispatch = useDispatch();
  const { showMessage } = useNotification();
  const navigate = useNavigate();
  const [emailOptions, setEmailOptions] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [sendEmails, setSendEmails] = useState([]);
  const [isPDF, setIsPdf] = useState(true);
  const [isExcel, setIsExcel] = useState(true);
  const [message, setMessage] = useState("");

  const GetUsersEmail = useSelector((state) => state.authReducer.GetUsersEmail);
  console.log({ isPDF, isExcel }, "GetUsersEmailGetUsersEmail");
  useEffect(() => {
    dispatch(GetUsersEmailApi({ navigate }));
  }, []);

  useEffect(() => {
    if (GetUsersEmail?.usersEmailList?.length > 0) {
      try {
        let emailList = GetUsersEmail.usersEmailList.map((user) => ({
          ...user,
          value: user.email, // using the email as value
          label: user.email, // optional, if using in dropdowns
        }));
        console.log(emailList, "email list is");
        setEmailOptions(emailList);
      } catch (error) {
        console.error(error);
      }
    }
  }, [GetUsersEmail]);

  const onCloseModal = () => {
    setOpenMailModal(false);
  };

  console.log(emailOptions, "emailListemailList");
  const handleSelectUsers = (values) => {
    console.log(values, "selectedUser");
    setSelectedEmails(values);
  };

  const handleAddUsers = () => {
    setSendEmails([...sendEmails, ...selectedEmails]);
    setSelectedEmails([]);
  };

  const handleRemoveEmail = (value) => {
    console.log({ value }, "removedEmail");
    setSendEmails((prev) =>
      prev.filter((data2, index) => data2.userID !== value)
    );
  };

  const handleClickIcon = (iconName) => {
    if (iconName === "pdf") {
      if (!isExcel) {
        showMessage("1 document must be attached");
        return;
      }
      setIsPdf(false);
    }
    if (iconName === "xls") {
      if (!isPDF) {
        showMessage("1 document must be attached");
        return;
      }
      setIsExcel(false);
    }
  };

  const handleSendEmail = () => {
    console.log("handleSendEmail click", userRole, sendEmails);
    if (Number(userRole) === 9) {
      //send email to Branch
      try {
        const Data = {
          Emails: sendEmails.map((e) => ({ Email: e.email })),
          IsPdfAttached: isPDF,
          IsExcelAttached: isExcel,
          MessageBody: message,
        };
        // console.log(Data, "DataDataData");
        //send email to treasury
        dispatch(
          EmailBlotterTransactionDetailsForBranchAPI({
            navigate,
            Data,
            setOpenMailModal,
          })
        );
      } catch (error) {
        console.log(error, "Error");
      }
    }
    if (Number(userRole) === 8) {
      //send email to treasury
      try {
        const Data = {
          Emails: sendEmails.map((e) => ({ Email: e.email })),
          IsPdfAttached: isPDF,
          IsExcelAttached: isExcel,
          MessageBody: message,
        };
        // console.log(Data, "DataDataData");

        dispatch(
          EmailBlotterTransactionDetailsForTreasuryAPI({
            navigate,
            Data,
            setOpenMailModal,
          })
        );
      } catch (error) {
        console.log(error, "Error");
      }
    }
    if (Number(userRole) === 2) {
      //send email to corporate
      try {
        const Data = {
          Emails: sendEmails.map((e) => ({ Email: e.email })),
          IsPdfAttached: isPDF,
          IsExcelAttached: isExcel,
          MessageBody: message,
        };
        // console.log(Data, "DataDataData");
        //send email to treasury
        dispatch(
          EmailBlotterTransactionDetailsForCorporateAPI({
            navigate,
            Data,
            setOpenMailModal,
          })
        );
      } catch (error) {
        console.log(error, "Error");
      }
    }
  };

  const handleSendMessage = (event) => {
    const { name, value } = event.target;
    setMessage(value);
  };
  return (
    <>
      <Modal
        show={openMailModal}
        onHide={onCloseModal}
        // setShow={setOpenMailModal}
        centered={true}
        // className="MailModal-MainClass"
        size="lg"
        footerClassName="Mail-footer-className"
        headerClassName="Mail-header-className"
        closeButton
        modalHeader={
          <>
            <Row>
              <Col>
                <p className="transaaction-headings mt-2">
                  Transaction Document
                </p>
              </Col>
            </Row>
          </>
        }
        modalBody={
          <>
            <div>
              <Row className="mb-3">
                <Col
                  lg={10}
                  md={10}
                  sm={10}
                  className="transaction-doc-select-wrapper"
                >
                  <SelectDropdown
                    classNamePrefix="BlotterSearchDropdown"
                    placeholder="Search"
                    options={emailOptions.filter(
                      (data) => !sendEmails.includes(data)
                    )}
                    isMulti
                    maxMenuHeight={200}
                    isSearchable={true}
                    value={selectedEmails}
                    onChange={handleSelectUsers}
                  />
                </Col>
                <Col
                  lg={2}
                  md={2}
                  sm={2}
                  className="d-flex justify-content-end"
                >
                  <CustomButton
                    applyClass="addMailModalBtn"
                    value="Add"
                    onClick={handleAddUsers}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  sm={12}
                  md={12}
                  lg={12}
                  className="d-flex justify-content-start gap-2 flex-wrap "
                >
                  {sendEmails.map((user) => (
                    <span className="emailSendUser">
                      <IconElement
                        iconClass={"icon-close removeEmailIcon"}
                        onClick={() => handleRemoveEmail(user.userID)}
                      />
                      {user.email}
                    </span>
                  ))}
                </Col>
              </Row>
              <Row>
                <Col className="mb-3 mt-5">
                  <label>Message (Optional)</label>
                  <TextArea
                    rows={2}
                    name={"message"}
                    value={message}
                    onChange={handleSendMessage}
                  />
                </Col>
              </Row>
              <Row className="mb-3 doc-attached-wrapper ps-3">
                {isPDF && (
                  <Col lg={1} md={1} sm={1} className="doc-attached">
                    <img src={PdfIcon} width={30} alt="PDF " />
                    <IconElement
                      iconClass={"icon-trash remove-doc"}
                      onClick={() => handleClickIcon("pdf")}
                    />
                  </Col>
                )}
                {isExcel && (
                  <Col lg={1} md={1} sm={1} className="doc-attached">
                    <img src={XlsIcon} width={30} alt="Excel" />
                    <IconElement
                      iconClass={"icon-trash remove-doc"}
                      onClick={() => handleClickIcon("xls")}
                    />
                  </Col>
                )}
              </Row>
            </div>
          </>
        }
        modalFooter={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2 modal-footer-column"
              >
                <CustomButton
                  icon={<IconElement iconClass={"icon-close"} />}
                  value="Cancel"
                  className="cancel-button-mail"
                  onClick={onCloseModal}
                />
                <CustomButton
                  icon={<IconElement iconClass={"icon-send"} />}
                  className="Send-button-mail"
                  value="Send"
                  disabled={sendEmails.length === 0}
                  onClick={handleSendEmail}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default MailModal;
