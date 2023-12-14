//import Uniswap from "./Components/Swap.js";
//import RPC from "./Components/jsonrpc.js";
import "./App.css";
//import "./index.css";
import Connect from "./Components/ConnectWallet.tsx";
import Block from "./Components/BlockNumber.js";
import Balance from "./Components/Balance.tsx";
//import TX from "./Components/GetTransaction.js";

//import "./App.css";
//import ethers from "ethers";

export default function App(){
 return(
  <div className="body">
   <div className="app">
    <Connect />
    <Balance />
   </div>
  </div>
  );
}
