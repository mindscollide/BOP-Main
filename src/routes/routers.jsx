import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "../container/dashboard/Dashboard";
import MainBranch from "../container/pages/mainBranch/MainBranch";
import MainTreasury from "../container/pages/mainTreasury/MainTreasury";
import MainCorporate from "../container/pages/mainCorporate/MainCorporate";
import MainDealer from "../container/pages/mainDealer/MainDealer";

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route path='branch' element={<MainBranch />} />
          <Route path='Treasury' element={<MainTreasury />} />
          <Route path='corporate' element={<MainCorporate />} />
          <Route path='dealer' element={<MainDealer />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Routing;
