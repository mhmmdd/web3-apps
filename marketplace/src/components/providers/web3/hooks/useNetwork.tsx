import useSWR from "swr";
import {useEffect} from "react";
import Web3 from "web3";

const NETWORKS = {
  1: "Ethereum Mainnet Network",
  3: "Ropsten Test Network",
  4: "Rinkeby Test Network",
  5: "Goerli Test Network",
  42: "Kovan Test Network",
  56: "Binance Smart Chain Mainnet",
  1337: "Ganache",
}

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID];

export const handler = (web3: Web3, provider: any) => () => {

  // get id of the network with swr
  const {data, mutate, ...rest} =
    useSWR(web3 ? "web3/network" : null,
      async () => {
        const chainId = await web3.eth.getChainId();
        return NETWORKS[chainId];
      });

  useEffect(() => {
    provider
    && provider.on("chainChanged", chainId => {
      mutate(parseInt(chainId, 16));
    });
  }, [web3]);

  return {
    network: {
      data,
      mutate,
      targetNetwork: targetNetwork,
      isSupportedNetwork: data === targetNetwork,
      ...rest
    }
  };
}
