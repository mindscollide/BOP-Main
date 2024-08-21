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
          <Nav.Item className={styles["nav-item"]}>
            <Nav.Link
              href={DealarLink || "/"}
              className={`${styles["nav-link_active"]} `}
              onClick={handleCLickDealer}>
              Dealer
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className={styles["nav-item"]}>
            <Nav.Link
              href={CategoryLink || "/"}
              className={`${styles["nav-link"]} `}
              onClick={handleCLickCategory}>
              Category
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className={styles["nav-item"]}>
            <Nav.Link
              href={TreasuryLink || "/"}
              // as={Link}
              // to={TreasuryLink || "/"}
              className={`${styles["nav-link"]}`}
              onClick={handleCLickTreasury}>
              Treasury
            </Nav.Link>
          </Nav.Item>

          <Nav.Item className={styles["nav-item"]}>
            <Nav.Link href='' className={styles["nav-link_active"]}>
              Gul Ahmed
            </Nav.Link>
          </Nav.Item>
        </Nav>
    </Navbar>
  );
};

export default Header;
