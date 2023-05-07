export const useAccount = (web3: any) => () => {
  return {
    account: web3 ? web3.eth.accounts[0] : null,
  }
}
