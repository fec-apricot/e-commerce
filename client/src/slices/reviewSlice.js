import { createSlice } from '@reduxjs/toolkit';

export const reviewSlice = createSlice({
  name: 'review',
  initialState: {
    metadata: {},
  },
  reducers: {
    updateMetadata: (state, action) => {
      state.metadata = action.payload;
    },
  },
});

export const { updateMetadata } = reviewSlice.actions;

export default reviewSlice.reducer;
