import React from "react";
import {Course} from "@/content/courses/fetcher";

export default function CourseList({courses, children}: {courses: Course[], children: (course: Course) => JSX.Element}) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map(course => children(course))}
    </section>
  )
}
