import Hero from "@/components/common/hero";
import React from "react";
import Breadcrumbs from "@/components/common/breadcrumbs";
import EthRates from "@/components/web3/ethRates";
import WalletBar from "@/components/web3/walletBar";
import OrderCard from "@/components/order/orderCard";
import CourseList from "@/components/course/courseList";
import BaseLayout from "@/components/layout/baseLayout";

export default function Home() {
  return (
    <>
      <Hero/>
      <Breadcrumbs/>
      <WalletBar/>
      <EthRates/>
      <OrderCard/>
      <CourseList/>
    </>
  )
}

Home.Layout = BaseLayout;
