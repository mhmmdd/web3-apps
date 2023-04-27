import React, {useCallback, useEffect} from 'react';
import './App.css';
import Web3 from 'web3';
import detectEthereumProvider from "@metamask/detect-provider";
import {loadContract} from "./utils/load-contract";
import {FaucetInstance} from "../types/truffle-contracts";

function App() {
  const [web3Api, setWeb3Api]
    = React.useState<{
    web3: Web3 | null,
    provider: any,
    contract: FaucetInstance | null,
    isProviderConnected: boolean
  }>({
    web3: null,
    provider: null,
    contract: null,
    isProviderConnected: false
  });
  const [account, setAccount] = React.useState<string>();
  const [balance, setBalance] = React.useState<string>();
  const [shouldReload, setShouldReload] = React.useState<boolean>(false);

  const canConnectToContract = account && web3Api.contract;

  const setAccountListener = (provider: any) => {
    // listen to account changes
    provider.on('accountsChanged', (accounts: string[]) => {
      setAccount(accounts[0]);
    });

    // listen to network changes
    provider.on('chainChanged', (chainId: string) => {
      window.location.reload();
    });
  }

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();

      if (provider) {

        setAccountListener(provider);
        await (provider as any).request({method: 'eth_requestAccounts'});

        const contract = await loadContract("Faucet", provider);
        setWeb3Api({web3: new Web3(provider as any), provider, contract, isProviderConnected: true});
      } else {
        // received web3 instance and set it to the state
        setWeb3Api((api) =>
          ({...api, isProviderConnected: true}));

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
  }, [web3Api, shouldReload]);

  // add funds to contract
  const addFunds = useCallback(async () => {
    const {contract, web3} = web3Api;
    const amount = web3!.utils.toWei('1', 'ether');
    await contract!.addFunds({from: account, value: amount});

    // reload balance
    setShouldReload(shouldReload => !shouldReload);
  }, [web3Api, account]);

  // withdraw funds from contract
  const withdrawFunds = useCallback(async () => {
    const {contract, web3} = web3Api;
    const amount = web3!.utils.toWei('0.1', 'ether');
    await contract!.withdraw(amount, {from: account});

    // reload balance
    setShouldReload(shouldReload => !shouldReload);
  }, [web3Api, account]);

  return (
    <div className="App">
      <div className="faucet-wrapper">
        <div className="faucet">
          {
            web3Api.isProviderConnected ?
              <div className="is-flex is-align-items-center">
            <span>
              <strong>Account: </strong>
            </span>
                {account ?
                  <div>{account}</div> :
                  web3Api.provider ?
                    <button className="button is-small"
                            onClick={() => web3Api.provider.request({method: 'eth_requestAccounts'})}>
                      Connect Wallet
                    </button>
                    :
                    <>
                      <div className="notification is-warning is-size-6 is-rounded">
                        Please install MetaMask! {` `}
                        <a target="_blank" rel="noreferrer" href={"https://metamask.io/download.html"}>Download</a>
                      </div>
                    </>
                }
              </div>
              : <span>Looking for Web3...</span>
          }
          <div className="balance-view is-size-2 my-5">
            Current Balance: {balance ? <strong>{balance}</strong> : <span>0</span>} ETH
          </div>

          {!canConnectToContract &&
            <i>
              Connect to Ganache<br/>
            </i>
          }
          <button
            disabled={!canConnectToContract}
            onClick={addFunds}
            className="button is-link mr-2 is-small">
            Donate 1 ETH
          </button>
          <button
            disabled={!canConnectToContract}
            onClick={withdrawFunds}
            className="button is-primary is-small">
            Withdraw 0.1 ETH
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
