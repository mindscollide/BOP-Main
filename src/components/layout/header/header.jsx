import React from "react";
import { Dropdown, Nav, Navbar, NavItem } from "react-bootstrap";
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./header.module.css";

const Header = () => {
  const location = useLocation();
  let branchDetails =
    localStorage.getItem("branch") !== null
      ? JSON.parse(localStorage.getItem("branch"))
      : null;
  let corporateDetails =
    localStorage.getItem("corporate") !== null
      ? JSON.parse(localStorage.getItem("corporate"))
      : null;

  console.log(branchDetails, "branchNamebranchName");
  return (
    <Navbar className={styles["top-header"]}>
      <Nav className="ms-auto">
        {import.meta.env.VITE_APP_INCLUDE_BRANCH === "true" ||
        import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true" ? (
          <>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link className={styles["nav-link_active"]}>
                {corporateDetails !== null
                  ? corporateDetails.corporateName
                  : branchDetails !== null && branchDetails?.branchName}
              </Nav.Link>
            </Nav.Item>
          </>
        ) : import.meta.env.VITE_APP_INCLUDE_DEALER === "true" ||
          import.meta.env.VITE_APP_INCLUDE_TREASURY === "true" ? (
          <>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link
                as={Link}
                active={true}
                to={"dealer"}
                className={
                  location.pathname.toLowerCase() ===
                  "/BOP/dealer".toLowerCase()
                    ? `${styles["nav-link_active"]} `
                    : `${styles["nav-link"]}`
                }
              >
                FX Trading
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link
                as={Link}
                to={"category"}
                className={
                  location.pathname.toLowerCase() ===
                  "/BOP/category".toLowerCase()
                    ? `${styles["nav-link_active"]} `
                    : `${styles["nav-link"]}`
                }
              >
                Category
              </Nav.Link>
            </Nav.Item>

            {import.meta.env.VITE_APP_INCLUDE_TREASURY === "true" && (
              <>
                <Dropdown>
                  <Dropdown.Toggle
                    as="div"
                    className={
                      location.pathname.toLowerCase().includes("/bop/reports")
                        ? `${styles["nav-link_active_dropdown"]} `
                        : `${styles["nav-link_dropdown"]}`
                    }
                  >
                    Reports
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to={"reports/dailyTrade"}>
                      Daily Trade
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}

            <Nav.Item className={styles["nav-item"]}>
              <Nav.Link
                as={Link}
                to={"treasury"}
                className={
                  location.pathname.toLowerCase() ===
                  "/BOP/treasury".toLowerCase()
                    ? `${styles["nav-link_active"]}`
                    : `${styles["nav-link"]}`
                }
              >
                Treasury Sales
              </Nav.Link>
            </Nav.Item>
          </>
        ) : null}
      </Nav>
    </Navbar>
  );
};

export default Header;
