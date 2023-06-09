import React from "react";
import {Course} from "@/content/courses/fetcher";
import Image from "next/image";
import Link from "next/link";

export default function CourseCard({course, disabled, Footer}: { course: Course, disabled: boolean, Footer?: React.FC }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        <div className="flex h-full">
          <Image className={`object-cover ${disabled && "filter grayscale"}`}
                 width={200}
                 height={230}
                 src={course.coverImage}
                 alt={course.title}/>
        </div>
        <div className="p-8 pb-4 flex-2">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link href={`/courses/${course.slug}`}>
            <div className="h-12 block mt-1 text-lg leading-tight font-medium text-black hover:underline">
              {course.title}
            </div>
          </Link>
          <p className="mt-2 text-gray-500">
            {course.description.substring(0, 70)}...
          </p>
          {
            Footer && <Footer/>
          }
        </div>
      </div>
    </div>
  )
}
