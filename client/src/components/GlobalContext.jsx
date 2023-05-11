import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import parse from '../parse';

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [productID, setProductID] = useState(40344);
  const productIDMemo = useMemo(
    () => ({ productID, setProductID }),
    [productID],
  );
  useEffect(() => {
    parse.get(`/products/${productID}`);
  });

  return (
    <GlobalContext.Provider value={productIDMemo}>
      {children}
    </GlobalContext.Provider>
  );
}
