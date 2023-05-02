import React from "react";
import Keypoints from "@/components/course/keypoints";
import Curriculum from "@/components/course/curriculum";
import Modal from "@/components/common/modal";
import CourseHero from "@/components/course/courseHero";

export default function Course() {

  return (
    <div className="relative max-w-7xl mx-auto px-4">
      <CourseHero/>
      <Keypoints/>
      <Curriculum/>
      <Modal/>
    </div>
  )
}
