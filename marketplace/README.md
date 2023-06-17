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

## 14 - Web3 Provider and create Button component and use it in Navbar

## 15 - useAccount hook to get account address
src/components/providers/web3/hooks/setupHooks.tsx
```tsx
export const setupHooks = (web3: any) => {
  return {
    useAccount: useAccount(web3),
  }
}
```
src/components/providers/web3/hooks/useAccount.tsx
```tsx
export const useAccount = (web3: any) => () => {
  return {
    account: web3 ? web3.eth.accounts[0] : null,
  }
}
```
src/components/providers/web3.tsx
```tsx
const web3ApiMemo = React.useMemo(() => {
    const {web3, provider} = web3Api;
    return {
      ...web3Api,
      isWeb3Enabled: web3 !== null,
      hooks: setupHooks(web3),
    }
  }, [web3Api]);
```

## 16 - useAccount hook abstraction

## 17 - Account listener and update account state
src/components/providers/web3/hooks/handler.tsx
```tsx
useEffect(() => {
  // Subscribe to accounts change
  const subscribe = async () => {
    provider.on("accountsChanged", (accounts: string[]) => {
      setAccount(accounts[0]);
    });
  }
  provider && subscribe();
}, [provider]);
```

## 18 - swr js library to fetch data
```shell
$ pnpm install swr
```
src/components/providers/web3/hooks/handler.tsx
```tsx
// swr hook to get account
const {mutate, ...rest} = useSWR(
  web3 && "web3/accounts",
  async () => {
    const accounts = await web3.eth.getAccounts();
    return accounts[0];
  }
);
```

## 19 - isAdmin property to check if account is admin
src/components/providers/web3/hooks/handler.tsx
```tsx
// swr hook to get account
const {data, mutate, ...rest} = useSWR();

// isAdmin property to check if account is admin
return {
  account: {
    isAdmin: (data && adminAddresses[web3.utils.keccak256(data)]) || false,
  }
};
```

## 20 - Create Marketplace page and hide admin panel for non-admin users

## 21 - Network Hook to get network name
src/components/providers/web3/hooks/useNetwork.tsx
```tsx
// get id of the network with swr
const {mutate, ...rest} =
  useSWR(web3 ? "web3/network" : null,
    async () => {
      return await web3.eth.getChainId();
    });

useEffect(() => {
  provider
  && provider.on("chainChanged", chainId => mutate(chainId));
}, [web3]);
```

## 22 - Pass the Course Card to the Course List as a child component
```tsx
// CourseList Component Usage
<CourseList courses={courses}>
  {(course) => (
    <CourseCard course={course} key={course.id}/>
  )}
</CourseList>

// CourseList Component Implementation
export default function CourseList({courses, children}) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map(course => children(course))}
    </section>
  )
}
```

## 23 - Network Environment Variables and wrong network warning

## 24 - Hook refactor and setupHooks improvements

## 25 - Warning "Require install MetaMask" is added

## 26 - Added Footer component as a props to the CourseCard component

## 27 - Common Modal and Order Modal components

## 28 - Prettier setup
```shell
$ pnpm install --save-dev --save-exact prettier
```

## 29 - Fetch ethereum price from coingecko api


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
14. [Web3 Provider and create Button component and use it in Navbar](#14---web3-provider-and-create-button-component-and-use-it-in-navbar)
15. [useAccount hook to get account address](#15---useaccount-hook-to-get-account-address)
16. [useAccount hook abstraction](#16---useaccount-hook-abstraction)
17. [Account listener and update account state](#17---account-listener-and-update-account-state)
18. [swr js library to fetch data](#18---swr-js-library-to-fetch-data)
19. [isAdmin property to check if account is admin](#19---isadmin-property-to-check-if-account-is-admin)
20. [Create Marketplace page and hide admin panel for non-admin users](#20---create-marketplace-page-and-hide-admin-panel-for-non-admin-users)
21. [Network Hook to get network name](#21---network-hook-to-get-network-name)
22. [Pass the Course Card to the Course List as a child component](#22---pass-the-course-card-to-the-course-list-as-a-child-component)
23. [Network Environment Variables and wrong network warning](#23---network-environment-variables-and-wrong-network-warning)
24. [Hook refactor and setupHooks improvements](#24---hook-refactor-and-setuphooks-improvements)
25. [Warning "Require install MetaMask" is added](#25---warning-require-install-metamask-is-added)
26. [Added Footer component as a props to the CourseCard component](#26---added-footer-component-as-a-props-to-the-coursecard-component)
27. [Common Modal and Order Modal components](#27---common-modal-and-order-modal-components)
28. [Prettier setup](#28---prettier-setup)
29. [Fetch ethereum price from coingecko api](#29---fetch-ethereum-price-from-coingecko-api)
