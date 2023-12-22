import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Home from "./Components/index.js";
import Testnet from "./Components/Helper.js";

export default function App(){

const httpHeaders = {
   "Content-Type": "application/json",
   "Access-Control-Allow-Origin": "*",
   "Access-Control-Allow-Headers": "X-Requested-With"
 }

 return(
   <div className="body">
    <div className="app">
     <BrowserRouter>
      <div className="Home">
       <NavLink
        to="/"
        >
       Home
      </NavLink>
     <NavLink
       to="/Testnet"
       >
       Testnet
      </NavLink>
     </div>
     <Routes>
      <Route
       exact
       path="/"
       element={<Home />}
      />
      <Route
      exact
      path="/Testnet"
      element={<Testnet />}
     />
     </Routes>
     </BrowserRouter>
    </div>
   </div>

  );
}
