import React, {createContext, useContext} from "react";

const Web3Context = createContext<any>(null);

export const Web3Provider = ({children} : {children: React.ReactNode}) => {
  return (
    <Web3Context.Provider value={{test: "Hello"}}>
      {children}
    </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  return useContext(Web3Context);
}
