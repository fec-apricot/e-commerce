import React from 'react';
import { GlobalContextProvider } from './GlobalContext.jsx';
import { OverviewContextProvider } from './overview/OverviewContext.jsx';
import Overview from './overview/Overview.jsx';
import Header from './header/Header.jsx';
import RelatedProducts from './related_products/RelatedProducts.jsx';
import Questions from './questions/Questions.jsx';
import Reviews from './reviews/Reviews.jsx';
import '../../dist/styles.css';

function App() {
  return (

    <GlobalContextProvider>
      <Header />
      <div className="featureContainer">
        <Overview />
        <div className="widgetTitle">RELATED PRODUCTS</div>
        <br />
        <RelatedProducts />
        <br />
        <br />
        <br />
        <div className="widgetTitle">QUESTIONS & ANSWERS</div>
        <br />
        <Questions />
        <br />
        <br />
        <br />
        <div className="widgetTitle">RATINGS & REVIEWS</div>
        <br />
        <Reviews />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
