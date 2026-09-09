import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import BOPLogo from "@/assets/logo.png";
import styles from "./redirected.module.css";
import { EmailTokenVerifyApi } from "../authActions/AuthActions";

// Landing page for every emailed action link (currently: forgot-password reset).
// The link always points here as ?resetPass_action=<token>; this identifier tells
// us which action the link is for, so more action types can be added alongside it later.
const Redirected = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // if (!location.search.includes("resetPass_action=")) {
    //   navigate("/resetPasswordLinkExpired");
    //   return;
    // }

    const token = location.search.split("resetPass_action=")[1];
    const Data = { EncryptedString: token };

    // EmailTokenVerifyApi itself routes on the response message: a valid token goes
    // to /resetPassword, an expired/used one to /resetPasswordLinkExpired. Navigating
    // again here would replace whichever route it just picked, so only failures are
    // handled below.
    dispatch(EmailTokenVerifyApi({ Data, navigate }))
   
  }, [location.search]);

  return (
    <section className={styles["sign-in"]}>
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className="d-flex justify-content-center mt-5 "
        >
          <img
            src={BOPLogo}
            style={{ maxWidth: "100%" }}
            width="300"
            className="img-fluid"
            alt="BOP Logo"
          />
        </Col>
        <Col sm={12} md={12} lg={12}>
          <p className={styles["verifying"]}>Verifying your link&hellip;</p>
        </Col>
      </Row>
    </section>
  );
};

export default Redirected;
