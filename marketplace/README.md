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
