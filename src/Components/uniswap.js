import { useState } from 'react';
import { providers, ethers } from 'ethers';
import { SwapWidget } from '@uniswap/widgets';

export default function App() {
  const [account, setAccount] = useState({
      address: '',
      provider: provider,
  })
  
  async function connectWallet() {
  //check if Metamask is installed in the browser
  const ethereumProvider = await detectEthereumProvider();
    if (ethereumProvider) {
  //prompt user to connect their wallet
    const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
     const address = accounts[0];
     setAccount({
        address: address,
        provider: ethereumProvider
     })
    }
  }

  return (
  <div className="App">
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
    <div className="Uniswap">
      <SwapWidget
        provider={account.provider}
        JsonRpcEndpoint={jsonRpcEndpoint} />
    </div>
  </div>
  );
}

