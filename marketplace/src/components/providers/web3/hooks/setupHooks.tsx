import {useAccount} from "@/components/providers/web3/hooks/useAccount";

const DEFAULT_HOOKS = {
  useAccount: () => {
    return {
      account: null,
    }
  }
}

// setupHooks is a function that takes in web3 and returns an object of hooks
export const setupHooks = (web3: any) => {
  if (!web3) return DEFAULT_HOOKS;

  return {
    useAccount: useAccount(web3),
    // same as above
    // useAccount : () => {
    //   return {
    //     account: web3 ? web3.eth.accounts[0] : null,
    //   }
    // }
  }
}
