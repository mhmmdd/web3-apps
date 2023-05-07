import React, {createContext, useContext, useEffect} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import {setupHooks} from "@/components/providers/web3/hooks/setupHooks";

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
    const {web3, provider} = web3Api;
    return {
      ...web3Api,
      isWeb3Enabled: web3 !== null,
      hooks: setupHooks(web3),
      connect: provider ?
        async () => {
          try {
            await provider.request({method: "eth_requestAccounts"});
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
