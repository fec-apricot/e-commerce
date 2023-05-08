import React, { useState, useEffect, createContext } from "react";
import Overview from "./overview/Overview.jsx";
import RelatedProducts from "./related_products/RelatedProducts.jsx";
import Questions from "./questions/Questions.jsx";
import Reviews from "./reviews/Reviews.jsx";
import parse from "../parse.js";

export const ProductIDContext = createContext();

function App() {
  const [productID, setProductID] = useState(40344);

  useEffect(() => {
    parse.get("/products/" + productID);
  }, []);

  return (
    <ProductIDContext.Provider value={{ productID, setProductID }}>
      <div>HEllo!!</div>
      <Overview />
      <RelatedProducts />
      <Questions />
      <Reviews />
    </ProductIDContext.Provider>
  );
}

export default App;
