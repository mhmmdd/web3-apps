import {handler as createUseAccountHook} from "@/components/providers/web3/hooks/handler";
import {handler as createUseNetworkHook} from "@/components/providers/web3/hooks/useNetwork";


// setupHooks is a function that takes in web3 and returns an object of hooks
export const setupHooks = (...deps) => {
  return {
    useAccount: createUseAccountHook(...deps),
    // same as above
    // useAccount : () => {
    //   return {
    //     account: web3 ? web3.eth.accounts[0] : null,
    //   }
    // }
    useNetwork: createUseNetworkHook(...deps),
  }
}
