import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import IconElement from "../IconElement/IconElement";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = ({ userName }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className={styles["ProfileDropdown"]}>
        <span className='user-logdin-name fw-bold color-hd max-w-fix-100 text-truncate d-inline-block align-middle'>{userName}</span>
        <IconElement iconClass={"icon-arrow-down"} />
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles["ProfileDropdown_menu"]}>
        <Dropdown.Item>
          <Nav.Link>
            <IconElement iconClass={"icon-settings me-1"} />
            <label>Setting</label>
          </Nav.Link>
        </Dropdown.Item>
        <Dropdown.Item>
          <IconElement iconClass={"icon-logout me-1"} />
          <label>Logout</label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
