import React, {useEffect} from 'react';
import './App.css';
import Web3 from 'web3';

function App() {
  const [web3Api, setWeb3Api] = React.useState<Web3>();
  const [account, setAccount] = React.useState<string>();

  useEffect(() => {
    const loadProvider = async () => {
      let provider;

      if ((window as any).ethereum) {
        provider = (window as any).ethereum;
        try {
          await provider.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.log('User denied account access...')
        }
      } else if ((window as any).web3) {
        provider = (window as any).web3.currentProvider;
      } else if (!process.env.production) {
        provider = new (window as any).Web3.providers.HttpProvider('http://localhost:7545');
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }

      setWeb3Api(new Web3(provider));
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
