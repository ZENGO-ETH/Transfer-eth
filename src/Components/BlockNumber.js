
//import "./style.css";
import { Button, Input} from "antd";
import { useEffect, useState } from "react";
//import { dotenv } from "dotenv";

export default function App(){
  const [blockNumber, setBlockNumber] = useState(null);

  useEffect(() => {
    console.log(" 🔎 latest BlockNumber", handleButton1());
  }, []);

  const ethers = require('ethers')
  //const API_KEY = "CCJN4ZFFES6UJGZ9EAECF6DAYNIWPS8ZTF";
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  /*
  const infuraProvider = new ethers.providers.InfuraProvider(
    'mainnet',
    API_KEY
  );
  */
  const handleButton1 = async () => {
    const latest_block = await provider.getBlockNumber('latest');
    setBlockNumber(latest_block);
    console.log(" 🔎 blockNumber " + blockNumber)
  }

  
  return (
  <div className="app">
    <div className="card">
     <br />
     <h1>Get Ξther BlockNumber </h1>
      <br />
      <Button onClick={handleButton1}> Latest_Block </Button>
       <br />
       <p> 🌏 Latest_Blocks: {blockNumber} </p>
     <br />
    </div>
  <br />
  </div>
  );
}
