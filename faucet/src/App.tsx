import React, {useCallback, useEffect} from 'react';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from "@metamask/detect-provider";
import {loadContract} from "./utils/load-contract";
import {FaucetInstance} from "../types/truffle-contracts";

function App() {
  const [web3Api, setWeb3Api]
    = React.useState<{ web3: Web3 | null, provider: any, contract: FaucetInstance | null }>({
    web3: null,
    provider: null,
    contract: null
  });
  const [account, setAccount] = React.useState<string>();
  const [balance, setBalance] = React.useState<string>();

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      const contract = await loadContract("Faucet", provider);

      if (provider) {
        await (provider as any).request({method: 'eth_requestAccounts'});
        setWeb3Api({web3: new Web3(provider as any), provider, contract});
      } else {
        console.log('Please install MetaMask!');
      }
    }
    loadProvider();
  }, []);

  // get account from metamask
  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3Api.web3?.eth.getAccounts();
      setAccount(accounts && accounts[0]);
    }
    web3Api.web3 && getAccounts();
  }, [web3Api.web3]);

  // get balance from contract
  useEffect(() => {
    const loadBalance = async () => {
      const {contract, web3} = web3Api;
      // @ts-ignore
      const balance: string = await web3!.eth.getBalance(contract!.address);
      setBalance(web3!.utils.fromWei(balance, 'ether'));
    }
    web3Api.web3 && web3Api.contract && loadBalance();
  }, [web3Api.contract]);

  // add funds to contract
  const addFunds = useCallback(async () => {
    const {contract, web3} = web3Api;
    const amount = web3!.utils.toWei('1', 'ether');
    await contract!.addFunds({from: account, value: amount});
  }, [web3Api.contract, account]);

  return (
    <div className="App">
      <div className="faucet-wrapper">
        <div className="faucet">
          <div className="is-flex is-align-items-center">
            <span>
              <strong>Account: </strong>
            </span>
            {account ? <div>{account}</div> :
              <button className="button is-small"
                      onClick={() => web3Api.provider.request({method: 'eth_requestAccounts'})}>
                Connect Wallet
              </button>
            }
          </div>
          <div className="balance-view is-size-2 my-5">
            Current Balance: <strong>{balance}</strong> ETH
          </div>
          <button
            onClick={addFunds}
            className="button is-link mr-2 is-small">
            Donate 1 ETH
          </button>
          <button className="button is-primary is-small">Withdraw</button>
        </div>
      </div>
    </div>
  );
}

export default App;
