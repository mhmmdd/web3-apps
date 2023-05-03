import Hero from "@/components/common/hero";
import React from "react";
import Breadcrumbs from "@/components/common/breadcrumbs";
import EthRates from "@/components/web3/ethRates";
import WalletBar from "@/components/web3/walletBar";
import OrderCard from "@/components/order/orderCard";
import CourseList from "@/components/course/courseList";
import BaseLayout from "@/components/layout/baseLayout";
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
