import Connect from "./ConnectWallet.tsx";
import Block from "./BlockNumber.js";
import Json from "./jsonrpc.js";
//import Balance from "./Balance.tsx";
//import TX from "./Components/GetTransaction.js";

//import "./App.css";
//import ethers from "ethers";

export default function App(){
 return(
  <div className="body">
   <div className="app">
    <Connect />
    <Block />
    <Json />
   </div>
  </div>
  );
}
