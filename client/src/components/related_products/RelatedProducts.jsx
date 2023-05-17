import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import Carousel from './carousel/Carousel.jsx';
import Modal from './Modal.jsx';
import parse from '../../parse';
import './Related.css';

function RelatedProducts() {
  const { productID } = useContext(GlobalContext);
  const [dataStore, setDataStore] = useState({});
  const [related, setRelated] = useState([]);
  const [outfitList, setOutfitList] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [compareID, setCompareID] = useState(0);
  const [productFeatures, setProductFeatures] = useState({});
  const [compareFeatures, setCompareFeatures] = useState({});
  const [allFeatures, setAllFeatures] = useState([]);
  const [burn, setBurn] = useState(0);

  const allProducts = useRef({});

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

  const outfitToggle = (idNum) => {
    let id = 0;
    if (!idNum) {
      id = productID;
    } else {
      id = idNum;
    }
    const oldList = [...outfitList];
    const index = oldList.indexOf(id);
    let newList = [];
    if (index === -1) {
      newList = [id, ...oldList];
    } else {
      oldList.splice(index, 1);
      newList = oldList;
    }
    newList = addBlanksToOutfit(newList);
    setOutfitList(newList);
    localStorage.setItem('outfit', JSON.stringify(newList));
  };

  const searchAllProducts = (id) => {
    // console.log('-------> STEP 2 check if related id info already stored', id);
    let pass = true;
    if (allProducts.current[id] === undefined) {
      // console.log('not in there', id, allProducts.current);
      pass = false;
      return pass;
    }
    // console.log('id found!', id, allProducts.current);
    return pass;
  };

  const infoRequester = async (id) => {
    const endpoints = [
      `/products/${id}`,
      `/products/${id}/styles`,
      `/reviews/meta?product_id=${id}`,
    ];
    // console.log('-------> STEP 3 request info for:', id);
    await Promise.all(endpoints.map((endpoint) => parse.get(endpoint)))
      .then((res) => {
        allProducts.current[id] = res;
        setDataStore(allProducts.current);
        // console.log('-------> STEP 4 store received info for:', id, allProducts.current);
        localStorage.setItem('data', JSON.stringify(allProducts.current));
      })
      .catch((err) => {
        console.log('promise.all err', err);
      });
    // console.log('request END!!!!!<-------id:', id);
    setBurn(id);
  };

  const openModal = (id) => {
    const currentF = {};
    const compareF = {};
    const features = [];
    if (allProducts.current[productID]) {
      allProducts.current[productID][0].features.forEach((f) => {
        currentF[f.feature] = f.value;
        if (features.indexOf(f.feature) === -1) {
          features.push(f.feature);
        }
      });
    }
    if (allProducts.current[id]) {
      allProducts.current[id][0].features.forEach((f) => {
        compareF[f.feature] = f.value;
        if (features.indexOf(f.feature) === -1) {
          features.push(f.feature);
        }
      });
    }
    setCompareID(id);
    setAllFeatures(features);
    setProductFeatures(currentF);
    setCompareFeatures(compareF);
    setModalOpen(true);
  };

  useEffect(() => {
    related.forEach((id) => {
      if (id === undefined) { return; }
      if (searchAllProducts(id)) {
        // console.log('req avoided');
        // setProducts(allProducts.current);
        return;
      }
      if (id !== 10001) {
        infoRequester(id);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [related]);

  useEffect(() => {
    // console.log('-------> STEP 1 request ids related to ', productID);
    parse
      .get(`/products/${productID}/related`)
      .then((res) => {
        const noDuplicate = [];
        res.forEach((idNum) => {
          if (noDuplicate.indexOf(idNum) === -1) {
            noDuplicate.push(idNum);
          }
        });
        // console.log('this is the related res: ', res);
        // console.log('no duplicates ++++++++++++++++++', noDuplicate);
        setRelated(noDuplicate);
      })
      .catch((err) => {
        console.log('RP Carousel GET err', err);
      });
  }, [productID]);

  useEffect(() => {
    if (!allProducts.current || !allProducts.current[10001]) {
      allProducts.current = JSON.parse(localStorage.getItem('data'));
    }
    if (!allProducts.current || !allProducts.current[10001]) {
      const blankInfo = {
        name: 'Blank',
        slogan: 'add products!!!',
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
      allProducts.current = {};
      allProducts.current[10001] = [blankInfo, blankStyles, blankRatings];
    }
    setDataStore(allProducts.current);
    console.log('dataStore', allProducts.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  useEffect(() => {
    console.log('-----', allProducts);
    setRelated([productID]);
    // console.log('outfit in store', [localStorage.getItem('outfit')]);
    let storedOutfit = JSON.parse(localStorage.getItem('outfit'));
    if (storedOutfit[0] === null) {
      localStorage.setItem('outfit', JSON.stringify([]));
      storedOutfit = [];
    }
    console.log('stored outfit', storedOutfit);
    storedOutfit = addBlanksToOutfit(storedOutfit);
    setOutfitList(storedOutfit);
  }, []);

  const yes = true; // Airbnb made me do it
  const no = false;
  return (
    <div className="widgetContainer">
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <table>
          <tbody>
            <tr>
              <th className="currentP">{allProducts.current[productID] ? allProducts.current[productID][0].name : ''}</th>
              <th className="feature">Feature</th>
              <th className="compareP">{allProducts.current[compareID] ? allProducts.current[compareID][0].name : ''}</th>
            </tr>
            {allFeatures.map((f, i) => (
              <tr key={`${productID * i}`}>
                <td>{productFeatures[f] ? productFeatures[f] : ''}</td>
                <td>{f}</td>
                <td>{compareFeatures[f] ? compareFeatures[f] : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>
      <Carousel
        rpMode={yes}
        dataStore={dataStore}
        related={related}
        burn={burn}
        outfitList={outfitList}
        outfitToggle={outfitToggle}
        openModal={openModal}
      />
      <Carousel
        rpMode={no}
        dataStore={dataStore}
        related={related}
        burn={burn}
        outfitList={outfitList}
        outfitToggle={outfitToggle}
      />
    </div>
  );
}

export default RelatedProducts;
