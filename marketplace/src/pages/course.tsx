import React from "react";
import Keypoints from "@/components/ui/course/keypoints";
import Curriculum from "@/components/ui/course/curriculum";
import Modal from "@/components/ui/common/modal";
import CourseHero from "@/components/ui/course/courseHero";
import BaseLayout from "@/components/ui/layout/baseLayout";

export default function Course() {
  return (
    <>
      <div className="py-4">
        <CourseHero/>
      </div>
      <Keypoints points={[]}/>
      <Curriculum locked={false}/>
      <Modal/>
    </>
  )
}

Course.Layout = BaseLayout;
