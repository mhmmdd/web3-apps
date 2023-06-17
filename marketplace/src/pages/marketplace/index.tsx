import React from "react";
import WalletBar from "@/components/ui/web3/walletBar";
import CourseList from "@/components/ui/course/courseList";
import BaseLayout from "@/components/ui/layout/baseLayout";
import { Course, getAllCourses } from "@/content/courses/fetcher";

import CourseCard from "@/components/ui/course/courseCard";
import { useAccount, useNetwork } from "@/components/hooks/web3";
import Button from "@/components/ui/common/button";
import OrderModal from "@/components/ui/order/modal";

export default function Marketplace({ courses }: { courses: Course[] }) {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(
    null
  );
  const { account } = useAccount();
  const { network } = useNetwork();

  return (
    <>
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            targetNetwork: network.targetNetwork,
            isSupportedNetwork: network.isSupportedNetwork,
            isLoading: network.isLoading,
          }}
        />
        Current network: {`${network.data}`} <br />
        Target network: {`${network.targetNetwork}`} <br />
        Is supported network: {`${network.isSupportedNetwork}`}
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            course={course}
            key={course.id}
            Footer={() => (
              <div className="mt-4">
                <Button
                  onClick={() => setSelectedCourse(course)}
                  variant="lightBlue"
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          // Instance of the modal is closed when the selected course is set to null
          // Without this, useEffect in the modal would not be triggered
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  );
}

export const getStaticProps = async () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};

Marketplace.Layout = BaseLayout;
