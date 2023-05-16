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

function OverviewContextProvider({ children }) {
  const { productID } = useContext(GlobalContext);
  const [styles, setStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState({});
  const productMemo = useMemo(
    () => ({
      selectedStyle,
      setSelectedStyle,
      styles,
    }),
    [selectedStyle, setSelectedStyle, styles],
  );

  useEffect(() => {
    parse.get(`/products/${productID}/styles`)
      .then((data) => {
        setStyles(data?.results);
        setSelectedStyle(data?.results[0]);
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
