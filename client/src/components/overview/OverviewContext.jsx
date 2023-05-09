/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useMemo,
} from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import parse from '../../parse';

const OverviewContext = createContext();

// eslint-disable-next-line react/prop-types
function OverviewContextProvider({ children }) {
  const { productID } = useContext(GlobalContext);
  const [product, setProduct] = useState({});
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});
  const productMemo = useMemo(
    () => ({
      product,
      selectedStyle,
      setSelectedStyle,
      styles,
    }),
    [product, selectedStyle, setSelectedStyle, styles]
  );

  useEffect(() => {
    parse
      .get(`http://localhost:3000/products/${productID}`)
      .then((data) => {
        setProduct(data);
      })
      .then(() =>
        parse.get(`http://localhost:3000/products/${productID}/styles`)
      )
      .then((data) => {
        setStyles(data.results);
        setSelectedStyle(data.results[0]);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [productID]);

  return (
    <OverviewContext.Provider value={productMemo}>
      {children}
    </OverviewContext.Provider>
  );
}

export { OverviewContext, OverviewContextProvider };
