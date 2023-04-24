import React, {useEffect} from 'react';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from "@metamask/detect-provider";

function App() {
  const [web3Api, setWeb3Api] = React.useState<Web3>();
  const [account, setAccount] = React.useState<string>();

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        await (provider as any).request({method: 'eth_requestAccounts'});
        setWeb3Api(new Web3((provider as any)));
      } else {
        console.log('Please install MetaMask!');
      }
    }
    loadProvider();
  }, []);

  // get account from metamask
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api?.eth.getAccounts();
      setAccount(accounts && accounts[0]);
    }
    web3Api?.eth && getAccounts();
  }, [web3Api?.eth]);

  return (
    <div className="App">
      <div className="faucet-wrapper">
        <div className="faucet">
          <span>
            <strong>Account: </strong>
          </span>
          <h1>
            {account}
          </h1>
          <div className="balance-view is-size-2">
            Current Balance: <strong>10</strong> ETH
          </div>
          <button className="btn mr-2">Donate</button>
          <button className="btn">Withdraw</button>
        </div>
      </div>
    </div>
  );
}

export default App;
