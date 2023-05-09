/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useState, useEffect, createContext, useMemo } from 'react';
import parse from '../parse';

export const GlobalContext = createContext();

// eslint-disable-next-line react/prop-types
export function GlobalContextProvider({ children }) {
  const [productID, setProductID] = useState(40344);
  const productIDMemo = useMemo(
    () => ({ productID, setProductID }),
    [productID]
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
