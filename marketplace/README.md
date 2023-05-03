## 1 - Path Alias
tsconfig.json
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```
We don't need to use `../../` anymore, we can use `@/` instead.

src/pages/index.tsx
```tsx
import Test from "@/components/sub1/test";

export default function Home() {
  return (
    <>
      <Test/>
    </>
  )
}
```

## 2 - Create new components and pages

## 3 - Create Base Layout
src/components/layout/baseLayout.tsx
```tsx
const BaseLayout = ({children}) => {
  return (
    <div className="overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <Navbar/>
        <div className="fit">
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  );
};
```
src/pages/index.tsx
```tsx
export default function Home() {
  return (
    <BaseLayout>
      <Hero/>
      <Breadcrumbs/>
      <WalletBar/>
      <EthRates/>
      <OrderCard/>
      <CourseList/>
    </BaseLayout>
  )
}
```

Or we can use `BaseLayout` assigning to `Home.Layout` to make it more reusable.
src/pages/index.tsx
```tsx
export default function Home() {
  return (
    <>
      <Hero/>
      <Breadcrumbs/>
      <WalletBar/>
      <EthRates/>
      <OrderCard/>
      <CourseList/>
    </>
  )
}

Home.Layout = BaseLayout;
```

## 4 - Fetch courses data from json file
src/pages/index.tsx
```tsx
export default function Home({courses}: {courses: Course[]}) {
  return (
    <>
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
```

## 5 - Next.js Image Optimization
src/components/course/courseCard.tsx
```tsx
import Image from "next/image";

export default function CourseList({courses}: { courses: Course[] }) {
  return (
    <Image className="object-cover"
           width={200}
           height={230}
           src={course.coverImage}
           alt={course.title}/>
  )
}
```
next.config.js
```js
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'thrangra.sirv.com'],
  }
}
```

# Change History 
1. [Path Alias](#1---path-alias)
2. [Create new components and pages](#2---create-new-components-and-pages)
3. [Create Base Layout](#3---create-base-layout)
4. [Fetch courses data from json file](#4---fetch-courses-data-from-json-file)
5. [Next.js Image Optimization](#5---nextjs-image-optimization)
