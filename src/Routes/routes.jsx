import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "../components/DashBoard/DashBoard";
import {
  PrivateRouteBranch,
  PrivateRouteCorporate,
  PrivateRouteDealer,
  PrivateRouteTreasury,
} from "./PrivateRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<DashBoard />} />
        {/* <Route element={<PrivateRouteCorporate />}></Route>

        <Route element={<PrivateRouteBranch />}></Route>
        <Route element={<PrivateRouteDealer />}></Route>
        <Route element={<PrivateRouteTreasury />}></Route> */}
        {/* <Route path='/' element={<DashBoard />}>
          <Route path='/Dealer' element={<Dealer />} />
          <Route path='/Category' element={<Category />} />
          <Route path='/Branch' element={<Branch />} />
          <Route path='/Corporate' element={<Corporate />} />
          <Route path='/Treasury' element={<Treasury />} />
          <Route path='*' element={<NotFound />} />
          <Route />
        </Route> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
