import React from 'react';
import Navbar from "@/components/ui/common/navbar";
import Footer from "@/components/ui/common/footer";
import {Web3Provider} from "@/components/providers/web3";

const BaseLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <Web3Provider>
      <div className="max-w-7xl mx-auto px-4">
        <Navbar/>
        <div className="fit">
          {children}
        </div>
      </div>
      <Footer/>
    </Web3Provider>
  );
};

export default BaseLayout;
