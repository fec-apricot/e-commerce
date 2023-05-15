import React, { useState, useContext, useEffect, useRef, useLayoutEffect } from 'react';
import { GlobalContext } from '../../GlobalContext.jsx';
import parse from '../../../parse';
import ProductCard from './ProductCard.jsx';
import './Carousel.css';

function Carousel({ rpMode }) {
  const { productID, setProductID } = useContext(GlobalContext);
  const [products, setProducts] = useState([]);
  const [related, setRelated] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [slide2Index, setSlide2Index] = useState(0);
  const [outfitBtnID, setOutfitBtnID] = useState(productID);
  const [outfit, setOutfit] = useState([]);
  const [currentProductInOutfit, setCurrentProductInOutfit] = useState(false);
  const [burn, setBurn] = useState(0);
  const allProducts = useRef({}); // maybe use memo here?
  // trying to gather all data in carousel and map it into cards
  const lineUp = useRef([]);
  const trackLimit = (rpMode ? 5 : 4);
  const productSlider = document.querySelector('.productTrack');

  const changeProduct = (newID) => {
    if (newID === 10001) { return; }
    setProductID(newID);
    productSlider.style.setProperty('--slider-index', 0);
    productSlider.style.setProperty('--slider2-index', 0);
    setSlideIndex(0);
    setSlide2Index(0);
    setOutfitBtnID(newID);
  };

  const slide = (direction) => {
    if (rpMode) {
      const index = Number(productSlider.style.getPropertyValue('--slider-index'));
      if (direction === 'left') {
        productSlider.style.setProperty('--slider-index', index - 1);
        setSlideIndex(slideIndex - 1);
      } else {
        productSlider.style.setProperty('--slider-index', index + 1);
        setSlideIndex(slideIndex + 1);
      }
      console.log('rp slide index:', Number(productSlider.style.getPropertyValue('--slider-index')));
    } else {
      const index = Number(productSlider.style.getPropertyValue('--slider2-index'));
      if (direction === 'left') {
        productSlider.style.setProperty('--slider2-index', index - 1);
        setSlide2Index(slide2Index - 1);
      } else {
        productSlider.style.setProperty('--slider2-index', index + 1);
        setSlide2Index(slide2Index + 1);
      }
      console.log('outfit slide index:', Number(productSlider.style.getPropertyValue('--slider2-index')));
    }
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
    console.log('original outfit', outfitList);
    const index = outfitList.indexOf(productID);
    if (index === -1) {
      setOutfit(addBlanksToOutfit([productID, ...outfitList]));
    } else {
      outfitList.splice(index, 1);
      setOutfit(addBlanksToOutfit(outfitList));
    }
    console.log('((((((((((((((-------outfit has been set: ', outfit, ' to ', outfitList, 'this is lineUp', lineUp);
    setBurn(productID + burn);
  };

  const searchAllProducts = (id) => {
    console.log('!!!!checking allProducts for id: ', id, products);
    // const keys = Object.keys(allProducts);
    let pass = true;
    if (allProducts.current[id] === undefined) {
      console.log('not in there', id, allProducts.current);
      pass = false;
      return pass;
    }
    console.log('id found!', id, allProducts.current);
    return pass;
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
        allProducts.current[id] = res;
        console.log('*****----***----setting allProducts:', allProducts.current, ' value with res', res);
        setProducts(allProducts.current);
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
        infoRequester(id);
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
          },
        };

        allProducts.current[10001] = [blankInfo, blankStyles, blankRatings];
        setProducts(allProducts.current);
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
          const noDuplicate = [];
          res.forEach((idNum) => {
            if (noDuplicate.indexOf(idNum) === -1) {
              noDuplicate.push(idNum);
            }
          });
          console.log('this is the related res: ', res);
          console.log('no duplicates ++++++++++++++++++', noDuplicate);
          setRelated(noDuplicate);
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
    setProducts(allProducts.current);
    console.log('products reset with allProducts', allProducts.current);
    setRelated([productID]);
  }, []);

  return (
    <div className="carousel">
      <ul className="productTrack">
        {(rpMode ? (slideIndex < 1) : (slide2Index < 1)) ? '' : (
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
          <li key={productID} className={`AddToOutfitBtn ${productID}`}>
            <ProductCard
              relatedID={productID}
              triggerFunction={toggleOutfitProduct}
              products={products}
              details={allProducts.current[productID]}
              burn={burn}
              allProducts={allProducts.current}
            />
          </li>
        )}
        {
          (rpMode ? related : outfit)
            .map((id, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`${id}-${index}`} className={`${rpMode ? 'productCard-slide' : 'outfitCard-slide'} ${id}`}>
                <ProductCard
                  relatedID={id}
                  triggerFunction={changeProduct}
                  products={products}
                  details={allProducts.current[id]}
                  burn={burn}
                  allProducts={allProducts.current}
                  rpMode={rpMode}
                />
              </li>
            ))
        }
        {(rpMode ? (related.length - slideIndex < trackLimit) : (outfit.length - slide2Index < trackLimit)) ? '' : (
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
