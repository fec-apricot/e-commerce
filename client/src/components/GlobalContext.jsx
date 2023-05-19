import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import parse from '../parse';

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [productID, setProductID] = useState(40344);
  const [product, setProduct] = useState({});
  const [metadata, setMetadata] = useState({});
  const globalContextMemo = useMemo(
    () => ({
      productID, setProductID, product, metadata,
    }),
    [productID, product, metadata],
  );
  useEffect(() => {
    parse.get(`/products/${productID}`)
      .then((data) => {
        setProduct(data);
      }).then(() => parse.get(`reviews/meta/?product_id=${productID}`))
      .then((data) => {
        setMetadata(data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [productID]);

  return (
    <GlobalContext.Provider value={globalContextMemo}>
      {children}
    </GlobalContext.Provider>
  );
}
