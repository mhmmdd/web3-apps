import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import Hero from "@/components/common/hero";
import React from "react";
import Breadcrumbs from "@/components/common/breadcrumbs";
import EthRates from "@/components/web3/ethRates";
import WalletBar from "@/components/web3/walletBar";
import OrderCard from "@/components/order/orderCard";
import CourseList from "@/components/course/courseList";

export default function Home() {
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4">
          <Navbar/>
          <div className="fit">
            <Hero/>
            <Breadcrumbs/>
            <WalletBar/>
            <EthRates/>
            <OrderCard/>
            <CourseList/>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  )
}
