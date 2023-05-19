import {useHooks} from "@/components/providers/web3";

const enhanceHooks = swrRes => {
  return {
    ...swrRes,
    hasInitialResponse: swrRes.data || swrRes.error,
  }
}

export const useAccount = () => {
  const swrRes = enhanceHooks(useHooks(hooks => hooks.useAccount)());
  return {
    account: swrRes,
  }
}

export const useNetwork = () => {
  const swrRes = enhanceHooks(useHooks(hooks => hooks.useNetwork)());
  return {
    network: swrRes,
  }
}
