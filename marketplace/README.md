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

## 6 - Slugify course title to create course detail page url
src/components/course/courseList.tsx
```tsx
import Link from "next/link";

export default function CourseList({courses}: { courses: Course[] }) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <div className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
        {course.title}
      </div>
    </Link>
  )
}
```

src/pages/courses/[slug].tsx
```tsx
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
```
If you go to `http://localhost:3000/courses/learn-react`, you will see the course detail page.

## 7 - Create course detail page

## 8 - Key Points and Curriculum components functionality

## 9 - Connect button improvements

## 10 - Create Web3 Context and Web3 Provider
src/components/providers/web3.tsx
```tsx
import {createContext, useContext} from "react";

const Web3Context = createContext<any>(null);
export const Web3Provider: React.FC = ({children}) => {
  return (
    <Web3Context.Provider value={{test: "Hello"}}>
      {children}
    </Web3Context.Provider>
  )
}
export const useWeb3 = () => {
  return useContext(Web3Context);
}
```

## 11 - useContext to get data from Web3 Context (parent component)
src/pages/index.tsx
```tsx
import {useWeb3} from "@/components/providers/web3";

export default function Home({courses}: {courses: Course[]}) {
  // useWeb3 is a custom hook that returns the value of the Web3Context
  const {test} = useWeb3();
  return (
    <>
      {test}
    </>
  )
}
```

## 12 - Use provider library to connect to Metamask
```shell
$ pnpm install @metamask/detect-provider
$ pnpm install web3
```
src/components/providers/web3.tsx
```typescript
import React, {createContext, useContext, useEffect} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";

const Web3Context = createContext<any>(null);

export const Web3Provider = ({children}: { children: React.ReactNode }) => {
  const [web3Api, setWeb3Api] = React.useState<any>({
    provider: null,
    web3: null,
    contract: null,
    isInitialized: false,
  });

  // ethereum is injected to the browser by MetaMask
  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        const web3 = new Web3(provider as any);
        setWeb3Api({
          provider,
          web3,
          contract: null,
          isInitialized: true,
        });
      } else {
        setWeb3Api((api) => ({...api, isInitialized: true}));
        console.error("Please install MetaMask!");
      }
    }
    loadProvider();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>
      {children}
      </Web3Context.Provider>
  )
}

export const useWeb3 = () => {
  return useContext(Web3Context);
}
```
src/pages/index.tsx
```tsx
export default function Home() {
  const {web3, isInitialized} = useWeb3();
  return (
    <>
      {isInitialized ? <p>Web3 is initialized</p> : <p>Web3 is not initialized</p>}
    </>
  )
}
```

## 13 - useMemo for web3Api object to prevent re-rendering and add connect function

src/components/providers/web3.tsx
```tsx
// useMemo for web3Api
  const web3ApiMemo = React.useMemo(() => {
    return {
      ...web3Api,
      connect: () => console.log("try to connect"),
    }
  }, [web3Api]);
```

marketplace/src/components/ui/common/navbar.tsx
```tsx
export default function Navbar() {
  const {connect} = useWeb3();
  return (
    <a href="#" onClick={connect}>
      Connect
    </a>
  )
}
```

# Change History 
1. [Path Alias](#1---path-alias)
2. [Create new components and pages](#2---create-new-components-and-pages)
3. [Create Base Layout](#3---create-base-layout)
4. [Fetch courses data from json file](#4---fetch-courses-data-from-json-file)
5. [Next.js Image Optimization](#5---nextjs-image-optimization)
6. [Slugify course title to create course detail page url](#6---slugify-course-title-to-create-course-detail-page-url)
7. [Create course detail page](#7---create-course-detail-page)
8. [Key Points and Curriculum components functionality](#8---key-points-and-curriculum-components-functionality)
9. [Connect button improvements](#9---connect-button-improvements)
10. [Create Web3 Context and Web3 Provider](#10---create-web3-context-and-web3-provider)
11. [useContext to get data from Web3 Context (parent component)](#11---usecontext-to-get-data-from-web3-context-parent-component)
12. [Use provider library to connect to Metamask](#12---use-provider-library-to-connect-to-metamask)
13. [useMemo for web3Api object to prevent re-rendering and add connect function](#13---usememo-for-web3api-object-to-prevent-re-rendering-and-add-connect-function)
