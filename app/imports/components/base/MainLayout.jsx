import React from 'react';
import '/node_modules/@blueprintjs/core/dist/blueprint.css';

// import { Header } from '/imports/components/header.jsx';
// import { Footer } from '/imports/components/footer.jsx';

export const MainLayout = ({ content }) => (
  <div id="main-container">
    {/* <Header /> */}
    <div id="main-content" className="container">
      {content}
    </div>
    { /* <Footer /> */}
  </div>
);
