import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import IconElement from "../IconElement/IconElement";
import styles from "./ProfileDropdown.module.css";

const ProfileDropdown = ({userName}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle className={styles["ProfileDropdown"]}>
        <p className='user-name-header2 mb-0'>{userName}</p>
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
