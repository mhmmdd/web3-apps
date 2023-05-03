import React from "react";
import Keypoints from "@/components/ui/course/keypoints";
import Curriculum from "@/components/ui/course/curriculum";
import Modal from "@/components/ui/common/modal";
import CourseHero from "@/components/ui/course/courseHero";
import BaseLayout from "@/components/ui/layout/baseLayout";
import {getAllCourses} from "@/content/courses/fetcher";

export default function Course({course}: React.PropsWithChildren<any>) {
  return (
    <>
      <div className="py-4">
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
      </div>
      <Keypoints
        points={course.wsl}
      />
      <Curriculum
        locked={true}
      />
      <Modal/>
    </>
  )
}

// get static paths
export const getStaticPaths = async () => {
  const {data} = getAllCourses();
  return {
    paths: data.map((course) => ({
      params: {slug: course.slug}
    })),
    fallback: false
  }
}

// get static props
export const getStaticProps = async ({params}: React.PropsWithChildren<any>) => {
  const {data} = getAllCourses();
  const course = data.find((course) => course.slug === params.slug);
  return {
    props: {course}
  }
}

Course.Layout = BaseLayout;
