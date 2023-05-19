import useSWR from "swr";
import {useEffect} from "react";

export const handler = (web3: any, provider: any) => () => {

  // get id of the network with swr
  const {mutate, ...rest} =
    useSWR(web3 ? "web3/network" : null,
      async () => {
        return web3.eth.net.getId();
      });

  useEffect(() => {
    provider
    && provider.on("chainChanged", networkId => mutate(networkId));
  }, [web3]);

  return {
    network: {
      mutate,
      ...rest
    }
  };
}
