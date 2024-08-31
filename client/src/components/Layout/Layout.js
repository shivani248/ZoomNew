/* eslint-disable react/jsx-no-undef */
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Helmet } from "react-helmet";
import { ToastContainer} from 'react-toastify';
const Layout = ({children ,  title, description, keywords, author}) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header></Header>
      <main className="content d-flex flex-column justify-content-center align-items-center" style={{ marginTop: '80px' }}>
      <ToastContainer />
        {children}
      </main>
      <Footer></Footer>
    </div>
  )
}

Layout.defaultProps = {
  title: "WatchNow Shop - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "REC Banda",
};

export default Layout