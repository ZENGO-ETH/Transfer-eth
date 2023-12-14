import React from 'react';
//import ethers from "ethers";
//import { Button } from "dapparatus"
import { Button, Input} from "antd";
//import './App.css';
//import BurnerProvider from 'burner-provider';
import Web3 from 'web3';

//var web3 = new Web3(new BurnerProvider('http://localhost:8545'));
//const { ethereum }  = window;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  componentDidMount(){
    this.init()
  }
/*
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts 
        const accounts = await provider.send("eth_requestAccounts", []);
        /* get signer 
        const { name, chainId } = await provider.getNetwork();
        setChainId(chainId);
        setSigner(provider.getSigner());

        /* local contract instance */
        /* set active wallet address 
      } catch (err) {
        console.error(err.message);
      }
    } else {
     /* MetaMask is not installed 
      console.log("Please install MetaMask");
    }
  };
                                                                         const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {                                                                    /* get provider 
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts 
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {
          /* get signer */                                   
          /* local contract instance */                                          /* set active wallet address 
          setWalletAddress(accounts[0]);                                       } else {
          console.log("Connect to MetaMask using the Connect Wallet button");
        }                                                                    } catch (err) {
        console.error(err.message);                                          }
    } else {                                                                 /* MetaMask is not installed 
    };                                                                   
   const addWalletListener = async () => {                                  if (typeof window != "undefined" && typeof window.ethereum != "undefined") {                                                                    window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);                                       });
    } else {                                                                 /* MetaMask is not installed 
*/

 async init(){
       const ethereum  = window;

       const ethers = require('ethers')
       const provider = new ethers.providers.Web3Provider(window.ethereum);
       const accounts = await provider.send("eth_requestAccounts", []);
      //const accounts = await ethereum.request({ method: 'eth_accounts' })
      if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Connected Account: ", account);
     }
    console.log("web3",web3)
//    let accounts = await web3.eth.getAccounts()
    this.setState({
      accounts: accounts,
      privateKey: localStorage.getItem('metaPrivateKey')
    },async ()=>{
      this.setState({
        balance: await web3.eth.getBalance(this.state.accounts[0])
      })
    })
   }
  

  handleInput(e){
    let update = {}
    update[e.target.name] = e.target.value
    this.setState(update)
  }
  render(){
    return (
      <div className="app">
       <br />
        <h1>
          Transaction 💱 Ethereum 
        </h1>
        <br />
        <br />
         <h1>Get Ξther Transaction </h1>
        <br />
        <Button onClick={ async ()=>{
	const ethereum  = window;

        const ethers = require('ethers')
	const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        //const accounts = await ethereum.request({ method: 'eth_accounts' })
        
         const account = accounts[0];
         console.log("Connected Account: ", account);
       }}> Connect Wallet </Button>
        <br />
        <br />
       <div style={{color:"#666666"}}>
          <div className="thing">
          🔍  address:
            <pre className="pre">
              {JSON.stringify(this.state.accounts,null,2)}
            </pre>
          </div>
          <div className="thing">
            🛰️  balance:
            <pre className="pre">
              {this.state.balance}
            </pre>
          </div>

        
         <br />

          <div className="thing">
            to 📥 <Input
                type="text" name="to" value={this.state.to} onChange={this.handleInput.bind(this)}
            />
	    <br />
	    <br />
            value 📥 <Input
                type="text" name="value" value={this.state.value} onChange={this.handleInput.bind(this)}
            />
	    <br />
	    <br />
            <Button color={"blue"} size="2" onClick={async ()=>{

                const tx = {
                  to: this.state.to,
                  from: this.state.accounts[0],
                  value: this.state.value,
                  data: '0x00'
                }

                web3.eth.sendTransaction(tx).then((receipt)=>{
                  console.log("receipt",receipt)
                  this.setState({receipt:receipt})
                });
              }}>
              Send Transaction
            </Button>
             <br />
	     <br />
            <div>
            <div style={{width:"60%",wordWrap:"break-word",color:"#cccccc",backgroundColor:"#444444",margin:"auto",fontSize:12,padding:10}}>
              {JSON.stringify(this.state.receipt)}
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
