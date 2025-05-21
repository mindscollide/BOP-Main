import React from "react";
import { Dropdown, Nav } from "react-bootstrap";
import IconElement from "../IconElement/IconElement";
import styles from "./ProfileDropdown.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogoutApi } from "@/container/loginScreens/authActions/logoutAction";
import { useModal } from "@/context/ModalContext";
import { getUserSettingDataAPI } from "@/components/features/settingsModal/settingActions";

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setSettingModal } = useModal();
  const handleClickLogout = () => {
    dispatch(LogoutApi({ navigate }));
  };
  const handleOpenSettingModal = () => {
    dispatch(getUserSettingDataAPI({ navigate, setSettingModal }));
  };
  return (
    <Dropdown>
      <Dropdown.Toggle className={styles["ProfileDropdown"]}>
        <span className='user-logdin-name fw-bold color-hd max-w-fix-100 text-truncate d-inline-block align-middle'>
          {localStorage.getItem("name")}
        </span>
        <IconElement iconClass={"icon-arrow-down"} />
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles["ProfileDropdown_menu"]}>
        <Dropdown.Item
          onClick={handleOpenSettingModal}
          className='d-flex align-items-center cursor-pointer'>
          <Nav.Link>
            <IconElement iconClass={"icon-settings me-1"} />
            <label>Setting</label>
          </Nav.Link>
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleClickLogout}
          className='d-flex align-items-center cursor-pointer'>
          <IconElement iconClass={"icon-logout me-1"} />
          <label>Logout</label>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropdown;
