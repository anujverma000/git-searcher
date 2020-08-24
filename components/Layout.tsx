import Link from "next/link";
import Head from "next/head";
import Router from "next/router";
// import NProgress from 'nprogress';

// Router.onRouteChangeStart = () => {
//   NProgress.start();
// }

// Router.onRouteChangeComplete = () => {
//   NProgress.done();
// }

// Router.onRouteChangeError = () => {
//   NProgress.done();
// }

interface LayoutProps {
    children: React.ReactNode
    title?: string,
    description?: string,
    backbutton?: boolean
}

const Layout = ({ children, title, description }: LayoutProps) => (
  <div>
    {/* <Head>
      <title>{title || 'Git Searcher'}</title>
      <meta name="description" content={description || 'Best git searcher in the world. '} />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"/>
    </Head>
    <div className="container">
      {children}
    </div> */}
  </div>
);

export default Layout;
