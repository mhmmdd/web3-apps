import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import React from "react";

export default function App({Component, pageProps}: AppProps) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
