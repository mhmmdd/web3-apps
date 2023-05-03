import courses from "./index.json"

export interface Course {
  id: string
  type: string
  title: string
  description: string
  coverImage: string
  author: string
  link: string
  slug: string
  wsl: string[]
  createdAt: string
}

export const getAllCourses = () => {
  return {
    data: courses,
    courseMap: courses.reduce((a: { [key: string]: any }, c, i) => {
      a[c.id] = c
      a[c.id].index = i
      return a
    }, {})
  }
}
