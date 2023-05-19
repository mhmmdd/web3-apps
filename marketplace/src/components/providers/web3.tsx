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
    hooks: setupHooks(),
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
          hooks: setupHooks(web3, provider),
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
    const {web3, provider, isLoading} = web3Api;
    return {
      ...web3Api,
      requireMetaMask: !isLoading && !web3,
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

// This is a helper function to use hooks from the web3Api
export const useHooks = (cb: (hooks: any) => any) => {
  const {hooks} = useWeb3();
  return cb(hooks);
}
