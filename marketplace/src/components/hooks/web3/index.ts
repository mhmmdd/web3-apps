import {useHooks} from "@/components/providers/web3";

export const useAccount = () => {
  const swrRes = useHooks(hooks => hooks.useAccount)();
  return {
    account: swrRes,
  }
}

export const useNetwork = () => {
  const swrRes = useHooks(hooks => hooks.useNetwork)();
  return {
    network: swrRes,
  }
}
