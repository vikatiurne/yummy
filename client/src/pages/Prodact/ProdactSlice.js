import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import GetServices from '../../services/GetServices';

const initialState = { status: 'idle', prodact: {} };

export const fetchGetProdact = createAsyncThunk(
  'prodact/fetchGetProdact',
  async ({ id }) => await GetServices.getOneProdact(id)
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
      })
      .addCase(fetchGetProdact.rejected, (state) => {
        state.status = 'error';
      })
  },
});

export default ProdactSlice.reducer;
