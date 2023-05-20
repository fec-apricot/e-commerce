import React, {
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import { GlobalContext } from '../GlobalContext.jsx';
import Carousel from './Carousel.jsx';
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
    let pass = true;
    if (allProducts.current[id] === undefined) {
      pass = false;
      return pass;
    }
    return pass;
  };

  const infoRequester = async (id) => {
    const endpoints = [
      `/products/${id}`,
      `/products/${id}/styles`,
      `/reviews/meta?product_id=${id}`,
    ];
    await Promise.all(endpoints.map((endpoint) => parse.get(endpoint)))
      .then((res) => {
        allProducts.current[id] = res;
        setDataStore(allProducts.current);
        localStorage.setItem('data', JSON.stringify(allProducts.current));
      })
      .catch((err) => {
        console.log('promise.all err', err);
      });
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
        return;
      }
      if (id !== 10001) {
        infoRequester(id);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [related]);

  useEffect(() => {
    parse
      .get(`/products/${productID}/related`)
      .then((res) => {
        const noDuplicate = [];
        res.forEach((idNum) => {
          if (noDuplicate.indexOf(idNum) === -1) {
            noDuplicate.push(idNum);
          }
        });
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  useEffect(() => {
    setRelated([productID]);
    let storedOutfit = JSON.parse(localStorage.getItem('outfit'));
    if (storedOutfit === null) {
      localStorage.setItem('outfit', JSON.stringify([]));
      storedOutfit = [];
    }
    storedOutfit = addBlanksToOutfit(storedOutfit);
    setOutfitList(storedOutfit);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <tr className="topTR">
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
      <div className="edgeFade"></div>
    </div>
  );
}

export default RelatedProducts;
