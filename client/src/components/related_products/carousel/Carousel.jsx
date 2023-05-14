import React, { useState, useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
import parse from '../../../parse';
import ProductCard from './ProductCard.jsx';
import './Carousel.css';

function Carousel({ rpMode }) {
  const { productID, setProductID } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [related, setRelated] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [outfit, setOutfit] = useState([]);
  const [currentProductInOutfit, setCurrentProductInOutfit] = useState(false);
  const [burn, setBurn] = useState(0);
  const allProducts = useRef({}); // maybe use memo here?
  // trying to gather all data in carousel and map it into cards
  const lineUp = useRef([]);

  const productSlider = document.querySelector('.productTrack');

  const changeProduct = (newID) => {
    setProductID(newID);
    productSlider.style.setProperty('--slider-index', 0);
    setSlideIndex(0);
  };

  const slide = (direction) => {
    const index = Number(productSlider.style.getPropertyValue('--slider-index'));
    if (direction === 'left') {
      productSlider.style.setProperty('--slider-index', index - 1);
      setSlideIndex(slideIndex - 1);
    } else {
      productSlider.style.setProperty('--slider-index', index + 1);
      setSlideIndex(slideIndex + 1);
    }
    // console.log(Number(productSlider.style.getPropertyValue('--slider-index')));
  };

  const addBlanksToOutfit = (list) => {
    while (list.indexOf(10001) !== -1) {
      const index = list.indexOf(10001);
      list.splice(index, 1);
    }
    if (list.length < 3) {
      for (let i = list.length; i < 3; i += 1) {
        list.push(10001); // blank product
      }
    }
    return list;
  };

  const toggleOutfitProduct = () => {
    const outfitList = [...outfit];
    const index = outfitList.indexOf(productID);
    if (index === -1) {
      setOutfit(addBlanksToOutfit([productID, ...outfitList]));
    } else {
      outfitList.splice(index, 1);
      setOutfit(addBlanksToOutfit(outfitList));
    }
  };

  // const gatherInfo = (obj) => {
  //   if (Object.keys(obj).length < 1) { return; }
  //   allProducts.push(obj);
  //   setProducts(allProducts);
  //   console.log('allProducts.pushed', obj, allProducts);
  // };

  const searchAllProducts = (id) => {
    console.log('!!!!checking allProducts for id: ', id, products);
    // const keys = Object.keys(allProducts);
    if (allProducts[id] === undefined) {
      console.log('not in there', id, allProducts);
      return false;
    } else {
      console.log('id found!', id, allProducts);
      return true;
    }
    // for (let i = 0; i < keys.length; i += 1) {
    //   if (allProducts[keys[i]] !== undefined) {
    //     // setProductInfo(products[i][id][0]);
    //     // setProductStyles(products[i][id][1]);
    //     // setRatings(products[i][id][2].ratings);
    //     console.log('!!!!!!!avoided a get request for id: ', id, products);
    //     return true;
    //   }
    // }
    // return false;
  };

  const infoRequester = async (id) => {
    const endpoints = [
      `/products/${id}`,
      `/products/${id}/styles`,
      `/reviews/meta?product_id=${id}`,
    ];
    console.log('request START!!!!!<-------');
    await Promise.all(endpoints.map((endpoint) => parse.get(endpoint)))
      .then((res) => {
        console.log('this is all the data for a single RP', res);
        allProducts[id] = res;
        console.log('*****----***----setting allProducts:', allProducts, ' value with res', res);
        setProducts(allProducts);
      })
      .catch((err) => {
        console.log('promise.all err', err);
      });
    console.log('request END!!!!!<-------');
    setBurn(id);
  };

  useEffect(() => {
    related.forEach((id) => {
      if (id === undefined) { return; }
      if (searchAllProducts(id)) {
        console.log('req avoided');
        return;
      }
      if (id !== 10001) {
        // let res = [];
        const res = infoRequester(id);
        // const obj = {};
        // obj[id] = res;
        // console.log('OBJ: ', obj);

        // allProducts[id] = res;


        // setMyInfo(obj);

        // setProductInfo(res[0]);
        // setProductStyles(res[1]);
        // setRatings(res[2].ratings);
        // let expandedTitle = `${res[0].name} - ${res[0].slogan ? res[0].slogan : ''}`;
        // if (expandedTitle.length > 45) {
        //   expandedTitle = expandedTitle.slice(0, 45);
        //   expandedTitle += '...';
        // }
        // setTitle(expandedTitle);
      } else {
        const blankInfo = {
          category: 'Category',
          default_price: '$$',
        };
        const blankStyles = {
          results: [{
            photos: [{
              thumbnail_url: '',
            }],
          }],
        };
        const blankRatings = {
          ratings: {
            1: '0',
            2: '0',
            3: '0',
            4: '0',
            5: '1',
          }
        };
        // setProductInfo(blankInfo);
        // setProductStyles(blankStyles);
        // setRatings(blankRatings);
        // setTitle('Name and Description');
        allProducts[10001] = [blankInfo, blankStyles, blankRatings];
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [related]);

  // useEffect(() => {

  // }, [outfit]);

  useEffect(() => {
    if (rpMode) {
      parse
        .get(`/products/${productID}/related`)
        .then((res) => {
          setRelated(res);
        })
        .catch((err) => {
          console.log('RP Carousel GET err', err);
        });
    }
  }, [productID]);

  useEffect(() => {
    let localList = [];
    if (localList.indexOf(productID) === -1) {
      setCurrentProductInOutfit(false);
    } else {
      setCurrentProductInOutfit(true);
    }
    localList = addBlanksToOutfit(localList);
    setOutfit(localList); // set to outfit stored in local storage or nothing
    setRelated([productID]);
  }, []);

  return (
    <div className="carousel">
      <ul className="productTrack">
        {slideIndex < 1 ? '' : (
          <button
            className="carouselButton productLeft"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              slide('left');
            }}
          >
            &lt;
          </button>
        )}
        {rpMode ? '' : (
          <li key="addToOutfitButton" className={`${rpMode ? 'productCard-slide' : 'outfitCard-slide'} AddToOutfitBtn`}>
            <ProductCard
              relatedID={productID}
              triggerFunction={toggleOutfitProduct}
              products={products}
              details={allProducts[productID]}
              burn={burn}
              // gatherInfo={gatherInfo}
              allProducts={allProducts}
            />
          </li>
        )}
        {
          (rpMode ? related : outfit)
            .map((id, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${id}-${index}`} className="productCard-slide">
                <ProductCard
                  relatedID={id}
                  triggerFunction={changeProduct}
                  products={products}
                  details={allProducts[id]}
                  burn={burn}
                  // allInfo={allProducts[id]}
                  // gatherInfo={gatherInfo}
                  allProducts={allProducts}
                />
              </li>
            ))
        }
        {related.length - slideIndex < 5 ? '' : (
          <button
            className="carouselButton productRight"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              slide('right');
            }}
          >
            &gt;
          </button>
        )}
      </ul>
    </div>
  );
}

export default Carousel;
