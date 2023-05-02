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
