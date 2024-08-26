import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.css";

const Header = ({
  handleCLickDealer,
  handleCLickCategory,
  handleCLickTreasury,
  DealarLink,
  CategoryLink,
  TreasuryLink,
}) => {
  const location = useLocation();
  console.log(location, "locationlocationlocationlocation");
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
                className={
                  location.pathname.includes("/dealer")
                    ? `${styles["nav-link_active"]} `
                    : `${styles["nav-link"]}`
                }
                onClick={handleCLickDealer}>
                Dealer
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link
                as={Link}
                to={CategoryLink || "/"}
                className={
                  location.pathname.includes("/category")
                    ? `${styles["nav-link"]} `
                    : `${styles["nav-link_active"]}`
                }
                onClick={handleCLickCategory}>
                Category
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link
                // href={TreasuryLink || "/"}
                as={Link}
                to={TreasuryLink || "/"}
                className={
                  location.pathname.includes("/treasury")
                    ? `${styles["nav-link"]}`
                    : `${styles["nav-link_active"]}`
                }
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
