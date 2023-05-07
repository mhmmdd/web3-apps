import React, {createContext, useContext, useEffect} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const Web3Context = createContext<any>(null);

export const Web3Provider = ({children}: { children: React.ReactNode }) => {
  const [web3Api, setWeb3Api] = React.useState<any>({
    provider: null,
    web3: null,
    contract: null,
    isLoading: true,
  });

  // ethereum is injected to the browser by MetaMask
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider as any);
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isLoading: false,
        });
      } else {
        setWeb3Api((api) => ({...api, isLoading: false}));
        console.error("Please install MetaMask!");
      }
    }
    loadProvider();
  }, []);

  // useMemo for web3Api
  const web3ApiMemo = React.useMemo(() => {
    return {
      ...web3Api,
      isWeb3Enabled: web3Api.web3 !== null,
      connect: web3Api.provider ?
        async () => {
          try {
            await web3Api.provider.request({method: "eth_requestAccounts"});
          } catch (e) {
            console.error(e, "Please allow access for the app to work");
            location.reload();
          }
        } :
        () => console.log("Please install MetaMask!"),
    }
  }, [web3Api]);

  return (
    <Web3Context.Provider value={web3ApiMemo}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  return useContext(Web3Context);
}
