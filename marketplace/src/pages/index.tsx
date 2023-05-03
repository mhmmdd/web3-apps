import Hero from "@/components/ui/common/hero";
import React from "react";
import Breadcrumbs from "@/components/ui/common/breadcrumbs";
import EthRates from "@/components/ui/web3/ethRates";
import WalletBar from "@/components/ui/web3/walletBar";
import OrderCard from "@/components/ui/order/orderCard";
import CourseList from "@/components/ui/course/courseList";
import BaseLayout from "@/components/ui/layout/baseLayout";
import {Course, getAllCourses} from "@/content/courses/fetcher";

export default function Home({courses}: {courses: Course[]}) {
  return (
    <>
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
