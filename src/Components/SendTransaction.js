import "./style.css";
import { Button, Input, Form, Popconfirn} from "antd";
import { useEffect, useState } from "react";
import { ethers ,utils } from "ethers";

export default function TX(){
  
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ defaultAccount, setDefaultAccount ] = useState(null);
  const [ userBalance, setUserBalance ] = useState(null);
  //const [ Tx, setTX] = useState("");

  useEffect(() => {}, [
     console.log("defaultAccount", defaultAccount),
     console.log("userBalance", userBalance)
   ]);

  const connectwallet = () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts'})
      .then(result => {
      accountChanged([result[0]])
    })
  } else {
    setErrorMessage('install Metamask Plase! ')
   }
 };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName)
    getUserBalance(accountName)
  };

  const getUserBalance = (accountAddress) => {
    window.ethereum.request({method: 'eth_getBalance', params: [String(accountAddress), "latest"]})
    .then(balance => {
      const wallet = setUserBalance(utils.formatEther(balance))
      //console.log("get user wallet ",wallet)
    })
  };



  async function sendTransaction(e){
    let params = [{
      from: "0xc759659E0E4B6207d522b7121742A5cC06C822b5",
      to: e.target.to_address.value,
      gas: Number(42000).toString(16),
      gasPrice: Number(28000000000).toString(16),
      value: utils.formatEther(e.target.value_eth.value),
   }]
   
  let result = await window.ethereum.request({method: "eth_sendTransaction", params}).catch((err) => {
    console.log(err)
  })
 }


  return(
     <div className="app">
	<br />
	<br />
       <div className="card">
        <br />
        <h1> Get Ξther GetBalance </h1>
	<br />
       <Button onClick={connectwallet}> Get Balance </Button>
       <br />
       <br />
       <div> <Button> 💲 Balance: {userBalance} </Button> </div>
       {errorMessage}
       <br />
       </div>
	<br />
        <div className="card">
	<br />
        <h1> Get Ξther Transaction </h1>
       <br />
       <Form onSubmit={sendTransaction}> 
       <div className="rand">
       <Input type="text" name="to_address" placeholder="Address" />
       </div>
       <br />
       <div className="hand">
       <Input type="text" name="value_eth" placeholder="Value_ETH" />
       </div>
       <br />
       <Input type="submit" value="submit" />
       </Form>
       <br />
      </div>
     </div>
  );
}
