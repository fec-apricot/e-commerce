import { configureStore } from '@reduxjs/toolkit';
import overviewReducer from '../slices/overviewSlice';
import reviewReducer from '../slices/reviewSlice';

const store = configureStore({
  reducer: {
    overview: overviewReducer,
    review: reviewReducer,
  },
});

export default store;
