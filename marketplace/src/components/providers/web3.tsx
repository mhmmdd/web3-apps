import React, {createContext, useContext, useEffect} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const Web3Context = createContext<any>(null);

export const Web3Provider = ({children}: { children: React.ReactNode }) => {
  const [web3Api, setWeb3Api] = React.useState<any>({
    provider: null,
    web3: null,
    contract: null,
    isInitialized: false,
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
          isInitialized: true,
        });
      } else {
        setWeb3Api((api) => ({...api, isInitialized: true}));
        console.error("Please install MetaMask!");
      }
    }
    loadProvider();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  return useContext(Web3Context);
}
