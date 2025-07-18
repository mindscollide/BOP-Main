import React from "react";
import { Link, useLocation } from "react-router-dom";
import SiteLogo from "../../../assets/logo.png"; // Update the path as necessary

const SiteLogoComponent = () => {
  const location = useLocation();
  const shouldIncludeBranch =
    import.meta.env.VITE_APP_INCLUDE_BRANCH === "true";
  const shouldIncludeDealer =
    import.meta.env.VITE_APP_INCLUDE_DEALER === "true";
  const shouldIncludeCorporate =
    import.meta.env.VITE_APP_INCLUDE_CORPORATE === "true";
  const shouldIncludeTreasury =
    import.meta.env.VITE_APP_INCLUDE_TREASURY === "true";

  return (
    <div className='site-logo'>
      <Link
        to={
          shouldIncludeBranch ||
          shouldIncludeDealer ||
          shouldIncludeBranch ||
          shouldIncludeCorporate ||
          shouldIncludeTreasury
            ? location.pathname
            : "/"
        }>
        <img src={SiteLogo} width={250} className='img-fluid' alt='BOP Logo' />
      </Link>
    </div>
  );
};

export default SiteLogoComponent;
