import React from 'react';
import Navbar from "@/components/ui/common/navbar";
import Footer from "@/components/ui/common/footer";

const BaseLayout = ({children}) => {
  return (
    <div className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Navbar/>
        <div className="fit">
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default BaseLayout;
