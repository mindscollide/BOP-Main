import React from "react";
import { Link } from "react-router-dom";
import SiteLogo from "../../../assets/logo.png"; // Update the path as necessary

const SiteLogoComponent = () => {
    return (
        <div className="site-logo">
            <Link to="/">
                <img
                    src={SiteLogo}
                    width={250}
                    className="img-fluid"
                    alt="BOP Logo"
                />
            </Link>
        </div>
    );
};

export default SiteLogoComponent;
