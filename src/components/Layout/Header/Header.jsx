import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div class='top-header'>
      <div class='d-flex'>
        <ul class='nav navbar nav-top ms-auto'>
          <li class='nav-item'>
            {/* <Link to="/Dealer"> */}
            <a class='nav-link active'>Dealer</a>
            {/* </Link> */}
          </li>
          <li class='nav-item'>
            {/* <Link to="/Category"> */}
            <a class='nav-link'>Category</a>
            {/* </Link> */}
          </li>
          <li class='nav-item'>
            {/* <Link to="/Treasury"> */}
            <a class='nav-link'>Treasury</a>
            {/* </Link> */}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
