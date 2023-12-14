import RPC from "./jsonrpc.js";
import Block from "./BlockNumber.js";
import { Button, Input} from "antd";
import axios from "axios";
import { useState } from "react";
//import "./style.css";
const convert = require("ethereum-unit-converter");

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const apikey = "CCJN4ZFFES6UJGZ9EAECF6DAYNIWPS8ZTF"
  const getBalance = async () => {
    const result = await axios(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${apikey}`
    );

    const weiBalance = result.data.result;
    const etherBalance = convert(weiBalance, "wei", "ether");

    console.log(etherBalance)

    setBalance(`${etherBalance}`);
  };

  //console.log("balance: ", getBalance)

  return (
   <div className="app">
       <div className="card">
        <br />
        <h1>Get Ξther Balance Ethereum Mainnet </h1>
      <div className="hand">
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          placeholder="Enter the address"
          required={true}
        />
       </div>
      <div className="fainal">
        <Button
          onClick={getBalance}
          disabled={!address || address.substring(0, 2) !== "0x"}
        >
          Find balance
        </Button>
        <br />
        <div className="app__balance">
          <p> 🔎 Balance: {balance} </p>
           </div>
           </div>
          <br />
         </div>
	<br />
     <Block />
     <RPC />
     <br />
   </div>
  );
}

export default App;
