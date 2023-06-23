import { configureStore } from '@reduxjs/toolkit';
import overviewReducer from '../slices/overviewSlice';

const store = configureStore({
  reducer: {
    overview: overviewReducer,
  },
});

export default store;
