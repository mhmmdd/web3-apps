import {handler} from "@/components/providers/web3/hooks/handler";


// setupHooks is a function that takes in web3 and returns an object of hooks
export const setupHooks = (...deps) => {
  return {
    useAccount: handler(...deps),
    // same as above
    // useAccount : () => {
    //   return {
    //     account: web3 ? web3.eth.accounts[0] : null,
    //   }
    // }
  }
}
