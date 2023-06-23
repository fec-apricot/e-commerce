import { createSlice } from '@reduxjs/toolkit';

export const overviewSlice = createSlice({
  name: 'overview',
  initialState: {
    product: {},
    selectedStyleIndex: 0,
    isLoading: false,
  },
  reducers: {
    updateProduct: (state, action) => {
      state.product = action.payload;
    },
    updateSelectedStyleIndex: (state, action) => {
      state.selectedStyleIndex = action.payload;
    },
    updateLoading: state => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const { updateProduct, updateSelectedStyleIndex, updateLoading } = overviewSlice.actions;

export default overviewSlice.reducer;
