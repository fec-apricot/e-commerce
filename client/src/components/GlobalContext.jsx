import React, {
  useState, useEffect, createContext, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct, updateLoading } from '../slices/overviewSlice';
import { updateMetadata } from '../slices/reviewSlice';
import parse from '../parse';

export const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [productID, setProductID] = useState(40346);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  const globalContextMemo = useMemo(
    () => ({
      productID, setProductID, product,
    }),
    [productID, product],
  );
  useEffect(() => {
    dispatch(updateLoading());
    Promise.all([parse.get(`/products/${productID}`), parse.get(`/products/${productID}/styles`)])
      .then(([fetchedproduct, styles]) => {
        setProduct(fetchedproduct);
        dispatch(updateProduct({
          ...fetchedproduct, styles: styles.results,
        }));
      })
      .then(() => parse.get(`reviews/meta/?product_id=${productID}`))
      .then((data) => {
        dispatch(updateMetadata(data));
      })
      .then(() => {
        dispatch(updateLoading());
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [productID, dispatch]);

  return (
    <GlobalContext.Provider value={globalContextMemo}>
      {children}
    </GlobalContext.Provider>
  );
}
