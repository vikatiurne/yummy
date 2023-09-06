import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetServices from '../../services/GetServices';
import CreateServices from '../../services/CreateServices';

const initialState = { status: 'idle', prodact: {}, rating: 0 };

export const fetchGetProdact = createAsyncThunk(
  'prodact/fetchGetProdact',
  async ({ id }) => await GetServices.getOneProdact(id)
);

export const fetchCreateRating = createAsyncThunk(
  'prodact/fetchCreateRating',
  async ({ rating, prodactId }) =>
    await CreateServices.createRating(rating, prodactId)
);

const ProdactSlice = createSlice({
  name: 'prodact',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchGetProdact.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGetProdact.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.prodact = payload.data;
        state.rating = payload.data.rating
      })
      .addCase(fetchGetProdact.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchCreateRating.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCreateRating.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.rating = payload;
      })
      .addCase(fetchCreateRating.rejected, (state) => {
        state.status = 'error';
      })
  },
});

export default ProdactSlice.reducer;
