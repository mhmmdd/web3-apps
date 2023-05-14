import React from "react";
import WalletBar from "@/components/ui/web3/walletBar";
import CourseList from "@/components/ui/course/courseList";
import BaseLayout from "@/components/ui/layout/baseLayout";
import {Course, getAllCourses} from "@/content/courses/fetcher";
import {useAccount} from "@/components/hooks/web3/useAccount";

export default function Marketplace({courses}: { courses: Course[] }) {
  const {account} = useAccount();

  return (
    <>
      <div className="py-4">
        <WalletBar address={account.data}/>
      </div>
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


Marketplace.Layout = BaseLayout;
