import React from "react";

const CorporateAndBranchTab = ({
  handleClickDiscounting,
  handleClickForwards,
  handleClickSpot,
}) => {
  return (
    <div class='row m-0'>
      <div class='col-12 px-1'>
        <ul
          class='nav nav-tabs mt-2 mb-4 justify-content-center'
          role='tablist'>
          <li class='nav-item' role='presentation' onClick={handleClickSpot}>
            <a
              class='nav-link text-nowrap active px-4 text-start'
              data-bs-toggle='tab'
              data-bs-target='#Spot'
              aria-selected='true'
              role='tab'>
              Spot
            </a>
          </li>
          <li
            class='nav-item'
            role='presentation'
            onClick={handleClickForwards}>
            <a
              class='nav-link text-nowrap px-4 text-start'
              data-bs-toggle='tab'
              data-bs-target='#Forwards'
              aria-selected='false'
              tabindex='-1'
              role='tab'>
              Forwards
            </a>
          </li>
          <li
            class='nav-item'
            role='presentation'
            onClick={handleClickDiscounting}>
            <a
              class='nav-link text-nowrap px-4 text-start'
              data-bs-toggle='tab'
              data-bs-target='#Discounting'
              aria-selected='false'
              tabindex='-1'
              role='tab'>
              Discounting
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CorporateAndBranchTab;
