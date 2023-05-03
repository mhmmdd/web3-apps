import React from "react";
import Keypoints from "@/components/course/keypoints";
import Curriculum from "@/components/course/curriculum";
import Modal from "@/components/common/modal";
import CourseHero from "@/components/course/courseHero";
import BaseLayout from "@/components/layout/baseLayout";

export default function Course() {
  return (
    <>
      <div className="py-4">
        <CourseHero/>
      </div>
      <Keypoints/>
      <Curriculum/>
      <Modal/>
    </>
  )
}

Course.Layout = BaseLayout;
