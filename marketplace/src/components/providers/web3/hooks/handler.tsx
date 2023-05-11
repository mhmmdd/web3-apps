import {useEffect, useState} from "react";
import useSWR from "swr";

export const handler = (web3: any, provider: any) => () => {
  // swr hook to get account
  const {mutate, ...rest} = useSWR(
    web3 && "web3/accounts",
    async () => {
      const accounts = await web3.eth.getAccounts();
      return accounts[0];
    }
  );


  useEffect(() => {
    // Subscribe to accounts change
    const subscribe = async () => {
      provider.on("accountsChanged", (accounts: string[]) => {
        mutate(accounts[0]);
      });
    }
    provider && subscribe();
  }, [provider]);

  return {
    account: {
      mutate,
      ...rest
    }
  };
}
