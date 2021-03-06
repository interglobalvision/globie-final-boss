import React from 'react';

import { Header } from '/imports/components/base/Header.jsx';
// import { Footer } from '/imports/components/footer.jsx';

export const MainLayout = ({ content }) => (
  <div id="main-container">
    <Header />
    <div id="main-content" className="container">
      {content}
    </div>
    { /* <Footer /> */}
  </div>
);