import React from "react";
import WalletBar from "@/components/ui/web3/walletBar";
import CourseList from "@/components/ui/course/courseList";
import BaseLayout from "@/components/ui/layout/baseLayout";
import {Course, getAllCourses} from "@/content/courses/fetcher";
import {useAccount} from "@/components/hooks/web3/useAccount";
import {useNetwork} from "@/components/hooks/web3/useNetwork";
import CourseCard from "@/components/ui/course/courseCard";

export default function Marketplace({courses}: { courses: Course[] }) {
  const {account} = useAccount();
  const {network} = useNetwork();

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={ {
            data: network.data,
            targetNetwork: network.targetNetwork,
            isSupportedNetwork: network.isSupportedNetwork
          }}
        />
        Current network: {`${network.data}`} <br/>
        Target network: {`${network.targetNetwork}`} <br/>
        Is supported network: {`${network.isSupportedNetwork}`}
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard course={course} key={course.id}/>
        )}
      </CourseList>
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
