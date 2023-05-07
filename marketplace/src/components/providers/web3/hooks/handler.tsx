import {useEffect, useState} from "react";

export const handler = (web3: any, provider: any) => () => {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const getAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    }
    web3 && getAccount();
  }, [web3]);

  useEffect(() => {
    // Subscribe to accounts change
    const subscribe = async () => {
      provider.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
      });
    }
    provider && subscribe();
  }, [provider]);

  return {account};
}
