import React from 'react';
import { GlobalContextProvider } from './GlobalContext.jsx';
import { OverviewContextProvider } from './overview/OverviewContext.jsx';
import Overview from './overview/Overview.jsx';
import RelatedProducts from './related_products/RelatedProducts.jsx';
import Questions from './questions/Questions.jsx';
import Reviews from './reviews/Reviews.jsx';
// import '../../dist/styles.css';

function App() {
  return (
    <GlobalContextProvider>
      <div>HEllo!!</div>
      {/* <OverviewContextProvider>
        <Overview />
      </OverviewContextProvider> */}
      <RelatedProducts />
      <Questions />
      <Reviews />
    </GlobalContextProvider>
  );
}

export default App;
