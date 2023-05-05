import Hero from "@/components/ui/common/hero";
import React from "react";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import EthRates from "@/components/ui/web3/ethRates";
import WalletBar from "@/components/ui/web3/walletBar";
import OrderCard from "@/components/ui/order/orderCard";
import CourseList from "@/components/ui/course/courseList";
import BaseLayout from "@/components/ui/layout/baseLayout";
import {Course, getAllCourses} from "@/content/courses/fetcher";
import {useWeb3} from "@/components/providers/web3";

export default function Home({courses}: {courses: Course[]}) {
  // useWeb3 is a custom hook that returns the value of the Web3Context
  const {web3, isInitialized} = useWeb3();
  return (
    <>
      {isInitialized ? <p>Web3 is initialized</p> : <p>Web3 is not initialized</p>}
      <Hero/>
      <Breadcrumbs/>
      <WalletBar/>
      <EthRates/>
      <OrderCard/>
      <CourseList courses={courses}/>
    </>
  )
}

export const getStaticProps = async () => {
  const {data} = getAllCourses();
  return {
    props: {
      courses: data
    }
  }
}


Home.Layout = BaseLayout;
