import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import parse from '../parse';

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [productID, setProductID] = useState(40344);
  const [product, setProduct] = useState({});
  const globalContextMemo = useMemo(
    () => ({ productID, setProductID, product }),
    [productID, product],
  );
  useEffect(() => {
    parse.get(`/products/${productID}`).then((data) => {
      setProduct(data);
    }).catch((err) => {
      console.error(err.message);
    });
  }, [productID]);

  return (
    <GlobalContext.Provider value={globalContextMemo}>
      {children}
    </GlobalContext.Provider>
  );
}
