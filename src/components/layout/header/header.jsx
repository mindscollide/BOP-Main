import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./header.module.css";

const Header = ({
  handleCLickDealer,
  handleCLickCategory,
  handleCLickTreasury,
  DealarLink,
  CategoryLink,
  TreasuryLink,
}) => {
  return (
    <Navbar className={styles["top-header"]}>
      <Nav className='ms-auto'>
        {import.meta.env.VITE_APP_INCLUDE_BRANCH === "true" ||
        import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true" ? (
          <>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link className={styles["nav-link_active"]}>
                Gul Ahmed
              </Nav.Link>
            </Nav.Item>
          </>
        ) : null}
        {import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
        import.meta.env.VITE_APP_INCLUDE_TREASURY === "true" ? (
          <>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link
                as={Link}
                active={true}
                to={DealarLink || "/"}
                className={`${styles["nav-link"]} `}
                onClick={handleCLickDealer}>
                Dealer
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link
                as={Link}
                to={CategoryLink || "/"}
                className={`${styles["nav-link"]} `}
                onClick={handleCLickCategory}>
                Category
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link
                // href={TreasuryLink || "/"}
                as={Link}
                to={TreasuryLink || "/"}
                className={`${styles["nav-link_active"]}`}
                onClick={handleCLickTreasury}>
                Treasury
              </Nav.Link>
            </Nav.Item>
          </>
        ) : null}
      </Nav>
    </Navbar>
  );
};

export default Header;
