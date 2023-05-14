import {useEffect, useState} from "react";
import useSWR from "swr";

const adminAddresses = {
  // "0x5FdEe388f7dE9B6CCE085E79Bd9e89afDbc4e3F8": true,
  // keccak version of the above address
  "0x5cdf17716be89c7d934554f4d38298c482a737246f4ee273391067ec4ea1de50": true,
}

export const handler = (web3: any, provider: any) => () => {
  // swr hook to get account
  const {data, mutate, ...rest} = useSWR(
    web3 && "web3/accounts",
    async () => {
      const accounts = await web3.eth.getAccounts();

      console.log('keccak256',
        web3.utils.keccak256('0x5FdEe388f7dE9B6CCE085E79Bd9e89afDbc4e3F8')
        === '0x5cdf17716be89c7d934554f4d38298c482a737246f4ee273391067ec4ea1de50');
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
      data,
      isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) || false,
      mutate,
      ...rest
    }
  };
}
