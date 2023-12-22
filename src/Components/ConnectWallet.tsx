import "./style.css";
//import "./../App.css";
import Blockies from "react-blockies";
import { Button, Input} from "antd";
import { useEffect, useState } from "react";
import React, { Component } from 'react';
import { ethers } from "ethers";
//import { dotenv } from "dotenv";
//import { wretch } from "wretch";
import { Web3 } from "web3";
//import  ethereum from "ethereumjs-tx";
//import { delay } from "delay";
//import { fetch } from "node-fetch";
import Balance from "./SendTransaction.js";

export default function Home(props) {


  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [network, setNetwork] = useState('');
  const [chainId, setChainId] = useState(null);
  const [name, setName ] = useState(null);
//  const [balance, setBalance ] = useState(null);

  const URL = "https://rpc-staging.flashbots.net?bundle=5a08282e-52cb-43a0-ac72-b55b70d5b5aa"

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [
      walletAddress,
      console.log(" 🚀 ChainId ", chainId),
      console.log(" 🌐 Network: ", name),
      console.log(" ⚙️ Signer ", signer)
   ]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts */
         
        const accounts = await provider.send("eth_requestAccounts", []);
        /* get signer */
  //    const { balance } = await provider.getBalance();

    //    const balance = await provider.getBalance(accounts[0]);
  //      const balanceInEther = ethers.utils.formatEther(balance);
    //	this.setState({ walletAddress: accounts[0], balance: balanceInEther },

 	const { name, chainId } = await provider.getNetwork(accounts[0]);
        setChainId(chainId);
        setSigner(provider.getSigner());
        
         setName(name)
         setSigner(provider.getSigner());

    //     setBalance(balance)
//	 setSigner(provider.getSigner());
        /* local contract instance */
        /* set active wallet address */
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
     /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        /* get accounts */
        const accounts = await provider.send("eth_accounts", []);
	        
        if (accounts.length > 0) {
          /* get signer */
          setSigner(provider.getSigner());
          /* local contract instance */
          /* set active wallet address */
          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect Wallet button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts =  await provider.send("eth_requestAccounts", []);
  //  const balance = await provider.getBalance(accounts[0]);
//    const balanceInEther = ethers.utils.formatEther(balance);
  //  setBalance(balanceInEther)
    this.setState({ selectedAddress: accounts[0], balance: balanceInEther })
  }

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
      });
   } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };
/*  
   const Wallet = async () => {
    const result = await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
        chainId: "0x89",
        rpcUrls: ["https://polygon-rpc.com/"],
        chainName: "Matic Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18
        },
        blockExplorerUrls: ["https://polygonscan.com/"]
      }]
    });
  }
 
*/

  return (
     <div className="app">
       <div className="address">
        <Button
         onClick={connectWallet}
          >
          {walletAddress && walletAddress.length > 0
          ? `${walletAddress.substring(
          0,
          6
          )}...${walletAddress.substring(38)}`
          : "Connect Wallet"}
          </Button>
	  <div className="network"> <Button> ⛏️  Network: {name} </Button> </div>
          </div>
          <Balance />
	  <br />
           </div>
   );
  }

